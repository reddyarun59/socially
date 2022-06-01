import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import PostItem from "../components/PostItem"

const Home = () => {
  const [posts, setPosts]=useState(null)
  const [loading, setLoading] = useState(true)

  const params=useParams()

  useEffect(() =>{
    const fetchPosts=async()=>{
      try {
        //Get Reference
        const postsRef=collection(db, "posts")

        //Create a query for the posts
        //const q= query(postsRef)

        //Execute query
        const querySnap=await getDocs(postsRef)

        const posts=[]
        querySnap.forEach((doc)=>{
          return posts.push({
            id:doc.id,
            data:doc.data()
          })
        })

        setPosts(posts)
        setLoading(false)
      } catch (error) {
        toast.error("Could not fetch posts")
      }
    }
    fetchPosts()
  },[])
  return (
    <div>
      <header>
        <h1>Feed</h1>
      </header>
      {loading?<h1>Loading</h1>:<div>
        {posts.map(post=>(
          <PostItem post={post.data} id={post.id} key={post.id}/>
        ))}
      </div>}
      
    </div>
  )
}

export default Home