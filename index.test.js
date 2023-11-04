import test from "node:test";
import assert from "node:assert/strict";
import stringToTemplateLiteral from "./index.js";
import { readFile } from "node:fs/promises";

// Manually hover over the 'stringToTemplateLiteral()' calls
// in your IDE to see if the JSDoc/TypeScript annotations work!

// This is here so that the 'readFile()' result is interesting:
// \f, \n, \r, \t, \v
// \^, \$, \\, \. \*, \+, \?, \(, \), \[, \], {, }, \|, \/
// \x00, \u0000, \u{0000}
// \${}
// \`
// </script>
// </xmp>
// </hello>
const fileText = await readFile(new URL(import.meta.url), "utf8");

test("eval(stringToTemplateLiteral(input)) == input", () => {
  // Similar to 'JSON.parse(JSON.stringify(string))', this should work!
  const actual = stringToTemplateLiteral(fileText);
  assert.equal(eval(actual), fileText);

  // Want to be able to inject the result of this directly into a '<script>' tag
  // without the string accidentally closing the tag.
  assert.doesNotMatch(actual, /<\/script>/);
  assert.doesNotMatch(actual, /<\/xmp>/);
  assert.doesNotMatch(actual, /<\/hello>/);
});

test("empty string", () => {
  assert.equal(stringToTemplateLiteral(""), "``");
  assert.equal(stringToTemplateLiteral(), "``");
  assert.equal(stringToTemplateLiteral(undefined), "``");
});

test("non-strings", () => {
  assert.equal(stringToTemplateLiteral(1), "`1`");
  assert.equal(stringToTemplateLiteral(2n), "`2`");
  assert.equal(stringToTemplateLiteral(true), "`true`");
  assert.equal(stringToTemplateLiteral(null), "`null`");
  assert.equal(stringToTemplateLiteral({ a: 3 }), "`[object Object]`");
  assert.equal(stringToTemplateLiteral([4, 5]), "`4,5`");
});

test("stringToTemplateLiteral() vs JSON.stringify()", () => {
  // Don't expect massive space savings. gzip evens the playing field even more.
  // It's more about human readability.
  console.table({
    "stringToTemplateLiteral()": stringToTemplateLiteral(fileText).length,
    "JSON.stringify()": JSON.stringify(fileText).length,
  });
});
