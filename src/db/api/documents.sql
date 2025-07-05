SELECT
  d.id,
  d.title,
  d.description,
  json_build_object(
    'id', u.id,
    'email', u.email,
    'name', u.name
  ) AS author,

  -- Combined sorted blocks
  COALESCE(
    (
      SELECT json_agg(block ORDER BY (block->>'position')::int)
      FROM (
        SELECT jsonb_build_object(
          'block_type', 'text',
          'id', dtb.id,
          'position', dtb.position,
          'content_type', dtb.text_type,
          'content', dtb.content,
          'provider', NULL,
          'url', NULL,
          'title', NULL
        )
        FROM document_text_blocks dtb
        WHERE dtb.document_id = d.id

        UNION ALL

        SELECT jsonb_build_object(
          'block_type', 'media',
          'id', dmb.id,
          'position', dmb.position,
          'content_type', dmb.provider,
          'content', NULL,
          'provider', dmb.provider,
          'url', dmb.url,
          'title', dmb.title
        )
        FROM document_media_blocks dmb
        WHERE dmb.document_id = d.id
      ) AS block_list(block)
    ),
    '[]'::json
  ) AS blocks

FROM documents d
LEFT JOIN "user" u ON d.author_id = u.id
WHERE d.id = 'doc-001';
