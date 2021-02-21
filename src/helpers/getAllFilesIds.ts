import fs from 'fs'

export default function (path: string, ext: string = 'md'): String[] {
  const fileNames = fs.readdirSync(path)

  return fileNames.map(name => name.replace(/\.md$/, ''))
}
