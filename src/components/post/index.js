import React from 'react'
import PostContent from './post-content'
import Author from './author'
import Comment from './comment'
import Face from './face'
import Rsvp from './Rsvp'

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
      {post.properties.featured || post.properties.name ? (
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
      ) : null}

      {property('photo', ({ value }) => {
        const alt = value && value.alt ? value.alt : ''
        value = value.value ? value.value : value
        return value ? <img className="u-photo" src={value} alt={alt} /> : null
      })}

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
              Like of {new URL(value).hostname}
            </a>
          )
      )}
      {property(
        'bookmark-of',
        ({ value }) =>
          typeof value == 'string' && (
            <a className="u-bookmark-of" href={value}>
              Bookmark of {new URL(value).hostname}
            </a>
          )
      )}
      {property(
        'repost-of',
        ({ value }) =>
          typeof value == 'string' && (
            <a className="u-repost-of" href={value}>
              Repost of {new URL(value).hostname}
            </a>
          )
      )}
      {!post.properties.rsvp &&
        property(
          'in-reply-to',
          ({ value }) =>
            typeof value == 'string' && (
              <a className="u-in-reply-to" href={value}>
                Replied to {new URL(value).hostname}
              </a>
            )
        )}

      <Rsvp properties={post.properties} />

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
