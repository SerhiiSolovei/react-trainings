const PostList = (props) => {
    const {posts, postsHandler} = props
    
    return <section>
       {posts.map(post => {
           return <article>
               <h3 onClick={postsHandler()}>{post.title}</h3>
               <time dateTime={post.date}>{post.date}</time>
               <p>{post.content}</p>
        </article>
       })}
    </section>
}

export default PostList