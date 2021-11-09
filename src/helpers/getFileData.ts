import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

interface FileData {
  html: string
  metaData: { [key: string]: any }
}

export default async function (path: string): Promise<FileData> {
  const fileContent = fs.readFileSync(path, 'utf-8')
  const matterResult = matter(fileContent)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  return {
    html: processedContent.toString(),
    metaData: matterResult.data,
  }
}
