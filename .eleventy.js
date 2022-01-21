const Cache = require("@11ty/eleventy-cache-assets");

const formatDate = (date) => {
  const dateObject = new Date(date);

  const nth = (date) => {
    if (date > 3 && date < 21) return "th";
    switch (date % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const locale = (date, options) => date.toLocaleDateString("en-GB", options);

  return `${locale(dateObject, { weekday: "long" })}, ${locale(dateObject, {
    day: "numeric",
  })}<sup>${nth(dateObject)}</sup> ${locale(dateObject, {
    month: "long",
  })}, ${locale(dateObject, {
    year: "numeric",
  })}`;
};

const template = ({
  image,
  title,
  url,
  publisher,
  description,
  logo,
  author,
  date,
}) => {
  const imageEl = `
      <img
        class="unfurl__image"
        src="${image.url}"
        width="${image.width}"
        height="${image.height}"
        alt=""
      />
    `;
  const titleEl = `
      <h4 class="unfurl__heading">
        <a class="unfurl__link" href="${url}">${title}</a>
      </h4>
    `;
  const descriptionEl = `<p class="unfurl__description">${description}</p>`;
  const logoEl = `
      <img
        class="unfurl__logo"
        src="${logo.url}"
        width="${logo.width}"
        height="${logo.height}"
        alt=""
      />
    `;
  const dateEl = `
      <time class="unfurl__date" datetime="${date}">
        Posted ${formatDate(date)}
      </time>
    `;
  const publisherEl = `<span class="unfurl__publisher">Published on ${publisher}</span>`;

  return `
    <article class="unfurl">
      ${titleEl}
      ${image ? imageEl : ""}
      ${description ? descriptionEl : ""}
      ${logo ? logoEl : ""}
      <small class="unfurl__meta">
        ${publisher ? publisherEl : ""}
        ${date ? dateEl : ""}
      </small>
    </article>`;
};

module.exports = (eleventyConfig, options = {}) => {
  eleventyConfig.addAsyncShortcode("unfurl", async (link) => {
    const metadata = await Cache(`https://api.microlink.io/?url=${link}`, {
      duration: "1m",
      type: "json",
    });

    if (options.template) {
      return options.template(metadata.data);
    }
    return template(metadata.data);
  });
};
