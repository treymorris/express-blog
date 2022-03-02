// import { useEffect, useState } from 'react';


function Login() {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    return (
        <div>
            <h1 className="text-light text-center">Login</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label text-light">Username</label>
                        <input type="username" className="form-control" id="username"  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-light">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    
  );
}

export default Login;