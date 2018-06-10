import React from 'react'
import Link from 'gatsby-link'
import PostPreview from '../components/post-preview'

const IndexPage = props => {
  const posts = props.data.allJf2Post.edges.map(edge =>
    JSON.parse(edge.node.json)
  )
  return <div>{posts.map(post => <PostPreview post={post} />)}</div>
}

export default IndexPage

export const query = graphql`
  query Jf2PostQuery {
    allJf2Post {
      edges {
        node {
          json
        }
      }
    }
  }
`
