import React from 'react'
import Post from '../../components/post/index'

const FeedHFeed = props => {
  const posts = props.data.allMf2Post.edges.map(edge => ({
    name: edge.node.name,
    mf2: JSON.parse(edge.node.json),
  }))
  return (
    <html>
      <body>
        <div className="h-feed">
          {posts.map((post, i) => <Post post={post.mf2} key={'post-' + i} />)}
        </div>
      </body>
    </html>
  )
}

export default FeedHFeed

export const query = graphql`
  query Mf2PostQueryHfeed {
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
