const EleventyFetch = require("@11ty/eleventy-fetch");

const templateReturn = (template, boolean) => {
  if (boolean) {
    return template;
  } else {
    return "";
  }
};

const imageTemplate = ({ url, width, height }) => `
  <img
    class="unfurl__image"
    src="${url}"
    width="${width}"
    height="${height}"
    alt="Page preview image"
  />
`;

const titleTemplate = ({ url, title }) => `
  <h4 class="unfurl__heading">
    <a class="unfurl__link" href="${url}">${title}</a>
  </h4>
`;

const descriptionTemplate = (description) => `
  <p class="unfurl__description">${description}</p>
`;

const logoTemplate = ({ url, width, height }) => `
  <img
    class="unfurl__logo"
    src="${url}"
    width="${width}"
    height="${height}"
    alt="Logo"
  />
`;

const publisherTemplate = (publisher) => `
  <span class="unfurl__publisher">${publisher}</span>
`;

const template = ({ title, url, image, description, logo, publisher }) => `
  <article class="unfurl">
    ${templateReturn(titleTemplate({ title, url }), title)}
    ${templateReturn(imageTemplate(image), image)}
    ${templateReturn(descriptionTemplate(description), description)}
    <small class="unfurl__meta">
      ${templateReturn(logoTemplate(logo), logo)}
      ${templateReturn(publisherTemplate(publisher), publisher)}
    </small>
  </article>
`;

module.exports = (eleventyConfig, options = {}) => {
  eleventyConfig.addAsyncShortcode("unfurl", async (link) => {
    try {
      const metadata = await EleventyFetch(
        `https://api.microlink.io/?url=${link}`,
        {
          duration: options.duration || "1m",
          type: "json",
          directory: options.directory || ".cache",
        }
      );

      if (options.template) {
        return options.template(metadata.data);
      }
      return template(metadata.data);
    } catch (error) {
      console.error(error);
      return link;
    }
  });
};
