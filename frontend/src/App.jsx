import './reset.css'
import './App.css'
import './common.css'

import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './contents/Home'
import PlaceDetailPage from './contents/place/PlaceDetailPage'
import PlaceListPage from './contents/place/PlaceListPage'
import ReviewListPage from './contents/review/ReviewListPage'
import ReviewWritePage from './contents/review/ReviewWritePage'
import ReviewDetailPage from './contents/review/ReviewDetailPage'
import TravelLogPage from './contents/travelLog/TravelLogPage'
import TravelLogWritePage from './contents/travelLog/TravelLogWritePage'
import TravelLogDetailPage from './contents/travelLog/TravelLogDetailPage'
import SignUp from './contents/user/SignUp'
import Login from './contents/user/Login'
import MyPage from './contents/user/MyPage'
import TopButton from './components/common/TopButton'
import ChatFabButton from './components/common/ChatButton'
import Footer from './components/common/Footer'
import ScrollHandler from './components/common/ScrollHandler'
import MyPageModify from './contents/user/MyPageModify'
import NotFound from './contents/notfound'

function App() {

  const routerLocation = useLocation();
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };


  return (
    <div className="App">
      <ScrollToTop/>
      <ScrollHandler />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:type" element={<PlaceListPage key={routerLocation.pathname} />} />
        <Route path="/places/detail/:id" element={<PlaceDetailPage />} />

        <Route path="/review" element={<ReviewListPage />} />
        <Route path="/review/write" element={<ReviewWritePage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />

        <Route path="/travelLog" element={<TravelLogPage />} />
        <Route path="/travelLog/write" element={<TravelLogWritePage />} />
        <Route path="/travelLog/:id" element={<TravelLogDetailPage />} />

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/MyPageModify" element={<MyPageModify />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <TopButton />
      <ChatFabButton/>
      <Footer />
    </div>
  )
}

export default App
