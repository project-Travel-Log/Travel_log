import './reset.css'
import './App.css'
import './common.css'

import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
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
import Footer from './components/common/Footer'
import ScrollHandler from './components/common/ScrollHandler'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => {})
  }, [])

  return (
    <div className="App">
      <ScrollHandler />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places/:type" element={<PlaceDetailPage />} />
        <Route path="/PlaceList" element={<PlaceListPage />} />
        <Route path="/PlaceDetail" element={<PlaceDetailPage />} />

        <Route path="/review" element={<ReviewListPage />} />
        <Route path="/review/detail" element={<ReviewDetailPage />} />
        <Route path="/review/write" element={<ReviewWritePage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />

        <Route path="/travelLog" element={<TravelLogPage />} />
        <Route path="/travelLog/write" element={<TravelLogWritePage />} />
        <Route path="/travelLog/:id" element={<TravelLogDetailPage />} />

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>

      <TopButton />
      <Footer />
    </div>
  )
}

export default App
