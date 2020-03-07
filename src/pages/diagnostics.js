import React from "react"
import {
  graphql,
} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <SEO title="diagnostics" />

      {posts.map(post => {
        return (
          <div>
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
      )

      })}
    </Layout>
  )
}

export default Page

export const query = graphql`
    query {
      allMarkdownRemark(filter: {frontmatter: {tags: {in: "диагностика"}}}) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
          html
        }
      }
    }

`
