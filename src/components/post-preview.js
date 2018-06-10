import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Link from 'gatsby-link'
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
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </details>
    <details>
      <summary>
        <h4>MF2 JSON</h4>
      </summary>
      <pre>{JSON.stringify(jf2ToMf2(post), null, 2)}</pre>
    </details>
    <details>
      <summary>
        <h4>HTML</h4>
      </summary>
      <pre>{renderToStaticMarkup(<Post post={jf2ToMf2(post)} />)}</pre>
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
