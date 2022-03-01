
// import { useEffect, useState } from 'react';
// import { withRouter } from 'react-router';
// import { Link } from 'react-router-dom';



function Login() {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');


    return (
        <div>
            <h1 className="text-light text-center">Login</h1>
                <form>
                    <div className="mb-3">
                        <label for="username" className="form-label text-light">Username</label>
                        <input type="username" className="form-control" id="username"  />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label text-light">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    
  );
}

export default Login;