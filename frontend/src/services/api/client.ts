/**
 * API Client - Generic fetch wrapper with error handling, timeout, and retry logic
 * Demonstrates Promise.all and Promise.allSettled patterns
 */

import type { ApiResponse, ErrorResponse } from '@/types';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic request method with timeout and retry logic
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = DEFAULT_TIMEOUT,
      retries = MAX_RETRIES,
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

        const data = await response.json();
        return {
          success: true,
          data,
          status: response.status,
        };
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors (4xx)
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          // This could be timeout or network error, retry
          if (attempt < retries) {
            await this.delay(RETRY_DELAY * Math.pow(2, attempt)); // Exponential backoff
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

  /**
   * Utility method for delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * Fetch multiple resources in parallel using Promise.all
   * Fails if ANY request fails - use this when all data is critical
   */
  async fetchCriticalData<T extends Record<string, unknown>>(
    requests: Record<keyof T, () => Promise<ApiResponse<unknown>>>,
  ): Promise<T> {
    const keys = Object.keys(requests) as Array<keyof T>;
    const promises = keys.map((key) => requests[key]());

    try {
      const results = await Promise.all(promises);
      const data = {} as T;

      keys.forEach((key, index) => {
        if (results[index].success) {
          data[key] = results[index].data as T[keyof T];
        } else {
          throw new Error(`Failed to fetch ${String(key)}: ${results[index].error}`);
        }
      });

      return data;
    } catch (error) {
      throw new Error(`Critical data fetch failed: ${(error as Error).message}`);
    }
  }

  /**
   * Fetch multiple resources in parallel using Promise.allSettled
   * Continues even if some requests fail - use this when partial data is acceptable
   */
  async fetchResilientData<T extends Record<string, unknown>>(
    requests: Record<keyof T, () => Promise<ApiResponse<unknown>>>,
  ): Promise<{
    data: Partial<T>;
    failures: Record<string, string>;
  }> {
    const keys = Object.keys(requests) as Array<keyof T>;
    const promises = keys.map((key) => requests[key]());

    const results = await Promise.allSettled(promises);
    const data = {} as Partial<T>;
    const failures: Record<string, string> = {};

    keys.forEach((key, index) => {
      const result = results[index];

      if (result.status === 'fulfilled') {
        if (result.value.success) {
          data[key] = result.value.data as T[keyof T];
        } else {
          failures[String(key)] = result.value.error || 'Unknown error';
        }
      } else {
        failures[String(key)] = result.reason?.message || 'Request failed';
      }
    });

    return { data, failures };
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
