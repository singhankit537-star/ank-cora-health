/**
 * Utility function tests
 */

import { describe, it, expect } from 'vitest';
import {
  classNames,
  formatCurrency,
  formatDate,
  truncateString,
  isEmpty,
} from './helpers';

describe('Utilities', () => {
  describe('classNames', () => {
    it('merges class names', () => {
      const result = classNames('bg-red-600', 'text-white', 'px-4');
      expect(result).toBe('bg-red-600 text-white px-4');
    });

    it('filters falsy values', () => {
      const result = classNames('bg-red-600', false, undefined, 'text-white', null);
      expect(result).toBe('bg-red-600 text-white');
    });
  });

  describe('formatCurrency', () => {
    it('formats currency', () => {
      const result = formatCurrency(1234.56);
      expect(result).toContain('$');
      expect(result).toContain('1,234');
    });
  });

  describe('formatDate', () => {
    it('formats date', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toContain('01');
      expect(result).toContain('15');
    });
  });

  describe('truncateString', () => {
    it('truncates long strings', () => {
      const result = truncateString('Hello World This Is Long', 10);
      expect(result).toBe('Hello Worl...');
    });

    it('does not truncate short strings', () => {
      const result = truncateString('Hi', 10);
      expect(result).toBe('Hi');
    });
  });

  describe('isEmpty', () => {
    it('checks for empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty('text')).toBe(false);
    });
  });
});
