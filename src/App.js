import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Mechanics from './pages/Mechanics';
import MechanicDesc from './Components/MechanicDesc';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Mechanic from './pages/Mechanic';
import UsersRequests from './Components/UsersRequests';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/index' exact element={<Home />} />
        <Route path='/mechanics' exact element={<Mechanics />} />
        <Route path='/mechanic/:id' exact element={<MechanicDesc />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/mechanicpage/:id' exact element={<Mechanic />} />
        <Route path='/requests' exact element={<UsersRequests />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;