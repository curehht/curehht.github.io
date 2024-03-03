import path from 'path'
import Head from 'next/head'

import getFileData from '@/helpers/getFileData'

const diagnosticsDirectory = path.join(process.cwd(), 'content', 'life-style')

async function getData () {
  return await getFileData(path.join(diagnosticsDirectory, `blood-thinners.md`))
}

async function LifeStylePage () {
  const fileData = await getData();
  return (
    <div className="LifeStylePage">
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

export default LifeStylePage
