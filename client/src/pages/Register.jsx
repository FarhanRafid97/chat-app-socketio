import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.svg';
import { FormContainer } from '../styleComp/FormContainer';
import { toastOption, validation } from '../utils/Validation';
import axios from 'axios';
import { registerRoute } from '../utils/apiRoutes';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation(values)) {
      try {
        const { data } = await axios.post(registerRoute, {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        console.log(data);
        if (data) {
          localStorage.setItem('user-data', JSON.stringify(data.user));
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg, toastOption);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default Register;
