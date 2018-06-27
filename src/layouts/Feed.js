import React from 'react'

const Feed = ({ children, data }) => {
  return <React.Fragment>{children()}</React.Fragment>
}

export default Feed
