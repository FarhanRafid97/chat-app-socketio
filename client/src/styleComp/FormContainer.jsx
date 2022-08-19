import styled from 'styled-components';

export const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: black;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;

    background-color: rgb(255, 255, 255, 0.15);
    border-radius: 1rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: white;
    padding: 0.7rem;
    border: 0.1rem solid white;
    border-radius: 5px;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid black;
      outline: none;
    }
  }
  button {
    background-color: #8d99ae;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #40916c;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
