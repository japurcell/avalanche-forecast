const express = require('express');
const app = express();

app.use(express.static('.', {
  etag: true, // Just being explicit about the default.
  lastModified: true,  // Just being explicit about the default.
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-cache');
    // const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

    // if (path.endsWith('.html')) {
    //   // All of the project's HTML files end in .html
    //   res.setHeader('Cache-Control', 'no-cache');
    // } else if (hashRegExp.test(path)) {
    //   // If the RegExp matched, then we have a versioned URL.
    //   res.setHeader('Cache-Control', 'max-age=31536000');
    // }
  },
}));

const listener =
  app.listen(
    3000,
    () => console.log(`Your server is runing on port ${listener.address().port}`));
