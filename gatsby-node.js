const path = require("path")

exports.createPages = ({ actions: { createPage }, graphql }) => {
 const blogPostTemplate = path.resolve(`src/templates/blog-post-template.js`)

 // query the created graph of markdown data (and other gatsby metadata)
 return graphql(`
   {
     allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
       edges {
         node {
           frontmatter {
             path
             date
             title
           }
         }
       }
     }
   }
 `).then(result => {
   if (result.errors) {
     return Promise.reject(result.errors)
   }

   // edges is an array of pages
   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
     createPage({
       path: node.frontmatter.path, // URL
       component: blogPostTemplate,
       context: {
         // In your blog post template's graphql query, you can use slug
         // as a GraphQL variable to query for data from the markdown file.
         slug: node.frontmatter.path,
       },
     })
   })
 })
}


