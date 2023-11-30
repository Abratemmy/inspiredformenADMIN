import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import "./register.css";
import { useDispatch } from 'react-redux';
import { signup } from "../../actions/auth"
import { AiOutlineEyeInvisible } from 'react-icons/ai'


function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [togglePassword, setTogglePassword] = useState(false)
  const handlePasswordClick = () => {
    setTogglePassword(!togglePassword)
  }
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: '',
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
    dispatch(signup(values, setLoading, navigate))

  }
  return (
    <div className='form-section authentication'>
      <form onSubmit={handleSubmit} className="add-form">
        <div className='inputfield-div'>
          <label htmlFor="name">First Name</label>
          <input type="text" name="firstName" placeholder="First Name ...." value={values.firstName} required className='inputfield' onChange={handleChange} />
        </div>
        <div className='inputfield-div'>
          <label htmlFor="name">Last  Name</label>
          <input type="text" name="lastName" placeholder="Last Name ...." value={values.lastName} required className='inputfield' onChange={handleChange} />
        </div>
        <div className='inputfield-div'>
          <label htmlFor="name">Email</label>
          <input type="email" name="email" placeholder="Email ...." value={values.email} required className='inputfield' onChange={handleChange} />
        </div>
        <div className='inputfield-div'>
          <label htmlFor="name">Password</label>
          <input type={togglePassword ? "text" : "password"} name="password" placeholder="Password ...." value={values.password} required className='inputfield' onChange={handleChange} />
          <span className='eye'>
            <AiOutlineEyeInvisible className='icon' style={{ color: `${togglePassword ? '#f85a5a' : 'gray'}` }} onClick={handlePasswordClick} />
          </span>
        </div>
        <div className='inputfield-div'>
          <label htmlFor="name">Confirm Password</label>
          <input type={togglePassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password ...." value={values.confirmPassword} required className='inputfield' onChange={handleChange} />
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
  )
}

export default Register