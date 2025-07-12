const Document = ({ document }: { document: Document }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" />
        </fieldset>
        <fieldset>
          <label htmlFor="is_published">Is published</label>
          <input type="checkbox" name="is_published" />
        </fieldset>
        <button type="submit">save</button>
      </form>
      <div>
        Blocks:
        <ol>
          {blocksData.map((block, index) => (
            <li key={index}>
              <DocumentBlock blockData={block} onChange={handleBlockChange} />
            </li>
          ))}
        </ol>
      </div>
      <button
        type="button"
        onClick={() => {
          setBlocksData((prevBlocks) => [
            ...prevBlocks,
            {
              position: prevBlocks.length + 1,
              type: 'paragraph',
              title: '',
              content: '',
              url: '',
            },
          ])
        }}
      >
        Add block
      </button>
    </div>
  )
}

export default Document
