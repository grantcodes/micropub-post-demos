const fs = require('fs')
const axios = require('axios')
const crypto = require('crypto')

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators

  // // fetch jf2 posts
  // const fetchJf2Posts = () =>
  //   axios.get(`https://grantcodes.github.io/jf2-examples/feed.json`)
  // // await for results
  // const res = await fetchJf2Posts()

  // // map into these results and create nodes
  // res.data.children.map((jf2, i) => {
  //   // Create your node object
  //   const postNode = {
  //     // Required fields
  //     id: `${i}`,
  //     parent: `__SOURCE__`,
  //     internal: {
  //       type: `Jf2Post`, // name of the graphQL query --> allJf2Post {}
  //       // contentDigest will be added just after
  //       // but it is required
  //     },
  //     children: [],
  //     json: JSON.stringify(jf2),
  //   }

  //   // Get content digest of node. (Required field)
  //   const contentDigest = crypto
  //     .createHash(`md5`)
  //     .update(JSON.stringify(postNode))
  //     .digest(`hex`)
  //   // add it to postNode
  //   postNode.internal.contentDigest = contentDigest

  //   // Create node with the gatsby createNode() API
  //   createNode(postNode)
  // })

  // await for results
  const posts = []

  const files = fs.readdirSync(__dirname + '/src/posts')
  files.forEach(filename => {
    const contents = fs.readFileSync(`${__dirname}/src/posts/${filename}`)
    posts.push({
      name: filename
        .replace(/-/g, ' ')
        .slice(4)
        .slice(0, -5),
      json: contents.toString(),
    })
  })

  // map into these results and create nodes
  posts.map((post, i) => {
    // Create your node object
    const postNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Mf2Post`, // name of the graphQL query --> allMf2Post {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],
      name: post.name,
      json: post.json,
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(postNode))
      .digest(`hex`)
    // add it to postNode
    postNode.internal.contentDigest = contentDigest

    // Create node with the gatsby createNode() API
    createNode(postNode)
  })

  return
}

// Make sure feed pages dont have a layout
exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    if (page.path.startsWith('/feeds/')) {
      page.layout = 'Feed'
      // Update the page.
      createPage(page)
    }

    resolve()
  })
}
