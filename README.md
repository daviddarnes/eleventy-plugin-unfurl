# eleventy-plugin-unfurl

[![npm](https://img.shields.io/npm/v/eleventy-plugin-unfurl)](https://www.npmjs.com/package/eleventy-plugin-unfurl)

Turn URLs into rich cards. Show a preview image, page title, description and other meta information all inside a neatly presented card. **Collaborative effort between [Sara Soueidan](https://www.sarasoueidan.com) and myself**.

[See the live demo](https://eleventy-plugin-unfurl.netlify.app) and the [demo directory in the repo](https://github.com/daviddarnes/eleventy-plugin-unfurl/tree/main/demo) to see it all in action.

- [Installation](#installation)
- [Options](#options)
- [Development](#development)

## Installation

1. Install plugin using npm:

   ```
   npm install eleventy-plugin-unfurl
   ```

2. Add plugin to your `.eleventy.js` config:

   ```js
   const pluginUnfurl = require("eleventy-plugin-unfurl");

   module.exports = (eleventyConfig) => {
     eleventyConfig.addPlugin(pluginUnfurl);
   };
   ```

3. Use the shortcode in your templates (`.md`, `.njk`, `.liquid` or `.js`) like so:

   ```njk
   {% unfurl "https://www.sarasoueidan.com/blog/prefers-color-scheme-browser-vs-os/" %}
   ```

## Options

The HTML of the unfurled links can be amended using the `template` option like so:

```js
eleventyConfig.addPlugin(pluginUnfurl, {
  template: ({ title, url }) => `<a href="${url}">${title}</a>`,
});
```

The following data points are available:

- `title`
- `description`
- `lang`
- `author`
- `publisher`
- `image`
  - `url`
  - `type`
  - `size`
  - `height`
  - `width`
  - `size_pretty`
- `date`
- `url`
- `logo`
  - `url`
  - `type`
  - `size`
  - `height`
  - `width`
  - `size_pretty`

## Development

1. Amend the `.eleventy.js` file within `demo` so it points to the source code in the parent directory:

   ```js
   // const pluginUnfurl = require("../");
   const pluginUnfurl = require("eleventy-plugin-unfurl");
   ```

2. Install the demo dependencies:

   ```text
   cd demo
   npm install
   ```

3. Run the demo locally:
   ```text
   npm run dev
   ```
