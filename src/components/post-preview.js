import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark as syntaxStyle } from 'react-syntax-highlighter/styles/hljs'
import pretty from 'pretty'
import Post from '../components/post/index'

// import jf2ToMf2 from '../modules/jf2-to-mf2'
const defaultProperties = {
  published: [new Date().toISOString()],
  author: [
    {
      type: ['h-card'],
      properties: {
        name: ['Author Name'],
        url: ['http://example.com/author'],
      },
    },
  ],
}

const PostPreview = ({ post, title }) => {
  const url = 'http://examples.tpxl.io#' + title.replace(' ', '-')
  const fullPostProperties = {
    url,
    ...defaultProperties,
    ...post.properties,
  }
  const fullPost = { ...post, properties: fullPostProperties }

  return (
    <div id={title.replace(' ', '-')} className="post-preview">
      {title && (
        <h2 className="post-preview__title">
          <a href={url}>🔗</a> {title}
        </h2>
      )}
      <details open>
        <summary>
          <h4>Rendered Post</h4>
        </summary>
        <div className="rendered-post">
          <Post post={fullPost} />
        </div>
      </details>
      {/* <details>
      <summary>
        <h4>JF2 JSON</h4>
      </summary>
      <SyntaxHighlighter language="json" style={syntaxStyle}>
        {JSON.stringify(post, null, 2)}
      </SyntaxHighlighter>
    </details> */}
      <details>
        <summary>
          <h4>Micropub MF2 JSON</h4>
        </summary>
        <SyntaxHighlighter language="json" style={syntaxStyle}>
          {JSON.stringify(post, null, 2)}
        </SyntaxHighlighter>
      </details>
      <details>
        <summary>
          <h4>Full Parsed MF2 JSON</h4>
        </summary>
        <SyntaxHighlighter language="json" style={syntaxStyle}>
          {JSON.stringify(fullPost, null, 2)}
        </SyntaxHighlighter>
      </details>
      <details>
        <summary>
          <h4>HTML</h4>
        </summary>
        <SyntaxHighlighter language="html" style={syntaxStyle}>
          {pretty(
            renderToStaticMarkup(<Post post={fullPost} />)
              .replace('<header></header>', '')
              .replace('<footer></footer>', '')
          )}
        </SyntaxHighlighter>
      </details>
    </div>
  )
}

export default PostPreview
