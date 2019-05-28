import React from "react"
import { graphql, Link } from "gatsby"

const BlogPostTemplate = ({ data, pageContext }) => {
 const { markdownRemark } = data
 const { frontmatter, html } = markdownRemark
 const { allPosts } = pageContext

 return (
   <div>
     <h1>{frontmatter.title}</h1>
     <h2>{frontmatter.date}</h2>
     <div dangerouslySetInnerHTML={{ __html: html }} />

     {allPosts.map(({ node: { frontmatter: { title, date, path } } }) => (
       <div key={title}>
         <Link to={path}>
           <span>{date}:&nbsp;</span>
           {title}
         </Link>
       </div>
     ))}
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
