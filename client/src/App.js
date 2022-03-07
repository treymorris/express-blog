import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  }, []);

  const [blogs, setBlogs] = useState({
    title: '',
    blog: '',
    date: Date,
    comments: '',
    published: true,
  });
  
  // useEffect(() => {
  //   fetch('/api/blogs')
  //     .then(response => response.json())
  //     .then(data => setBlogs(data))
      
    
  // }, []);
  
  
  
  return (
    <div>
      <Router>
        <header>
              <Navbar />
        </header>
        <Routes>
          <Route path='/' element={<Home blogs={blogs} user={user}/>} />
          <Route path='/signup' element={<SignupForm user={user} setUser={setUser}/>} />
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/create' element={<BlogForm user={user} blogs={blogs} setBlogs={setBlogs}/>} />
        </Routes>
      </Router>
      <footer className='fixed-bottom'>
        <Footer />
      </footer>
      
    </div>
    );
}

export default App;
