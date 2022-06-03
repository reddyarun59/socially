import React, { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from "../firebase.config"
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const auth = getAuth()
  const [posts, setPosts]=useState(null)
  const [loading, setLoading] = useState(true)
  const [changeDetails, setChangeDetails]= useState(false)
  const [formData, setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })

  useEffect(() =>{
    const fetchUserPosts = async()=>{
      const postsRef=collection(db, "posts")
      const q= query(postsRef, where("userRef", "==", auth.currentUser.uid))

      const querySnap= await getDocs(q)

      let posts=[]

      querySnap.forEach((doc)=>{
        return posts.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setPosts(posts)
      setLoading(false)
    }
    fetchUserPosts()
    //console.log(posts)
  },[auth.currentUser.uid])
  //console.log(posts)
  const {name, email}=formData
  const navigate=useNavigate()
  const onLogout=()=>{
    auth.signOut()
    navigate("/")
  }
  
  return (
    <div>
      <header>
        <p>My Profile</p>
        {name}
        <button type="button" onClick={onLogout}>Log Out</button>
      </header>
      <div>
        {loading?<h1>Loading...</h1>:<div>
          <ul>
            {posts.map(post =><PostItem key={post.id} post={post.data} id={post.id}/> )}
          </ul>
          </div>}
      </div>
    </div>
  )
}

export default Profile