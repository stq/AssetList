module.exports = {
  siteMetadata: {
    title: `Asset List and some trade stuff`,
    description: `A meaningful descriptions of site purpose`,
    author: `Viktor Kachan (https://github.com/stq)`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    }
  ],
}
