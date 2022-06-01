import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./pages/Home"
import Post from "./pages/Post";
import PrivateRoute from "./components/PrivateRoute"
import Profile from "./pages/Profile"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path="/search" element={<Search/>} />
          <Route path="/bookmarks" element={<Bookmarks/>}/>
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />}/>
          </Route>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp/>}/>
        </Routes>
        <Navbar/>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
