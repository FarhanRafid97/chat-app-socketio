import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/apiRoutes';
import { FormContainer } from '../styleComp/FormContainer';
import { toastOption } from '../utils/Validation';
import bgLogin from '../assets/bg-login.png';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const toastOptions = {
    position: 'top-center',
    autoClose: 8000,
    draggable: true,
    theme: 'dark',
  };

  const token = Cookies.get('Token');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === '') {
      toast.error('Email and Password is required.', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Email and Password is required.', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          Cookies.set('Token', data.accessToken);
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
      {' '}
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={bgLogin} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default Login;
