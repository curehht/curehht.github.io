import classes from './document.module.css'

type DocumentWithBlocks = {
  title: string
  description: string
  is_published: boolean
  blocks: BlockData[]
}

type BlockData = {
  type: string
  position: number
  title?: string
  content: string
  url?: string
  id?: string
  created_at?: Date
  updated_at?: Date
}

const Document = ({ document }: { document: DocumentWithBlocks }) => {
  return (
    <div className={classes.document}>
      <h1>{document.title}</h1>
      <p>{document.description}</p>
      <ul>
        {document.blocks.map((block) => {
          switch (block.type) {
            case 'paragraph':
              return (
                <DocumentParagraph key={block.id} content={block.content} />
              )
            case 'heading2':
              return <DocumentHeading2 key={block.id} content={block.content} />
            case 'heading3':
              return <DocumentHeading3 key={block.id} content={block.content} />
            case 'list':
              return <DocumentList key={block.id} content={block.content} />
            case 'youtube':
              return <DocumentYoutube key={block.id} url={block.url} />
            case 'image':
              return <DocumentImage key={block.id} url={block.url} />
            case 'quote':
              return (
                <DocumentQuote
                  key={block.id}
                  content={block.content}
                  url={block.url}
                />
              )
            default:
              return <p>Unknown block type: {block.type}</p>
          }
        })}
      </ul>
    </div>
  )
}

export default Document

function DocumentParagraph({ content }: { content: string }) {
  return <p>{content}</p>
}

function DocumentHeading2({ content }: { content: string }) {
  return <h2>{content}</h2>
}

function DocumentHeading3({ content }: { content: string }) {
  return <h3>{content}</h3>
}

function DocumentList({ content }: { content: string }) {
  // Split content by new lines and render each as a list item
  return (
    <ul>
      {content
        .split('\n')
        .filter((item) => item.trim().length > 0)
        .map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
    </ul>
  )
}

function DocumentYoutube({ url }: { url: string }) {
  // Convert YouTube URL to embed format
  const convertToEmbedUrl = (youtubeUrl: string): string => {
    // Handle different YouTube URL formats
    const patterns = [
      // Patterns to extract the YouTube video ID from various common URL formats:
      // 1. Matches standard watch URLs, short youtu.be URLs, and embed URLs.
      // 2. Handles watch URLs with additional query parameters.
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
      /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/,
    ]

    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }

    // If no pattern matches, return the original URL
    return youtubeUrl
  }

  const embedUrl = convertToEmbedUrl(url)

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}

function DocumentImage({ url }: { url: string }) {
  return (
    <div>
      <img src={url} width={300} />
    </div>
  )
}

function DocumentQuote({ content, url }: { content: string; url: string }) {
  return (
    <section>
      <blockquote>
        {content}
        {url && (
          <footer>
            <cite>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#555',
                  textDecoration: 'underline',
                  fontSize: '0.95em',
                  marginLeft: '0.5em',
                  wordBreak: 'break-all',
                }}
              >
                {url}
              </a>
            </cite>
          </footer>
        )}
      </blockquote>
    </section>
  )
}
