import React from "react"
import {
  Link,
  graphql,
} from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>
          Статьи
        </h1>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
              <h3>
                <Link
                  to={node.fields.slug}
                >
                  {node.frontmatter.title}
                </Link>
                {" "}
                <span>
                — {node.frontmatter.date}
              </span>
              </h3>

          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD.MM.YYYY")
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`
