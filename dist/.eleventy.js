module.exports = function(eleventyConfig) {

  return {
    dir: {
      input: 'views',
      output: '../dist'
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
