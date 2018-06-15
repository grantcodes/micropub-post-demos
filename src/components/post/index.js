import React from 'react'
import PostContent from './post-content'
import Author from './author'
import Comment from './comment'
import Face from './face'

const Post = ({ post, className }) => {
  const property = (name, El) => {
    if (post.properties[name] && Array.isArray(post.properties[name])) {
      return post.properties[name].map((value, i) => (
        <El value={value} key={'post-property' + name + i} />
      ))
    }
    return null
  }

  const postClasses = []
  if (post.type && post.type[0]) {
    postClasses.push(...post.type)
  }
  if (className) {
    postClasses.push(className)
  }

  return (
    <article className={postClasses.join(' ')}>
      <header>
        {property(
          'featured',
          ({ value }) =>
            typeof value == 'string' && (
              <img className="u-featured" src={value} />
            )
        )}
        {property('name', ({ value }) => <h1 className="p-name">{value}</h1>)}
      </header>

      {property(
        'photo',
        ({ value }) =>
          typeof value == 'string' && <img className="u-photo" src={value} />
      )}

      {property(
        'video',
        ({ value }) =>
          typeof value == 'string' && (
            <video className="u-video" src={value} controls />
          )
      )}

      {property(
        'audio',
        ({ value }) =>
          typeof value == 'string' && (
            <audio className="u-audio" src={value} controls />
          )
      )}

      {property('content', ({ value }) => <PostContent content={value} />)}

      {property(
        'like-of',
        ({ value }) =>
          typeof value == 'string' && (
            <a className="u-like-of" href={value}>
              Like Of
            </a>
          )
      )}
      {property(
        'bookmark-of',
        ({ value }) =>
          typeof value == 'string' && (
            <a className="u-bookmark-of" href={value}>
              Bookmark Of
            </a>
          )
      )}
      {property(
        'repost-of',
        ({ value }) =>
          typeof value == 'string' && (
            <a className="u-repost-of" href={value}>
              Repost Of
            </a>
          )
      )}
      {property(
        'in-reply-to',
        ({ value }) =>
          typeof value == 'string' && (
            <a className="u-in-reply-to" href={value}>
              Replied To
            </a>
          )
      )}

      <footer>
        {property('author', ({ value }) => <Author author={value} />)}
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

      {post.properties.comment &&
        post.properties.comment.length && (
          <div>
            <h3>Comments</h3>
            {property('comment', ({ value }) => <Comment comment={value} />)}
          </div>
        )}

      {post.properties.like &&
        post.properties.like.length &&
        property('like', ({ value }) => <Face post={value} type="like" />)}

      {post.properties.repost &&
        post.properties.repost.length &&
        property('repost', ({ value }) => <Face post={value} type="repost" />)}
    </article>
  )
}

export default Post
