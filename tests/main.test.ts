import * as assert from 'assert';
import t from '../dist/main.js';

it('No special chars', () => {
  assert.strictEqual(t('\n\t 1"/'), '`\n\t 1"/`');
});

it('Illegal chars', () => {
  assert.strictEqual(t('AB`C` ${'), '`AB\\`C\\` \\${`');
  assert.strictEqual(t('\\`\'"${}'), '`\\\\\\`\'"\\${}`');
});

it('Empty values', () => {
  assert.strictEqual(t(''), '``');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assert.strictEqual(t((null as any) as string), '``');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assert.strictEqual(t((undefined as any) as string), '``');
});
