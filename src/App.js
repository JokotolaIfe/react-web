import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
    </>
  );
}

export default App;