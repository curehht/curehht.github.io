import path from 'path'
import Head from 'next/head'

import Layout from '../../src/layouts/Layuot'
import getFileData from '../../src/helpers/getFileData'

const diagnosticsDirectory = path.join(process.cwd(), 'content', 'life-style')

export async function getStaticProps () {
  const fileData = await getFileData(path.join(diagnosticsDirectory, `blood-thinners.md`))
  return {
    props: {
      fileData,
    },
  }
}

function LifeStylePage ({ fileData }) {
  
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

export default LifeStylePage
