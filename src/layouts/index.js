import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/header'
import './index.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[{ name: 'description', content: 'Example micropub posts' }]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '2rem',
        paddingTop: 0,
      }}
    >
      {children()}

      <footer>
        <h4>Feeds</h4>
        <ul>
          <li>
            <a href="/feeds/hfeed">h-feed</a>
          </li>
          <li>
            <a href="/feeds/allposts.json">All Posts JSON</a>
          </li>
        </ul>
      </footer>
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
