# eleventy-plugin-unfurl

[![npm](https://img.shields.io/npm/v/eleventy-plugin-unfurl)](https://www.npmjs.com/package/eleventy-plugin-unfurl)

Turn URLs into rich cards. Show a preview image, page title, description and other meta information all inside a neatly presented card. **Collaborative effort between [Sara Soueidan](https://www.sarasoueidan.com) and myself**.

[See the live demo](https://eleventy-plugin-unfurl.netlify.app) and the [demo directory in the repo](https://github.com/daviddarnes/eleventy-plugin-unfurl/tree/main/demo) to see it all in action.

- [Installation](#installation)
- [Options](#options)
- [Development](#development)
- [Credits](#credits)

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

- `duration`: The duration of time before the cache is busted and new data is captured from the URL. Default is `1m`, check out the [Eleventy Fetch documentation for more info](https://www.11ty.dev/docs/plugins/fetch/#change-the-cache-duration).

- `template`: A custom template to present unfurled links. Can be a totally custom HTML template string.

  Example:

  ```js
  eleventyConfig.addPlugin(pluginUnfurl, {
    template: ({ title, url }) => `<a href="${url}">${title}</a>`,
  });
  ```

  Check out the [Microlink API documentation](https://microlink.io/docs/api/getting-started/data-fields) for a full list of possible data fields.

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

## Credits

- [Microlink](https://microlink.io) for the underlying API
- [Sara Soueidan](https://www.sarasoueidan.com) for the idea and initial execution
- [Kiko Beats](https://kikobeats.com) for help with using Microlink
- [Elly Loel](https://www.ellyloel.com) for providing feedback
