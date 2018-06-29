import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    style={{
      backgroundColor: 'rebeccapurple',
      backgroundImage: 'linear-gradient(5deg, violet, rebeccapurple)',
      marginBottom: '2rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '2rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>{' '}
        <a
          href="https://github.com/grantcodes/micropub-post-demos"
          style={{ fontSize: '.5em', color: 'ghostwhite' }}
        >
          Contribute on Github
        </a>
      </h1>
    </div>
  </div>
)

export default Header
