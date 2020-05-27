import * as assert from 'assert';
import t from '..';

const expect = assert.equal;

it('No special chars', () => {
  expect(t('\n\t 1"/'), '`\n\t 1"/`');
});

it('Illegal chars', () => {
  expect(t('AB`C` ${'), '`AB\\`C\\` \\${`');
  expect(t('\\`\'"${}'), '`\\\\\\`\'"\\${}`');
});

it('Empty values', () => {
  expect(t(''), '``');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(t((null as any) as string), '``');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(t((undefined as any) as string), '``');
});
