import React from 'react'

const Rsvp = ({ properties }) => {
  if (!properties.rsvp || !properties['in-reply-to']) {
    return null
  }
  const rsvp = properties.rsvp[0]
  const urls = properties['in-reply-to']
  let text = ''
  switch (rsvp) {
    case 'yes':
      text = 'am going'
      break
    case 'no':
      text = 'am not going'
      break
    case 'maybe':
      text = 'am maybe going'
      break
    case 'interest':
      text = 'am interested in going'
      break
    default:
      break
  }

  return (
    <p>
      <data class="p-rsvp" value={rsvp}>
        I {text}
      </data>{' '}
      to {urls.length > 1 ? 'these' : 'this'} event:{' '}
      {urls.map(url => (
        <a key={`event-reply-${url}`} className="u-in-reply-to" href={url}>
          {url}
        </a>
      ))}
    </p>
  )
}

export default Rsvp
