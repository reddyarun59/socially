import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({post, id}) => {
  return (
    <li>
        <div>
            <div>
                <Link to={`/profile/${post.userId}`}>
                    <h1>{post.firstName} {post.lastName}</h1>
                    <h2>@{post.username}</h2>
                </Link>
            </div>
            <div>
                <Link to={`/post/${id}`}>
                    <img src={post.imgUrls[0]} alt="profileImage"/>
                    <h1>{post.content}</h1>
                </Link>
            </div>
            <div>
                {/* <span>{post.likes.likeCount}</span> */}
            </div>

        </div>
    </li>
  )
}

export default PostItem