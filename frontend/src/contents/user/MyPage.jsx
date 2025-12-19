import React from 'react'
import { Virtual, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './MyPage.css'

const MyPage = () => {
  const slides = Array.from({ length: 8 })
  const recommendations = [
    { id: 1, title: 'Jeju', subTitle: '스누피가든', address: '제주특별자치도 제주시 구좌읍 금백조로 930', holiday: '연중무휴', facilities: '가든 하우스 / 야외가든' },
    { id: 2, title: 'Udo', subTitle: '검멀레해변', address: '제주특별자치도 제주시 우도면 연평리', holiday: '기상 상황에 따라 다름', facilities: '보트 체험 / 산책로' },
    { id: 3, title: 'Seogwipo', subTitle: '천지연폭포', address: '제주특별자치도 서귀포시 남성중로 2-15', holiday: '연중무휴', facilities: '야간 경관 조명 / 산책로' }
  ]

  return (
    <div className="mypage">
      <section className="mypage-profile">
        <div className="mypage-profile-container">
          <div className="mypage-profile-img" />
          <span className="mypage-edit-profile-text">회원정보 수정</span>
        </div>
        <div className="mypage-profile-info">
          <span className="mypage-profile-badge">닉네임</span>
          <span className="mypage-profile-name">1234jeju</span>
        </div>
      </section>

      {/* 나의 찜리스트 */}
      <section className="mypage-section">
        <h3 className="mypage-section-title">나의 찜리스트</h3>
        <div className="mypage-swiper-wrapper">
          <Swiper 
            modules={[Virtual, Navigation, Pagination]} 
            navigation={{
              nextEl: '.wish-next',
              prevEl: '.wish-prev',
            }}
            slidesPerView={4} 
            spaceBetween={20} 
            breakpoints={{ 0:{slidesPerView:1},768:{slidesPerView:3},1024:{slidesPerView:4} }} 
            className="mypage-swiper"
          >
            {slides.map((_, i) => (
              <SwiperSlide key={i} className="mypage-swiper-slide">
                <div className="mypage-card">
                  <div className="mypage-card-bottom-info">
                    <img src="/images/login/찜버튼.png" className="mypage-wish-icon" alt="" />
                    <span className="mypage-card-text">스누피가든</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mypage-swiper-button wish-prev swiper-button-prev"></div>
          <div className="mypage-swiper-button wish-next swiper-button-next"></div>
        </div>
      </section>

      {/* 내가 작성한 리뷰 글 */}
      <section className="mypage-section">
        <h3 className="mypage-section-title">내가 작성한 리뷰 글</h3>
        <div className="mypage-swiper-wrapper">
          <Swiper 
            modules={[Virtual, Navigation, Pagination]} 
            navigation={{
              nextEl: '.review-next',
              prevEl: '.review-prev',
            }}
            slidesPerView={4} 
            spaceBetween={20} 
            breakpoints={{ 0:{slidesPerView:1},768:{slidesPerView:3},1024:{slidesPerView:4} }} 
            className="mypage-swiper"
          >
            {slides.map((_, i) => (
              <SwiperSlide key={i} className="mypage-swiper-slide">
                <div className="mypage-card2">
                  <div className="mypage-card2-thumb">
                    <img src="/images/login/찜버튼.png" className="mypage-card2-wish-icon" alt="" />
                  </div>
                  <div className="mypage-card2-text-wrap">
                    <p className="mypage-card2-title">
                      <span className="mypage-card2-title-en">Jeju</span>
                      <span className="mypage-card2-sub">스누피가든</span>
                    </p>
                    <p className="mypage-card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다...</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mypage-swiper-button review-prev swiper-button-prev"></div>
          <div className="mypage-swiper-button review-next swiper-button-next"></div>
        </div>
      </section>

      <section className="mypage-section">
        <h3 className="mypage-section-title">추천 여행지</h3>
        <div className="mypage-list">
          {recommendations.map(item => (
            <div className="mypage-list-item" key={item.id}>
              <div className="mypage-list-thumb" />
              <div className="mypage-list-info">
                <div className="mypage-info-header">
                  <span className="mypage-info-title-en">{item.title}</span>
                  <span className="mypage-info-title-ko">{item.subTitle}</span>
                </div>
                <ul className="mypage-info-details">
                  <li>주소 : {item.address}</li>
                  <li>휴일 : {item.holiday}</li>
                  <li>이용가능시설 : {item.facilities}</li>
                </ul>
              </div>
              <div className="mypage-list-side">
                <img src="/images/login/찜버튼.png" className="mypage-wish-icon" alt="" />
                <button className="mypage-list-btn">상세 정보 보러가기</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MyPage