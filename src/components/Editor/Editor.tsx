'use client'

import React, { useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import * as icons from 'react-bootstrap-icons'

import classes from './Editor.module.css'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

enum Icon {
  format_bold = 'B',
  format_italic = 'I',
  format_underlined = 'U',
  code = '</>',
  looks_one = 'H1',
  looks_two = 'H2',
  format_quote = '”',
  format_list_numbered = '1.',
  format_list_bulleted = '•',
  format_align_left = 'L',
  format_align_center = 'C',
  format_align_right = 'R',
  format_align_justify = 'J',
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-expect-error: Type mismatch for list types
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-expect-error: Type mismatch for list types
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      // @ts-expect-error: Type mismatch for list types
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()

  let IconComponent: icons.Icon

  switch (icon) {
    case Icon.format_align_left:
      IconComponent = icons.JustifyLeft
      break
    case Icon.format_align_center:
      IconComponent = icons.Justify
      break
    case Icon.format_align_right:
      IconComponent = icons.JustifyRight
      break
    case Icon.format_align_justify:
      IconComponent = icons.Justify
      break
    case Icon.format_list_bulleted:
      IconComponent = icons.ListUl
      break
    case Icon.format_list_numbered:
      IconComponent = icons.ListOl
      break
    case Icon.looks_one:
      IconComponent = icons.TypeH1
      break
    case Icon.looks_two:
      IconComponent = icons.TypeH2
      break
    case Icon.format_quote:
      IconComponent = icons.BlockquoteLeft
      break
    default:
      return null
  }

  return (
    <button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <IconComponent />
    </button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  let IconComponent: icons.Icon

  switch (icon) {
    case Icon.format_bold:
      IconComponent = icons.TypeBold
      break
    case Icon.format_italic:
      IconComponent = icons.TypeItalic
      break
    case Icon.format_underlined:
      IconComponent = icons.TypeUnderline
      break
    case Icon.code:
      IconComponent = icons.Code
      break
    default:
      return null
  }

  return (
    <button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <IconComponent />
    </button>
  )
}

type RichTextProps = {
  value: Descendant[]
  onChange?: (value: Descendant[]) => void
  readOnly?: boolean
}

const defaultValue: Descendant[] = [
  {
    // @ts-expect-error Slate editor type mismatch
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const RichText = ({
  value = defaultValue,
  onChange,
  readOnly,
}: RichTextProps) => {
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <div className={classes.component}>
      <Slate editor={editor} initialValue={value} onValueChange={onChange}>
        {!readOnly && (
          <div className={classes.controls}>
            <MarkButton format="bold" icon={Icon.format_bold} />
            <MarkButton format="italic" icon={Icon.format_italic} />
            <MarkButton format="underline" icon={Icon.format_underlined} />
            <MarkButton format="code" icon={Icon.code} />
            <BlockButton format="heading-one" icon={Icon.looks_one} />
            <BlockButton format="heading-two" icon={Icon.looks_two} />
            <BlockButton format="block-quote" icon={Icon.format_quote} />
            <BlockButton
              format="numbered-list"
              icon={Icon.format_list_numbered}
            />
            <BlockButton
              format="bulleted-list"
              icon={Icon.format_list_bulleted}
            />
            <BlockButton format="left" icon={Icon.format_align_left} />
            <BlockButton format="center" icon={Icon.format_align_center} />
            <BlockButton format="right" icon={Icon.format_align_right} />
            <BlockButton format="justify" icon={Icon.format_align_justify} />
          </div>
        )}
        <Editable
          className={classes.editor}
          disableDefaultStyles
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          readOnly={readOnly}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                console.log('event: ', event)
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default RichText
