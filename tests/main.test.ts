import t from '../';

test('No special chars', () => {
  expect(t('\n\t 1"/')).toBe('`\n\t 1"/`');
});

test('Illegal chars', () => {
  expect(t('\\`\'"${}')).toBe('`\\\\\\`\'"\\${}`');
});

test('Empty values', () => {
  expect(t('')).toBe('``');
  // tslint:disable-next-line no-any
  expect(t((null as any) as string)).toBe(null);
  // tslint:disable-next-line no-any
  expect(t((undefined as any) as string)).toBe(undefined);
});
