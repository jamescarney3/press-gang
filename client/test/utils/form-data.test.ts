import { describe, it, expect } from 'vitest';

import type { JsonValue } from '~/utils/form-data';
import { serializeFormData } from '~/utils/form-data';

// foo, bar, baz, qux, quux, corge, grault, garply, waldo, fred, plugh, xyzzy, and thud

const valueAtPath = (value: JsonValue, ...path: (string | number)[]): JsonValue => {
  let current = value;

  for (const segment of path) {
    if (Array.isArray(current) && typeof segment === 'number') {
      current = current[segment]!;
    } else if (
      typeof current === 'object' &&
      current !== null &&
      !Array.isArray(current) &&
      typeof segment === 'string'
    ) {
      current = current[segment]!;
    } else {
      throw new Error(`Invalid JSON path segment: ${segment}`);
    }
  }

  return current;
};

describe('Form data utils', () => {
  describe('convertFormDataToJson', () => {
    it('converts arbitrarily bracket-nested form data to valid json', () => {
      const formData = new FormData();
      // top level values
      formData.append('foo', '1');
      formData.append('bar', '2');

      // nested keyed object
      formData.append('baz[foo]', '3');
      formData.append('baz[bar]', '4');

      // nested array
      formData.append('qux[foo][]', '5');
      formData.append('qux[foo][]', '6');

      // two level nested keyed object
      formData.append('quux[foo][bar]', '7');
      formData.append('quux[foo][baz]', '8');

      // two level nested keyed array
      formData.append('corge[foo][bar][]', '9');
      formData.append('corge[foo][bar][]', '10');

      // two level nested keyed object with array property
      formData.append('grault[foo][bar]', '11');
      formData.append('grault[foo][qux][]', '12');
      formData.append('grault[foo][qux][]', '13');

      formData.append('lorem[][ipsum]', '14');
      formData.append('lorem[][dolor]', '15');
      formData.append('lorem[][ipsum]', '16');
      formData.append('lorem[][dolor]', '17');

      const result = serializeFormData(formData);

      expect(result['foo']).toBe('1');
      expect(result['bar']).toBe('2');

      expect(valueAtPath(result, 'baz', 'foo')).toBe('3');
      expect(valueAtPath(result, 'baz', 'bar')).toBe('4');

      expect(valueAtPath(result, 'qux', 'foo', 0)).toBe('5');
      expect(valueAtPath(result, 'qux', 'foo', 1)).toBe('6');

      expect(valueAtPath(result, 'quux', 'foo', 'bar')).toBe('7');
      expect(valueAtPath(result, 'quux', 'foo', 'baz')).toBe('8');

      expect(valueAtPath(result, 'corge', 'foo', 'bar', 0)).toBe('9');
      expect(valueAtPath(result, 'corge', 'foo', 'bar', 1)).toBe('10');

      expect(valueAtPath(result, 'grault', 'foo', 'bar')).toBe('11');
      expect(valueAtPath(result, 'grault', 'foo', 'qux', 0)).toBe('12');
      expect(valueAtPath(result, 'grault', 'foo', 'qux', 1)).toBe('13');

      expect(valueAtPath(result, 'lorem', 0, 'ipsum')).toBe('14');
      expect(valueAtPath(result, 'lorem', 0, 'dolor')).toBe('15');
      expect(valueAtPath(result, 'lorem', 1, 'ipsum')).toBe('16');
      expect(valueAtPath(result, 'lorem', 1, 'dolor')).toBe('17');
    });
  });
});
