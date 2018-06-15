import React from 'react'

const Author = ({ post, type }) => {
  let url = ''
  let image = 'https://placeimg.com/100/100/people'
  let name = 'Unknown'
  let actionText = ''
  if (type == 'like') {
    actionText = 'Liked'
  } else if (type == 'repost') {
    actionText = 'Reposted'
  }
  if (post.properties) {
    const properties = post.properties

    // Get the url for the post
    if (properties.url && properties.url[0]) {
      url = properties.url[0]
    } else if (properties[`${type}-of`] && properties[`${type}-of`][0]) {
      url = properties[`${type}-of`][0]
    } else if (properties.author) {
      if (
        typeof properties.author == 'string' &&
        properties.author.indexOf('http') === 0
      ) {
        url = properties.author
      } else if (
        properties.author.properties &&
        properties.author.properties.url &&
        properties.author.properties.url[0]
      ) {
        url = properties.author.properties.url[0]
      }
    }

    // Get the author photo
    if (
      properties.author &&
      properties.author.properties &&
      properties.author.properties.photo &&
      properties.author.properties.photo[0]
    ) {
      image = properties.author.properties.photo[0]
    }

    // Get the author name
    if (
      properties.author &&
      properties.author.properties &&
      properties.author.properties.name &&
      properties.author.properties.name[0]
    ) {
      name = properties.author.properties.name[0]
    }
  }

  return (
    <a className={`p-${type} h-cite u-url`} href={url}>
      <img className="u-photo" src={image} alt={`${actionText} by ${name}`} />
    </a>
  )
}

export default Author
