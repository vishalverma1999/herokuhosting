import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const Signup = (props) => {
    
    const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword: ""});
    let history = useHistory();   // Redirect karne ke liye hum useHistory hook ka use karenge jo ki react-router-dom ka hi part hai

    const handleSubmit = async (e) => {
        e.preventDefault();   
        const response = await fetch(`https://inotebookmern.herokuapp.com/api/auth/createuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({    // body mein automatically to aayega nahi email ya password, to iske liye u can use ref waala concept ya fir onchange waala concept
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth-token and redirect
            localStorage.setItem('token', json.authToken);   // saving the authtoken in localstorage
            // Redirect karne ke liye hum useHistory hook ka use karenge jo ki react-router-dom ka hi part hai
            history.push('/');
            props.showAlert("Account Created Successfully", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container mt-3">
            <h2 className="mb-3">Create an Account to Use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} name="name" id="name" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required/>   {/* form mein onSubmit use karne ka sabse bada fayda hai ki aap direct browser in-built validation laga sakte ho, jaise yaha par minLength aur required lagaya hai*/} 
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
