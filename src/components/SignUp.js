import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save the token and redirect 
      localStorage.setItem('token', json.authtoken);
      navigate('/');
    } else {
      alert("Invalid");
    }

  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' onChange={onChange} id="name" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' onChange={onChange} id="email" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' onChange={onChange} id="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='confirmpassword' onChange={onChange} id="confirmpassword" minLength={5} required/>
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
