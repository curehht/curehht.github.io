import path from 'path'
import Head from 'next/head'

import Layout from '../../src/layouts/Layuot'
import getFileData from '../../src/helpers/getFileData'

const diagnosticsDirectory = path.join(process.cwd(), 'content', 'treatment')

export async function getStaticProps () {
  const fileData = await getFileData(path.join(diagnosticsDirectory, `treatment-of-hht.md`))
  return {
    props: {
      fileData,
    },
  }
}

function TreatmentPage ({ fileData }) {
  
  return (
    <Layout>
      <Head>
        <title>{fileData.metaData.title}</title>
      </Head>
      <article>
        <h2>{fileData.metaData.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: fileData.html }} />
      </article>
    </Layout>
  )
}

export default TreatmentPage
