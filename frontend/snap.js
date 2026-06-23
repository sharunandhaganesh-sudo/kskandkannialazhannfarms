// react-snap configuration for Vercel serverless environment
// Uses @sparticuz/chromium for missing libnss3 dependencies

let executablePath = undefined;

// Load @sparticuz/chromium on Vercel (CI environment)
if (process.env.CI) {
  try {
    const chromium = require('@sparticuz/chromium-core');
    executablePath = chromium.executablePath;
  } catch (e) {
    console.warn('⚠️  @sparticuz/chromium-core not available, falling back to system Chromium');
  }
}

module.exports = {
  source: 'build',
  minifyHtml: { collapseWhitespace: false, removeComments: false },
  puppeteerArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
  ],
  puppeteer: {
    executablePath: executablePath,
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
