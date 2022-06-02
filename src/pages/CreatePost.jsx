import React, { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from "react-router-dom"

const CreatePost = () => {

    const [formData, setFormData]=useState({
        content:"",
        firstName:"",
        lastName:"",
        username:"",
        userRef: "",
        images:{},
    })

    const { content, firstName, lastName, username, images }= formData
    const [loading, setLoading] = useState(false)

    const auth=getAuth()
    const navigate=useNavigate()
    const isMounted=useRef(true)

    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth ,(user)=>{
                if(user){
                    setFormData({...formData, userRef:user.uid})
                }else{
                    navigate("/sign-in")
                }
            })
        }
        return ()=>{
            isMounted.current=false
        }
    }, [isMounted])

    const onSubmit=async(e)=>{
        e.preventDefault()

        //Store image in firebase
        const storeImage=async(image)=>{
            return new Promise((resolve, reject)=>{
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef=ref(storage, "images/" + fileName)

                const uploadTask=uploadBytesResumable(storageRef,image)

                uploadTask.on('state_changed', 
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        reject(error)
                    }, 
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                        });
                    }
                    );
            })
        }

        const imgUrls=await Promise.all(
            [...images].map((image)=>storeImage(image))
        )

        const formDataCopy={
            ...formData,
            imgUrls,
            timeStamp:serverTimestamp()
        }
        console.log(formDataCopy)

        delete formDataCopy.images
        //setLoading(true)
        const docRef = await addDoc(collection(db, 'posts'), formDataCopy)
        //setLoading(false)
        toast.success('Listing saved')
        navigate("/")
        //navigate(`/${formDataCopy}/${docRef.id}`)
        //console.log(formData)
        //console.log(imgUrls)
    }

    const onMutate=(e)=>{
        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                images:e.target.files
            }))
        }
        
        if(!e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                [e.target.id]:e.target.value
            }))
        }
    }
  return (
    <div>
        <header>
            create Post
        </header>
        <main>
            <form onSubmit={onSubmit}>
                <input type="text" id="content" value={content} onChange={onMutate} />
                <input type="file" id="images" onChange={onMutate} accept=".jpg,.png,.jpeg" />
                <button type="submit">Post</button>
            </form>
        </main>
    </div>
  )
}

export default CreatePost