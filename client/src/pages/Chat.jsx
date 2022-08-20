import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { apiAuth } from '../api/api';
import ChatContainer from '../components/ChatContainer';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import { host } from '../utils/apiRoutes';

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const token = Cookies.get('Token');

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

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

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getCurretnUser = async () => {
      if (currentUser) {
        if (currentUser.avatarImage) {
          const { data } = await apiAuth.get(`/allusers/${currentUser._id}`);
          console.log('fetch contact', data);
          setContacts(data);
        } else {
          navigate('/set-avatar');
        }
      }
    };
    getCurretnUser();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />

          {currentChat === undefined ? (
            <Welcome userNameProps={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #000000;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgb(255, 255, 255, 0.08);
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
