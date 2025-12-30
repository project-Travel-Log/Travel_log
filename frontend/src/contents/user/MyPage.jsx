import React from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import WishToggleButton from '../../components/common/WishToggleButton';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './MyPage.css';

const MyPage = () => {
  const slides = Array.from({ length: 8 })
  const recommendations = [
    { id: 1, title: 'Jeju', subTitle: '스누피가든', address: '제주특별자치도 제주시 구좌읍 금백조로 930', holiday: '연중무휴', facilities: '가든 하우스 / 야외가든' },
    { id: 2, title: 'Udo', subTitle: '검멀레해변', address: '제주특별자치도 제주시 우도면 연평리', holiday: '기상 상황에 따라 다름', facilities: '보트 체험 / 산책로' },
    { id: 3, title: 'Seogwipo', subTitle: '천지연폭포', address: '제주특별자치도 서귀포시 남성중로 2-15', holiday: '연중무휴', facilities: '야간 경관 조명 / 산책로' }
  ]

  return (
    <div className="mypage-wrap">
      <div className="mypage-inner">
        <section className="profile-wrap">
          <div className="profile-inner">
            <div className="img-wrap" />
            <Link to="/MyPage" className="edit-profile">회원정보 수정</Link>
          </div>
          <div className="text-wrap">
            <span className="badge">닉네임</span>
            <span className="username">1234jeju</span>
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
              breakpoints={{
                0:{
                  slidesPerView : 2,
                  spaceBetween : 12
                },
                768:{
                  slidesPerView : 3,
                  spaceBetween : 14
                  
                },
                1024:{
                  slidesPerView : 4,
                  spaceBetween : 16
                }
              }} 
              className="mypage-swiper"
            >
              {slides.map((_, i) => (
                <SwiperSlide key={i} className="mypage-swiper-slide">
                  <Link to='/' className="mypage-card">
                    <div className="img-wrap">
                      {/* 이미지 영역 */}
                      <img src="/images/temp/temp.png" alt="" />
                    </div>
                    <div className="mypage-card-bottom-info">
                      <WishToggleButton className="mypage-wish-icon" />
                      <span className="mypage-card-text">스누피가든</span>
                    </div>
                  </Link>
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
              breakpoints={{
                0:{
                  slidesPerView : 2,
                  spaceBetween : 12
                },
                768:{
                  slidesPerView : 3,
                  spaceBetween : 14
                  
                },
                1024:{
                  slidesPerView : 4,
                  spaceBetween : 16
                }
              }} 
              className="mypage-swiper"
            >
              {slides.map((_, i) => (
                <SwiperSlide key={i} className="mypage-swiper-slide">
                  <Link to="/" className="mypage-card2">
                    <div className="mypage-card2-thumb">
                      <div className="img-wrap">
                        {/* 이미지 영역 */}
                        <img src="/images/temp/temp2.png" alt="" />
                      </div>
                      <WishToggleButton className="mypage-card2-wish-icon" />
                      <span className="mypage-card2-title-en">Gwangju</span>
                    </div>
                    <div className="mypage-card2-text-wrap">
                      <p className="mypage-card2-title">
                        제주 4.3 평화 공원
                      </p>
                      <p className="mypage-card2-desc">여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다...</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mypage-swiper-button review-prev swiper-button-prev"></div>
            <div className="mypage-swiper-button review-next swiper-button-next"></div>
          </div>
        </section>

        <section className="mypage-section recommend">
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
                  <WishToggleButton className="mypage-wish-icon" />
                  <button className="mypage-list-btn">상세 정보 보러가기</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default MyPage