import './App.css';
import { Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';
import Save from './pages/Save';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-avatar" element={<SetAvatar />} />
        <Route path="/save" element={<Save />} />
      </Routes>
    </div>
  );
}

export default App;
