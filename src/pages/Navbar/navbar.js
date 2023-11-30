import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import "./navbar.css";
import { useDispatch } from "react-redux";

function Navbar({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {

        dispatch({ type: "LOGOUT" });
        navigate("/");
        setUser(null)
    }
    return (
        <div className='navbar'>
            <div className='nav-container'>
                {user ? (
                    <div className="title">Welcome {user.result.firstName} {user.result.lastName}</div>
                ) : <div className=''>Welcome User</div>}

                <div className='nav-content' >
                    {children}
                    <button to="/login" className="logout" onClick={logout}>Logout</button>
                </div>


            </div>
        </div>
    )
}

export default Navbar