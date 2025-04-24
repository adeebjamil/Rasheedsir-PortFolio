module.exports = {
  siteUrl: 'https://yourdomain.com',
  generateRobotsTxt: false, // We already created robots.txt manually
  sitemapSize: 7000,
  exclude: ['/admin/*', '/private/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://yourdomain.com/sitemap.xml',
    ],
  },
}