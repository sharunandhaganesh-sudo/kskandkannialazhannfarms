// react-snap configuration for Vercel serverless environment
// Uses @sparticuz/chromium for missing libnss3 dependencies

module.exports = {
  source: 'build',
  minifyHtml: { collapseWhitespace: false, removeComments: false },
  puppeteerArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
  ],
  puppeteer: {
    // Use @sparticuz/chromium for serverless environments (Vercel, Lambda, etc)
    executablePath: process.env.CI
      ? require('@sparticuz/chromium').executablePath
      : undefined,
  },
  skipThirdPartyRequests: true,
  waitFor: 1000,
  include: [
    '/',
    '/contact',
    '/areas-we-serve',
    '/category/cows',
    '/category/goats',
    '/category/dogs',
    '/category/poultry',
    '/category/eggs',
    '/animal/chippiparai',
    '/animal/rajapalayam',
    '/animal/kanni',
    '/animal/kombai',
    '/animal/hf-cow',
    '/animal/sembari-goat',
    '/animal/country-chicken',
    '/animal/naatu-koli',
  ],
  // Disable crawling of non-existent routes
  excludes: ['/404'],
};
