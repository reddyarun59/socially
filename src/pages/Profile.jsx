import React, { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc } from 'firebase/firestore'
import { db } from "../firebase.config"
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const auth = getAuth()
  const [changeDetails, setChangeDetails]= useState(false)
  const [formData, setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })

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
    </div>
  )
}

export default Profile