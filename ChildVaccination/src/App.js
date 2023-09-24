import './App.css';
import MessageForm from './components/MessageForm';
import VerificationForm from './components/email';
import MessageState from './context/MessageState';
import Automate from './components/Automate';
import Hospital from './components/hospital';
import Login from './components/login';
import Signup from './components/SignUp';
import Navbar from './components/navbar';
import { Alert } from './components/Alert';
import Home from './components/Home';
import About from './components/About';
import WelcomePage from './components/WelcomePage';

import {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <div className="App">
      <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
            <Route exact path="/wel" element={<WelcomePage/>}/>
            <Route exact path="/About" element={<About />}/>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
            <Route exact path="/" element={<Signup showAlert={showAlert}/>}/>
            <Route exact path="/childdata" element={<Hospital/>}/>
            <Route exact path="/message" element={<Automate/>}/>

            </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
