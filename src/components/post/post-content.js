import React from 'react'
// TODO: Look into using interweave in here to autolink and escape stuff. Has a problem of wrapping everything in span tags

const PostContent = ({ content }) => {
  if (content && content.html) {
    return (
      <div
        className="e-content"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    )
  } else if (content && content.value) {
    return <p className="e-content">{content.value}</p>
  } else if (content) {
    return <p className="e-content">{content}</p>
  }
}

export default PostContent
