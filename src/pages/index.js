import React from 'react'
import Link from 'gatsby-link'
import PostPreview from '../components/post-preview'

const IndexPage = props => {
  const posts = props.data.allMf2Post.edges.map(edge => ({
    name: edge.node.name,
    mf2: JSON.parse(edge.node.json),
  }))
  return (
    <div>
      {posts.map((post, i) => (
        <PostPreview
          title={post.name}
          post={post.mf2}
          key={'post-preview-' + i}
        />
      ))}
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query Mf2PostQuery {
    allMf2Post {
      edges {
        node {
          name
          json
        }
      }
    }
  }
`
