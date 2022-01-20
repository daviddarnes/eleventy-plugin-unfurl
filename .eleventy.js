const metascraper = require("metascraper")([
  require("metascraper-url")(),
  require("metascraper-title")(),
  require("metascraper-description")(),
  require("metascraper-author")(),
  require("metascraper-publisher")(),
  require("metascraper-image")(),
  require("metascraper-logo-favicon")(),
  require("metascraper-logo")(),
]);
const got = require("got");

module.exports = (eleventyConfig, options = {}) => {
  let template = ({
    image,
    title,
    url,
    publisher,
    desciption,
    logo,
    author,
    date,
  }) => {
    let imageEl = `<img class="unfurl__image" src="${image}" alt="" />`;
    let titleEl = `
      <h4 class="unfurl__heading">
        <a class="unfurl__link" href="${url}">${title}</a>
      </h4>
    `;
    let desciptionEl = `<p class="unfurl__description">${desciption}</p>`;
    let logoEl = `<img class="unfurl__logo" src="${logo}" alt="" />`;
    let dateEl = `<time class="unfurl__date" datetime="${date}">${date}</time>`;
    let metaEl = `
      <span class="unfurl__meta">
        ${publisher}${author ? ` &bull; ${author}` : ""}
      </span>
    `;
    return `
      <article class="unfurl">
        ${titleEl}
        ${image ? imageEl : ""}
        ${desciption ? desciptionEl : ""}
        ${logo ? logoEl : ""}
        ${publisher ? metaEl : ""}
        ${date ? dateEl : ""}
      </article>`;
  };

  eleventyConfig.addAsyncShortcode("unfurl", async (link) => {
    const { body: html, url } = await got(link);
    const metadata = await metascraper({ html, url });

    if (options.template) {
      return options.template(metadata);
    }
    return template(metadata);
  });
};
