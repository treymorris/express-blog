import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";
import BlogEdit from "./components/BlogEdit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(undefined);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const data = await fetch(`api/blogs`);
    const blogs = await data.json();
    setBlogs(blogs);
  };

  return (
    <div>
      <Router>
        <header className="sticky-top">
          <Navbar user={user} />
        </header>
        <Routes>
          <Route path="/" element={<Home blogs={blogs} user={user} />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/edit" element={<BlogEdit />} />
        </Routes>
      </Router>
      <footer className="sticky-bottom">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
