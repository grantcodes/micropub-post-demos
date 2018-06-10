import React from 'react'

const Post = ({ post }) => {
  let content = post.properties.content
  if (Array.isArray(content)) {
    content = content[0]
  }
  if (content && content.html) {
    content = (
      <div
        className="e-content"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    )
  } else if (content && content.value) {
    content = <p className="e-content">{content.value}</p>
  } else if (content) {
    content = <p className="e-content">{content}</p>
  }

  const property = (name, El) => {
    if (post.properties[name]) {
      return post.properties[name].map(value => <El value={value} />)
    }
    return null
  }

  return (
    <article className="h-entry">
      <header>
        {property('name', ({ value }) => <h1 className="p-name">{value}</h1>)}
      </header>
      {post.properties.photo &&
        post.properties.photo.map(photo => <img src={photo} />)}
      {post.properties.video &&
        post.properties.video.map(video => <video src={video} controls />)}
      {post.properties.audio &&
        post.properties.audio.map(audio => <audio src={audio} controls />)}

      {content}

      {property('like-of', ({ value }) => <a href={value}>Like Of</a>)}
      {property('bookmark-of', ({ value }) => <a href={value}>Bookmark Of</a>)}
      {property('repost-of', ({ value }) => <a href={value}>Repost Of</a>)}
      {property('in-reply-to', ({ value }) => <a href={value}>Replied To</a>)}

      <footer>
        {post.properties.category && (
          <ul
            style={{
              display: 'inline-block',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {post.properties.category.map((cat, i) => (
              <li
                style={{ display: 'inline-block', marginRight: '.2em' }}
                key={'cat-' + i}
                className="p-category"
              >
                #{cat}
              </li>
            ))}
          </ul>
        )}
        {post.properties.published && (
          <time
            className="dt-published"
            datetime={post.properties.published[0]}
          >
            {new Date(post.properties.published).toDateString()}
          </time>
        )}
      </footer>
    </article>
  )
}

export default Post
