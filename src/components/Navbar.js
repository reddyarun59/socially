import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineAddBox } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';



const Navbar = () => {
    const navigate =useNavigate()
    const location = useLocation()
  return (
    <div>
        <nav>
            <ul className="flex justify-around">
                <li onClick={()=>navigate("/")}>
                    <AiOutlineHome className="w-8 h-8" />
                    <p>Feed</p>
                </li>
                <li onClick={()=>navigate("/search")}>
                    <AiOutlineSearch className="w-8 h-8"/>
                    <p>Search</p>
                </li>
                <li onClick={()=>navigate("/create-post")}>
                    <MdOutlineAddBox className="w-8 h-8"/>
                    <p>Add Post</p>
                </li>
                <li onClick={()=>navigate("/bookmarks")}>
                    <BsBookmark className="w-8 h-8"/>
                    <p>Bookmark</p>
                </li>
                <li onClick={()=>navigate("/profile")}>
                    <BiUser className="w-8 h-8"/>
                    <p>Profile</p>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar