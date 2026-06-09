import type { ApiResponse, CoraSdkConfig, ErrorResponse } from './types';

const DEFAULT_BASE_URL = 'http://localhost:5000/api';
const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_RETRIES = 3;
const RETRY_DELAY = 1_000;

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly defaultTimeout: number;
  private readonly defaultRetries: number;

  constructor(config: CoraSdkConfig = {}) {
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    this.defaultTimeout = config.timeout ?? DEFAULT_TIMEOUT;
    this.defaultRetries = config.retries ?? DEFAULT_RETRIES;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
    } = config;

    const url = `${this.baseUrl}${endpoint}`;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error: ErrorResponse = await response.json().catch(() => ({
            message: response.statusText,
            code: response.status.toString(),
            timestamp: new Date().toISOString(),
          }));
          throw new Error(error.message || `HTTP ${response.status}`);
        }

        const data = (await response.json()) as T;
        return { success: true, data, status: response.status };
      } catch (error) {
        lastError = error as Error;

        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          if (attempt < retries) {
            await this.delay(RETRY_DELAY * 2 ** attempt);
            continue;
          }
        }

        if (attempt === retries) {
          return {
            success: false,
            error: lastError?.message || 'Unknown error',
            status: 500,
          };
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || 'Failed after retries',
      status: 500,
    };
  }

  get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  async fetchCriticalData<T extends Record<string, unknown>>(
    requests: Record<keyof T, () => Promise<ApiResponse<unknown>>>,
  ): Promise<T> {
    const keys = Object.keys(requests) as Array<keyof T>;
    const results = await Promise.all(keys.map((key) => requests[key]()));

    const data = {} as T;
    keys.forEach((key, index) => {
      if (results[index].success) {
        data[key] = results[index].data as T[keyof T];
      } else {
        throw new Error(`Failed to fetch ${String(key)}: ${results[index].error}`);
      }
    });

    return data;
  }

  async fetchResilientData<T extends Record<string, unknown>>(
    requests: Record<keyof T, () => Promise<ApiResponse<unknown>>>,
  ): Promise<{ data: Partial<T>; failures: Record<string, string> }> {
    const keys = Object.keys(requests) as Array<keyof T>;
    const results = await Promise.allSettled(keys.map((key) => requests[key]()));

    const data = {} as Partial<T>;
    const failures: Record<string, string> = {};

    keys.forEach((key, index) => {
      const result = results[index];
      if (result.status === 'fulfilled' && result.value.success) {
        data[key] = result.value.data as T[keyof T];
      } else if (result.status === 'fulfilled') {
        failures[String(key)] = result.value.error || 'Unknown error';
      } else {
        failures[String(key)] = result.reason?.message || 'Request failed';
      }
    });

    return { data, failures };
  }
}
