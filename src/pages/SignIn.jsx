import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { MdVisibilityOff, MdVisibility } from 'react-icons/md'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:"",
    password: "",
  })
  const {email,password} = formData

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
      const userCredential= await signInWithEmailAndPassword(auth, email, password)

      if(userCredential.user){
        navigate("/")
      } 
    } catch (error) {
      toast.error("Bad User Credentials")
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
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>

          <div className="passwordInputDiv">
            <input type={showPassword? "text": "password"} className="passwordInput" placeholder="Password" id="password" value={password} onChange={onChange}/>
            <img src={MdVisibilityOff} onClick={()=>{setShowPassword(prevState=>!prevState)}}/>
          </div>
          <button>Sign In</button>
        </form>
        <Link to="/sign-up"> Sign up Instead </Link>
      </div>
    </>
  )
}

export default SignIn