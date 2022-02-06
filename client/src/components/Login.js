import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let history = useHistory();   // Redirect karne ke liye hum useHistory hook ka use karenge jo ki react-router-dom ka hi part hai

    const handleSubmit = async (e)=>{
       e.preventDefault();
       const response = await fetch(`https://inotebookmern.herokuapp.com/api/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({    // body mein automatically to aayega nahi email ya password, to iske liye u can use ref waala concept ya fir onchange waala concept
          email: credentials.email,
          password: credentials.password
        })
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        // save the auth-token and redirect
        localStorage.setItem('token', json.authToken);   // saving the authtoken in localstorage
        props.showAlert("Logged In Successfully", "success");
        // Redirect karne ke liye hum useHistory hook ka use karenge jo ki react-router-dom ka hi part hai
        history.push('/');
      }
      else{
        props.showAlert("Invalid Credentials", "danger");
      }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });  
    }

    return (
        <div className="mt-3">
            <h2 className="mb-3">Login to Continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange}/>
                </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
