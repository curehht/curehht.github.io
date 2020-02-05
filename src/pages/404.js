import { Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Не нашил такой страницы</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default NotFoundPage
