import React, { useEffect, useMemo, useState } from 'react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import WishToggleButton from '../../components/common/WishToggleButton';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './user.css';
import { mypage } from '../../API/user';
import { checkWishlist, toggleWishlist } from '../../API/wishilist';

const MyPage = () => {
  const slides = Array.from({ length: 8 })
  const [user, setUser] = useState(null)
  const [recommend, setRecommend] = useState([])
  const [myreview, setMyreview] = useState([])
  const [wish, setWish] = useState([])
  const [wishbtn, setWishbtn] = useState(false)
  const [wishcheck, setWishcheck] = useState({})

  const navigate = useNavigate();
  const location = useLocation();
  const IMAGE_BASE_URL = "http://localhost:5000/"


  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login", {
        state: {
          message: "로그인이 필요한 서비스입니다.",
          from: location.pathname,
        },
        replace: true,
      });
    }
  }, []);

  useEffect(() => {
    mypage()
      .then(res => {
        console.log("응답데이터", res.data);
        setUser(res.data.user)
        setRecommend(res.data.recommend)
        setMyreview(res.data.review)
        setWish(res.data.wishlist)
      })
      .catch(err => console.error(err))
  }, [])

  const placeIdsToCheck = useMemo(() => {
    const ids = new Set();
    recommend.forEach((item) => item?.id && ids.add(item.id));
    wish.forEach((w) => w?.id && ids.add(w.id));
    return Array.from(ids);
  }, [recommend, wish]);

  useEffect(() => {
    if (!placeIdsToCheck.length) {
      setWishcheck({});
      return;
    }

    Promise.all(
      placeIdsToCheck.map((placeId) =>
        checkWishlist(placeId)
          .then((res) => ({ id: placeId, wished: !!res.data.wished }))
          .catch(() => ({ id: placeId, wished: false }))
      )
    ).then((results) => {
      const next = {};
      results.forEach((r) => {
        next[r.id] = r.wished;
      });
      setWishcheck((prev) => ({ ...prev, ...next }));
    });
  }, [placeIdsToCheck]);

  const refreshWishlist = () => {
    return mypage().then(res => {
      setWish(res.data.wishlist || []);
    });
  };

  const handleWishToggle = (placeId) => {
    toggleWishlist(placeId)
      .then(async (res) => {
        const wished = !!res.data.wished;

        setWishcheck((prev) => ({ ...prev, [placeId]: wished }));

        await refreshWishlist();
      })
      .catch(console.error);
  };

  return (
    <div className="mypage-wrap">
      <div className="mypage-inner">
        <section className="profile-wrap">
          <div className="profile-inner">
            <img className="img-wrap" src={`http://localhost:5000/static/${user?.user_img}`} />
            <Link to="/MyPageModify" className="edit-profile">회원정보 수정</Link>
          </div>
          <div className="text-wrap">
            <span className="badge">닉네임</span>
            <span className="username">{user?.username}</span>
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
                0: {
                  slidesPerView: 2,
                  spaceBetween: 12
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 14

                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16
                }
              }}
              className="mypage-swiper"
            >
              {wish.map((w) => (
                <SwiperSlide key={w.id} className="mypage-swiper-slide">
                  <Link to={`/places/detail/${w.id}`} className="mypage-card">
                    <div className="img-wrap">
                      {/* 이미지 영역 */}
                      <img src={IMAGE_BASE_URL + w.image[0]} alt="" />
                    </div>
                    <div className="mypage-card-bottom-info">
                      <WishToggleButton
                        className="mypage-wish-icon"
                        active={!!wishcheck[w.id]}
                        onToggle={() => handleWishToggle(w.id)}
                      />
                      <span className="mypage-card-text">{w.name}</span>
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
                0: {
                  slidesPerView: 2,
                  spaceBetween: 12
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 14

                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16
                }
              }}
              className="mypage-swiper"
            >
              {myreview.map((r) => (
                <SwiperSlide key={r.id} className="mypage-swiper-slide">
                  <Link to={`/review/${r.id}`} className="mypage-card2">
                    <div className="mypage-card2-thumb">
                      <div className="img-wrap">
                        {/* 이미지 영역 */}
                        <img src={IMAGE_BASE_URL + r.image[0]} alt="" />
                      </div>
                    </div>
                    <div className="mypage-card2-text-wrap">
                      <p className="mypage-card2-title">
                        {r.title}
                      </p>
                      <p className="mypage-card2-desc">{r.content}</p>
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
          {recommend.map((item) => (
            <div className="item" key={item.id}>
              <div className="img-wrap">
                <img
                  src={IMAGE_BASE_URL + item.image[0]}
                  alt=""
                />
              </div>

              <div className="item-content">
                <h2 className="item-title">{item.name}</h2>
                <div className="item-details">
                  <p>
                    <span className="tit">주소 :</span>
                    &nbsp;
                    <span className="txt">{item.address}</span>
                  </p>
                  <p>
                    <span className="tit">휴일 :</span>
                    &nbsp;
                    <span className="txt">{item.closed_days}</span>
                  </p>
                  <p>
                    <span className="tit">이용가능시설 :</span>
                    &nbsp;
                    <span className="txt">{item.amenities}</span>
                  </p>
                </div>
              </div>

              <div className="item-actions">
                <span className="item-tag"></span>
                <WishToggleButton
                  className="heart-btn"
                  active={!!wishcheck[item.id]}
                  onToggle={() => handleWishToggle(item.id)}
                />
                <button className="detail-btn" onClick={() => navigate(`/places/detail/${item.id}`)}>
                  상세 정보 보러가기
                </button>
              </div>
            </div>
          )
          )}

          <div className="pagination">
            <button>&lt;&lt;</button>
            <button>&lt;</button>
            <button className="current">1</button>
            <button>&gt;</button>
            <button>&gt;&gt;</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MyPage