import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'


const Post = () => {
  const [post, setPost]=useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate=useState()
  const params=useParams()
  const auth = getAuth()

  useEffect(()=>{
    const fetchPost=async()=>{
      const docRef=doc(db, "posts", params.postId)
      const docSnap=await getDoc(docRef)

      if(docSnap.exists()){
        console.log(docSnap.data())
        setPost(docSnap.data())
        setLoading(false)
      }
    }
    fetchPost()
  },[params.postId])
  return (
    <div>
      <h1>Post</h1>
      <div>
        {post.content}
        <img src={post.imgUrls} alt="shs" />
      </div>  
    </div>
  )
}

export default Post