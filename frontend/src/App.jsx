import logo from './logo.svg';

import './reset.css';
import './App.css';
import './common.css';
// import './sub.css';

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './contents/Home';
import PlaceCard from './components/place/PlaceCard';
import ReviewListPage from './contents/review/ReviewListPage'
import TravelLogPage from './contents/travelLog/TravelLogPage'
import SignUp from './contents/user/SignUp';
import Login from './contents/user/Login';
// import Logout from './contents/user/Logout';
import MyPage from './contents/user/MyPage';
import PlaceList from './contents/place/PlaceListPage';
import TopButton from './components/common/TopButton';
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
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      {/* <Route path="/Logout" element={<Logout />}></Route> */}
      <Route path="/MyPage" element={<MyPage />}></Route>
      <Route path="/PlaceList" element={<PlaceList/>}></Route>

    </Routes>

    <TopButton />

    {/* footer */}
    <Footer />
    {/* end footer */}
    
  </div>
  );
}

export default App;
