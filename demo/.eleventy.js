// const pluginUnfurl = require("../"); // For local development

const pluginUnfurl = require("eleventy-plugin-unfurl");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginUnfurl);
};
