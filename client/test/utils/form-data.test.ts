import { describe, it, expect } from 'vitest';

import { serializeFormData } from '~/utils/form-data';

// foo, bar, baz, qux, quux, corge, grault, garply, waldo, fred, plugh, xyzzy, and thud

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

      expect(result['baz']['foo']).toBe('3');
      expect(result['baz']['bar']).toBe('4');

      expect(result['qux']['foo'][0]).toBe('5');
      expect(result['qux']['foo'][1]).toBe('6');

      expect(result['quux']['foo']['bar']).toBe('7');
      expect(result['quux']['foo']['baz']).toBe('8');

      expect(result['corge']['foo']['bar'][0]).toBe('9');
      expect(result['corge']['foo']['bar'][1]).toBe('10');

      expect(result['grault']['foo']['bar']).toBe('11');
      expect(result['grault']['foo']['qux'][0]).toBe('12');
      expect(result['grault']['foo']['qux'][1]).toBe('13');

      expect(result['lorem'][0]['ipsum']).toBe('14');
      expect(result['lorem'][0]['dolor']).toBe('15');
      expect(result['lorem'][1]['ipsum']).toBe('16');
      expect(result['lorem'][1]['dolor']).toBe('17');
    });
  });
});
