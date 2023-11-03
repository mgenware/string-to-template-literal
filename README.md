# Encode as template literal

🔠 Like `JSON.stringify()`, but returns a template string

<table align=center><td>

```js
// In some HTTP service that generates a '<script>' to print Hamlet...
const hamlet = await readFile("hamlet.txt", "utf8");
const js = `console.log(${stringToTemplateLiteral(hamlet)})`;
console.debug(js);
// No '\n'; it's a multiline string! 👇
```

<tr><td>

```js
// This is 'console.debug(js)' output from above 👆
console.log(`ACT I
SCENE I. Elsinore. A platform before the castle.
  FRANCISCO at his post. Enter to him BERNARDO
BERNARDO
  Who's there?
...`);
```

</table>

📄 Escapes `</script>` sequences; safe to inject into `<script>` tags \
🤩 Great for encoding text for embedding in JavaScript source text \
🤏 It's tiny; only 5 lines of code! \
📦 Slightly more space-efficient than `JSON.stringify()`

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)

You can install this package using npm, [pnpm], [Yarn], or your favorite npm package manager.

```sh
npm install string-to-template-literal
```

You can also import this package straight from an npm CDN if you're in your browser using native ES modules:

```js
import {} from "https://esm.run/string-to-template-literal@^3.0.0";
import {} from "https://esm.sh/string-to-template-literal@^3.0.0";
```

<details><summary>If you prefer, you can also copy-paste the 3-line function into the file where you want to use this function to avoid another dependency.</summary>

```js
/** @param {string} x */
function stringToTemplateLiteral(x = "") {
  x = `${x}`;
  const escaped = x.replace(/\\|`|\$(?={)|(?<=<)\//g, (y) => "\\" + y);
  return `\`${escaped}\``;
}
```

👩‍⚖️ This code is licensed under the [0BSD license] so you don't need to include any license text. 😉

</details>

## Usage

![Browser](https://img.shields.io/static/v1?style=for-the-badge&message=Browser&color=4285F4&logo=Google+Chrome&logoColor=FFFFFF&label=)
![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)

The `stringToTemplateLiteral()` function returns a wrapped string that is compatible with `eval()`, embedding in `<script>` tags, and embedding in `.js` files.

```js
import stringToTemplateLiteral from "string-to-template-literal";

// Running in some serverless runtime like
// Vercel, Deno Deploy, AWS Lambda, etc.
async function handleIndexHTML(request) {
  const hamlet = await readFile("hamlet.txt", "utf8");
  const js = `console.log(${stringToTemplateLiteral(hamlet)})`;
  const html = `
    <p>Check your DevTools console for Hamlet!</p>
    <script>${js}</script>
  `;
  return new Response(html);
}
```

The best example of when you might want to use this package is when creating a source code string that you want to embed in your JavaScript application **as raw text**. Think something like a bundler that needs to embed a `.txt` file into a JavaScript source file or a dynamic HTML page that needs to inject some text into a `<script>` tag. You _could_ use `JSON.stringify()` in all these cases, but your text may become unreadable to humans since `JSON.stringify()` forces everything on one line with lots of escapes that are not needed when using `` `template strings` ``.
