import React from 'react'

const Author = ({ author }) => {
  const property = (name, El) => {
    if (author.properties[name] && Array.isArray(author.properties[name])) {
      return author.properties[name].map((value, i) => (
        <El value={value} key={'author-property' + name + i} />
      ))
    }
    return null
  }

  if (typeof author == 'string' && author.indexOf('http') === 0) {
    return (
      <a className="h-card" href={author}>
        {author}
      </a>
    )
  } else if (author.properties) {
    let AuthorEl = props => <div className="h-card" {...props} />
    if (author.properties.url && author.properties.url[0]) {
      AuthorEl = props => (
        <a
          className="h-card u-url"
          href={author.properties.url[0]}
          {...props}
        />
      )
    }
    return (
      <AuthorEl>
        {property(
          'photo',
          ({ value }) =>
            typeof value == 'string' && <img className="u-photo" src={value} />
        )}
        {property(
          'name',
          ({ value }) =>
            typeof value == 'string' && <span className="p-name">{value}</span>
        )}
      </AuthorEl>
    )
  } else {
    return null
  }
}

export default Author
