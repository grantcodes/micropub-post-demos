import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark as syntaxStyle } from 'react-syntax-highlighter/styles/hljs'
import pretty from 'pretty'
import Post from '../components/post'

import jf2ToMf2 from '../modules/jf2-to-mf2'

const PostPreview = ({ post }) => (
  <div
    className="post-preview"
    style={{
      display: 'block',
      marginBottom: '3em',
      paddingBottom: '3em',
      borderBottom: '1px solid #444',
    }}
  >
    <details>
      <summary>
        <h4>JF2 JSON</h4>
      </summary>
      <SyntaxHighlighter language="json" style={syntaxStyle}>
        {JSON.stringify(post, null, 2)}
      </SyntaxHighlighter>
    </details>
    <details>
      <summary>
        <h4>MF2 JSON</h4>
      </summary>
      <SyntaxHighlighter language="json" style={syntaxStyle}>
        {JSON.stringify(jf2ToMf2(post), null, 2)}
      </SyntaxHighlighter>
    </details>
    <details>
      <summary>
        <h4>HTML</h4>
      </summary>
      <SyntaxHighlighter language="html" style={syntaxStyle}>
        {pretty(renderToStaticMarkup(<Post post={jf2ToMf2(post)} />))}
      </SyntaxHighlighter>
    </details>
    <details>
      <summary>
        <h4>Rendered Post</h4>
      </summary>
      <Post post={jf2ToMf2(post)} />
    </details>
  </div>
)

export default PostPreview
