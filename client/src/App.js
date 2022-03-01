import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div>
      <Router>
        <header>
              <Navbar />
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<BlogForm />} />
        </Routes>
      </Router>
      <footer className='fixed-bottom'>
      <Footer />
      </footer>
      
    </div>
    );
}

export default App;
