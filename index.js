/** @param {string} x */
export default function stringToTemplateLiteral(x = "") {
  // This coerces 'x' to a string.
  x = `${x}`;

  // \$(?={): Matches a dollar sign followed by an open curly brace (${).
  //    It's looking for the start of a template expression (e.g., ${...})
  //    but with an escaped dollar sign.
  //
  // (?<=<)\/: Uses lookbehind and lookahead assertions. It matches a
  //    forward slash (/) that is preceded by a less-than sign (<) such
  //    as '</script>'. It doesn't include the '<' in the match text.
  const escaped = x.replace(/\\|`|\$(?={)|(?<=<)\//g, (y) => "\\" + y);

  return `\`${escaped}\``;
}
