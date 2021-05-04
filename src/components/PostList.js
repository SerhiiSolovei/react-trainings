const PostList = (props) => {
    const {posts} = props
    console.log(posts)
    return <section>
       {posts.map(post => {
           return <article>
               <h3>{post.title} <span>edit post</span></h3>
               <time dateTime={post.date}>{post.date}</time>
               <p>{post.content}</p>
        </article>
       })}
    </section>
}

export default PostList