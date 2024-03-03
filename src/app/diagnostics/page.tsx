import path from 'path'
import Head from 'next/head'

import getFileData from '@/helpers/getFileData'

const diagnosticsDirectory = path.join(process.cwd(), 'content', 'diagnostics')

async function getData () {
  return await getFileData(path.join(diagnosticsDirectory, `screening-tests.md`))
}

async function DiagnosticPage () {
  const fileData = await getData()
  return (
    <div className="DiagnosticPage">
      <Head>
        <title>{fileData.metaData.title}</title>
      </Head>
      <article>
        <h2>{fileData.metaData.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: fileData.html }} />
      </article>
    </div>
  )
}

export default DiagnosticPage
