import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email:"",
    password: "",
  })
  const { firstName, lastName, userName, email, password} = formData

  const navigate=useNavigate()

  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      const auth=getAuth()
      const userCredential= await createUserWithEmailAndPassword(auth, email, password)

      const user= userCredential.user

      updateProfile(auth.currentUser, {
        displayName: userName
      })

      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timeStamp=serverTimestamp()

      await setDoc(doc(db, "users", user.uid), formDataCopy)

      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>
        <div>
          <h2>Login to Socially</h2>
          <h3>blah blah</h3>
        </div>
        <form onSubmit={onSubmit}>
          <input type="text" className="firstNameInput" placeholder="First Name" id="firstName" value={firstName} onChange={onChange}/>
          <input type="text" className="lastNameInput" placeholder="Last Name" id="lastName" value={lastName} onChange={onChange} />
          <input type="text" className="userNameInput" placeholder="User Name" id="userName" value={userName} onChange={onChange} />
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>

          <div className="passwordInputDiv">
            <input type={showPassword? "text": "password"} className="passwordInput" placeholder="Password" id="password" value={password} onChange={onChange}/>
            {/* <img src={MdVisibilityOff} onClick={()=>{setShowPassword(prevState=>!prevState)}}/> */}
            <MdVisibilityOff onClick={()=>{setShowPassword(prevState=>!prevState)}}/>
          </div>
          <button>Sign Up</button>
        </form>
        <Link to="/sign-in"> Sign In Instead </Link>
      </div>
    </>
  )
}

export default SignUp