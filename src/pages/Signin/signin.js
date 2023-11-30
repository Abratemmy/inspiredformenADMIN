import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import "./signin.css";
import { useDispatch } from 'react-redux';
import { signin } from "../../actions/auth"
import { AiOutlineEyeInvisible } from 'react-icons/ai'

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [togglePassword, setTogglePassword] = useState(false)
  const handlePasswordClick = () => {
    setTogglePassword(!togglePassword)
  }

  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const handleChange = (ev) => {
    setValues({
      ...values,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(signin(values, setLoading, navigate))
  }

  return (
    <>
      <div className='form-section authentication'>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <div className='inputfield-div'>
            <label htmlFor="name">Email</label>
            <input type="email" name="email" placeholder="Email ...." required className='inputfield' onChange={handleChange} />
          </div>
          <div className='inputfield-div'>
            <label htmlFor="name">Password</label>
            <input type={togglePassword ? "text" : "password"} name="password" placeholder="Password ...." required className='inputfield' onChange={handleChange} />
            <span className='eye'>
              <AiOutlineEyeInvisible className='icon' style={{ color: `${togglePassword ? '#f85a5a' : 'gray'}` }} onClick={handlePasswordClick} />
            </span>
          </div>

          {loading ?
            <button type="submit" className='form-btn submitting' style={{ pointerEvents: 'none' }}>
              <div class="spinner-grow spinner-grow-sm" role="status"></div>
              <span>Submitting ...</span>
            </button>
            :
            <button type="submit" className='form-btn'>Submit</button>
          }

        </form>
      </div>

    </>
  )
}

export default Signin