import React from 'react'
import Post from './index'

const Comment = ({ comment }) => {
  if (typeof comment == 'string') {
    return <p>{comment}</p>
  } else if (comment.properties) {
    return <Post className="p-comment" post={comment} />
  } else {
    return null
  }
}

export default Comment
