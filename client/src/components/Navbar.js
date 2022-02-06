import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'   // useLoaction Hook reacr rputer dom mein rehta hai

const Navbar = () => {
 
  let history = useHistory();
  const handleLogout = ()=>{
        localStorage.removeItem('token');
        history.push('/login');
  }

  let location = useLocation();    // useLocation hook(jo ki react router dom ke andar hota hai) ki madad se hum jis bhi route par honge uska pathname wagerh grab kar paayenge....aur fir use click karne par manipulate kar sakte hai jaise class active add hogi jab about par click karoge aur add hogi home par jab home ya route / par click karoge
  // useEffect is Just used to show the useLocation ka effect in console
  // useEffect(() => {
  //   console.log(location);   //object like this {pathname: '/about', search: '', hash: '', state: undefined, key: 'na672t'} is seen in console
  //   console.log(location.pathname);    // /about Or /
  // }, [location]);   // location par depend hai useEffect, which means jab bhi location change hogi to useEffect hook chalega

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {!localStorage.getItem('token')? <Link className="navbar-brand" to='#'>iNotebook</Link>:<Link className="navbar-brand" to='/'>iNotebook</Link>}    {/* !localStorage.getItem('token') --> Agar login token null hai means localstorage mein koi token nahi hai to iNotebook nowhere point karega warna / ko pint karega that is localhost home */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/"? "about": ""} ${!localStorage.getItem('token')? "d-none":""}`} aria-current="page" to="/">Home</Link>   {/*${!localStorage.getItem('token')? "d-none":""} --> Agar login token null hai means localstorage mein koi token nahi hai to home ka display hidden kardo warna kuch mat karo */}
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about"? "about": ""} ${!localStorage.getItem('token')? "d-none":""}`} to="/about">About</Link>
              </li>
            </ul>
            {(!localStorage.getItem('token'))?<form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form>: <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          </div>
        </div>
      </nav>
    </>
  )
}


export default Navbar
