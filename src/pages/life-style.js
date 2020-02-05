import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = () => (
  <Layout>
    <SEO title="life-style" />
    <h1>life-style</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Page
