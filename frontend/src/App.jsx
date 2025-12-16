import logo from './logo.svg';

import './reset.css';
import './App.css';
// import './common.css';
// import './main.css';
// import './sub.css';

import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Auth from './contents/user/SignUp';
import Login from './contents/user/Login';

function App() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  useEffect(()=>{
      fetch("http://localhost:5000/")
          .then(res => res.json())
          .then(data => {
              console.log(data);
              setMessage(data.message)
          })
          .catch(err => console.error(err));
  },[]);

  return (
  <div className="App">
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="Home">여행로그</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>여행지</Nav.Link>
          <Nav.Link href="#features">액티비티</Nav.Link>
          <Nav.Link href="#pricing">축제</Nav.Link>
          <Nav.Link href="#pricing">리뷰</Nav.Link>
          <Nav.Link href="#pricing">나의 여행로그</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/Login')}}>로그인</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/Auth')}}>회원가입</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/Auth" element={<Auth />}></Route>
      <Route path="/Login" element={<Login />}></Route>
    </Routes>
  </div>
  );
}

export default App;
