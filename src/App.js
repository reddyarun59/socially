import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Post from "./pages/Post";
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
          <Route path="/profile" element={<SignIn />}/>
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp/>}/>
        </Routes>
        <Navbar/>
      </Router>
    </>
  );
}

export default App;
