import { NavLink } from 'react-router-dom';



function Navbar(props) {

    const logout = (e) => {
        localStorage.removeItem('user');
        props.setUser(undefined);
    };


  return (
      <nav className='navbar justify-content-center mt-3 mb-5'>
          <div className='container-fluid'>
              <NavLink className='p-3' to='/' >Bloggy</NavLink>
                <div className='nav justify-content-end'>
                    <NavLink className='p-3' to='/login' hidden={props.user ? true : false} >Login</NavLink>
                    <NavLink className='p-3' to='/create' >Create Blog</NavLink>
                    <NavLink className='p-3' to='/' hidden={props.user ? true : false} onClick={logout} >Logout</NavLink>
                </div>
          </div>
      </nav>
  );
}

export default Navbar;