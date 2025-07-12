type BlockData = {
  type: string
  position: number
  title?: string
  content: string
  url?: string
}

type DocumentBlockProps = {
  blockData: BlockData
  onChange: (blockData: BlockData) => void
}
export const DocumentBlock = ({ blockData, onChange }: DocumentBlockProps) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...blockData,
      type: e.target.value,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...blockData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '20px',
      }}
    >
      <p>Block {blockData.position}</p>
      <fieldset>
        <label htmlFor="block_type">Type</label>
        <select name="type" onChange={handleTypeChange} value={blockData.type}>
          <option value="paragraph">Paragraph</option>
          <option value="heading1">Heading 1</option>
          <option value="heading2">Heading 2</option>
          <option value="heading3">Heading 3</option>
          <option value="list-item">List item</option>
          <option value="youtube">Youtube</option>
          <option value="vimeo">Vimeo</option>
          <option value="dailymotion">Dailymotion</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="quote">Quote</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="block_title">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={blockData.title}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Content</label>
        <input
          type="text"
          name="content"
          onChange={handleChange}
          value={blockData.content}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          onChange={handleChange}
          value={blockData.url}
        />
      </fieldset>
    </form>
  )
}
