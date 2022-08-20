import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Buffer } from 'buffer';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { setAvatarRoute } from '../utils/apiRoutes';
import { Container } from '../styleComp/Container';
import Cookies from 'js-cookie';
import { apiAuth } from '../api/api';

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(null);
  const toastOptions = {
    position: 'top-center',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const token = Cookies.get('Token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const getCurrentUser = async () => {
      const { data } = await apiAuth.get('/myAccount');
      if (!data) {
        navigate('/login');
        return;
      }
      setCurrentUser(data.user);
    };
    getCurrentUser();
  }, [navigate, token]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      await axios.post(`${setAvatarRoute}/${currentUser._id}`, {
        image: avatars[selectedAvatar],
      });
      toast.success('avatar Updated', toastOptions);
      navigate('/');
    }
  };

  useEffect(() => {
    const data = [];
    const getImage = async () => {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    getImage();
  }, [api]);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
