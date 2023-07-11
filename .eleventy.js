const EleventyFetch = require("@11ty/eleventy-fetch");
const { DOMParser, parseHTML } = require('linkedom');
const probe = require('probe-image-size');

const TITLE_SELECTORS = [
  { selector: `meta[property='og:title']`, attribute: 'content' },
  { selector: `meta[property='twitter:title']`, attribute: 'content' },
  { selector: 'title', attribute: 'textContent'}
]

const DESC_SELECTORS = [
  { selector: `meta[property='description']`, attribute: 'content' },
  { selector: `meta[property='og:description']`, attribute: 'content' },
  { selector: `meta[property='twitter:description']`, attribute: 'content' },
]

const IMAGE_SELECTORS = [
  { selector: `meta[property='og:image']`, attribute: 'content' },
  { selector: `meta[property='twitter:image']`, attribute: 'content' },
]

const LOGO_SELECTORS = [
  { selector: `link[rel='apple-touch-icon']`, attribute: 'href' },
  { selector: `link[rel='icon']`, attribute: 'href' },
]

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

const findValueFromSelectors = (selectors, document) => {
  let value = null;
  for (let selector of selectors) {
    value = document.querySelector(selector.selector) ? document.querySelector(selector.selector)[selector.attribute] : null
    if (value) return value
  }
  return value
}

const findImageFromSelectors = async (selectors, document, link) => {
  let image = findValueFromSelectors(selectors, document)

  if (!image) return {
    url: null,
    width: null,
    height: null,
    type: null,
  }

  if (image.startsWith('/'))
  {
    image = `${(new URL(link)).origin}${image}`
  }

  let result = await probe(image)

  return {
    url: image,
    width: result?.width,
    height: result?.height,
    type: result?.type,
  }
}

module.exports = (eleventyConfig, options = {}) => {
  eleventyConfig.addAsyncShortcode("unfurl", async (link) => {
    try {
      const html = await EleventyFetch(link, {
        duration: options.duration || "1m",
        type: "text",
        directory: options.directory || '.cache',
      })

      const { document } = parseHTML(html)

      const metadata = {
        title: findValueFromSelectors(TITLE_SELECTORS, document),
        description: findValueFromSelectors(DESC_SELECTORS, document),
        lang: document.querySelector('html')?.lang || 'en',
        publisher: (new URL(link)).host,
        url: link,
        image: await findImageFromSelectors(IMAGE_SELECTORS, document, link),
        logo: await findImageFromSelectors(LOGO_SELECTORS, document, link),
      }

      if (options.template) {
        return options.template(metadata);
      }
      return template(metadata);
    } catch (error) {
      console.error(error);
      return link;
    }
  });
};
