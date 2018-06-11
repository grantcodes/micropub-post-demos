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
    <article className={post.type ? post.type[0] : 'h-entry'}>
      <header>
        {property('name', ({ value }) => <h1 className="p-name">{value}</h1>)}
      </header>

      {property('photo', ({ value }) => (
        <img className="u-photo" src={value} />
      ))}

      {property('video', ({ value }) => (
        <video className="u-video" src={value} controls />
      ))}

      {property('audio', ({ value }) => (
        <audio className="u-audio" src={value} controls />
      ))}

      {content}

      {property('like-of', ({ value }) => (
        <a className="u-like-of" href={value}>
          Like Of
        </a>
      ))}
      {property('bookmark-of', ({ value }) => (
        <a className="u-bookmark-of" href={value}>
          Bookmark Of
        </a>
      ))}
      {property('repost-of', ({ value }) => (
        <a className="u-repost-of" href={value}>
          Repost Of
        </a>
      ))}
      {property('in-reply-to', ({ value }) => (
        <a className="u-in-reply-to" href={value}>
          Replied To
        </a>
      ))}

      <footer>
        {post.properties.category && 'Categories: '}
        {post.properties.category && (
          <ul>
            {property('category', ({ value }) => (
              <li className="p-category">{value}</li>
            ))}
          </ul>
        )}

        {post.properties.published && 'Published: '}
        {property('published', ({ value }) => (
          <time className="dt-published" dateTime={value}>
            {new Date(value).toDateString()}
          </time>
        ))}

        {property('url', ({ value }) => (
          <a className="u-url" href={value}>
            Permalink
          </a>
        ))}
      </footer>
    </article>
  )
}

export default Post
