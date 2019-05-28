import React from "react"
import { graphql } from "gatsby"

const BlogPostTemplate = ({ data }) => {
 const { markdownRemark } = data
 const { frontmatter, html } = markdownRemark

 return (
   <div>
     <h1>{frontmatter.title}</h1>
     <h2>{frontmatter.date}</h2>
     <div dangerouslySetInnerHTML={{ __html: html }} />
   </div>
 )
}

export const pageQuery = graphql`
 query($slug: String!) {
   markdownRemark(frontmatter: { path: { eq: $slug } }) {
     html
     frontmatter {
       date(formatString: "MMMM DD, YYYY")
       title
     }
   }
 }
`

export default BlogPostTemplate
