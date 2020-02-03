module.exports = {
  pathPrefix: 'curehht-gatsby.github.io',
  siteMetadata: {
    title: `Болезнь Рандю-Ослера-Вебера (HHT)`,
    title_text: `наследственное заболевание, встречается у одного из 5000 человек в результате чего на разных участках кожи и слизистых оболочках губ,
     рта, во внутренних органах образуются множественные аномалии сосудов, которые кровоточат.`,
    description: `Болезнь Рандю — Ослера — Вебера: Симптомы, Диагностика, Лечение`,
    author: `@gatsbyjs + @alexbaumgertner as copy-paster`,
    mainMenu: [
      {
        url: '',
        text: 'диагностика',
      },
      {
        url: '',
        text: 'лечение',
      },
      {
        url: '',
        text: 'образ жизни',
      },
      {
        url: 'статьи',
        text: '',
      },
      {
        url: '',
        text: 'книги',
      },
      {
        url: '',
        text: 'новости',
      },
      {
        url: '',
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
