import logo from './logo.svg';

import './reset.css';
import './App.css';
import './common.css';
// import './main.css';
// import './sub.css';

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './contents/Home';
import PlaceCard from './components/place/PlaceCard';
import ReviewListPage from './contents/review/ReviewListPage'
import TravelLogPage from './contents/travelLog/TravelLogPage'
import Auth from './contents/user/SignUp';
import Login from './contents/user/Login';
// import Logout from './contents/user/Logout';
import MyPage from './contents/user/MyPage';
import Footer from './components/common/Footer';

import ScrollHandler from './components/common/ScrollHandler';

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
    {/* header */}
    <ScrollHandler />
    <Header />
    {/* end header */}

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:category" element={<PlaceCard />}></Route>
      <Route path="/review" element={<ReviewListPage />}></Route>
      <Route path="/travelLog" element={<TravelLogPage />}></Route>
      <Route path="/Auth" element={<Auth />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      {/* <Route path="/Logout" element={<Logout />}></Route> */}
      <Route path="/MyPage" element={<MyPage />}></Route>
    </Routes>

    {/* footer */}
    <Footer />
    {/* end footer */}
  </div>
  );
}

export default App;
