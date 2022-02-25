import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(undefined);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('api/blogs').then((res) => {
      setBlogs(res.data);
    });
  }, []);


  return (
    <div>
      <Router>
        <header>
              <Navbar user={user} setUser={setUser} />
        </header>
        <Switch>
          <Route
            path='/'
            render={() => (
              <Home blogs={blogs} user={user} title={'Home'} />
            )}
          />
          <Route
            path='/login'
            render={() => (
              <Login setUser={user} title={'Login'} />
            )}
          />
          <Route
            path='/create'
            render={() => (
              <BlogForm blogs={blogs} user={user} title={'BlogForm'} setBlogs={setBlogs} />
            )}
          />
          {blogs.map((blog) => (
              <Route
                key={blog._id}
                exact
                path={`/blogs/${blog._id}`}
                render={() => (
                  <Blog
                    {...blog}
                    user={user}
                    blogs={blogs}
                    setBlogs={setBlogs}
                  />
                )}
              ></Route>
            ))}
        </Switch>
      </Router>
      <Footer />
    </div>
    );
}

export default App;
