import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = () => (
  <Layout>
    <SEO title="books" />
    <h1>books</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Page
