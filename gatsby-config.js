module.exports = {
  pathPrefix: 'curehht.github.io',
  siteMetadata: {
    title: `Болезнь Рандю-Ослера-Вебера (HHT)`,
    description: `Болезнь Рандю — Ослера — Вебера: Симптомы, Диагностика, Лечение`,
    author: `@gatsbyjs + @alexbaumgertner`,
    mainMenu: [
      {
        url: '/diagnostics',
        text: 'диагностика',
      },
      {
        url: '/treatment',
        text: 'лечение',
      },
      {
        url: '/life-style',
        text: 'образ жизни',
      },
      {
        url: '/articles',
        text: 'статьи',
      },
      {
        url: '/books',
        text: 'книги',
      },
      {
        url: '/news',
        text: 'новости',
      },
      {
        url: '/contacts',
        text: 'контакты',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
