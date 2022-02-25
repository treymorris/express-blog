import { NavLink } from 'react-router-dom';



function Navbar(props) {

    const logout = (e) => {
        localStorage.removeItem('user');
        props.setUser(undefined);
    };


  return (
      <nav>
          <div>
              <NavLink to='/' >Bloggy</NavLink>
              <NavLink to='/login' hidden={props.user ? true : false} >Login</NavLink>
              <NavLink to='/create' >Create Blog</NavLink>
              <NavLink to='/' hidden={props.user ? true : false} onClick={logout} >Logout</NavLink>
          </div>
     </nav>
  );
}

export default Navbar;