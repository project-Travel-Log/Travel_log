import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { getHomePlace } from '../API/places';

import 'swiper/css';
import '../../src/main.css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

const Home = () => {
    const [swiper, setSwiper] = useState(null);
    const isDraggingRef = useRef(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [travel, setTravel] = useState([])
    const [activity, setActivity] = useState([])
    const [festival, setFestival] = useState([])
    const [review, setReview] = useState([])


    useEffect(() => {
        getHomePlace()
            .then(res => {
                setTravel(res.data.travel);
                setActivity(res.data.activity);
                setFestival(res.data.festival);
                setReview(res.data.reviews)
            })
            .catch(err => console.error(err))
    }, [])

    const stopClickIfDragging = (e) => {
        if (isDraggingRef.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };


    return (
        <div className='main-wrap'>
            <div className='main-inner'>
                <div className="section01-wrap">
                    <div className="section01-inner">
                        <p>Find Your<br />Destination</p>
                    </div>
                </div>
                {/* end section 01 */}

                <div className="section02-wrap">
                    <div className="section02-inner">
                        <div className="title-wrap">
                            <p className="title">
                                다양한 지역의 매력을 담은 여행지들을 <br />
                                한곳에 모아 특별한 여정을 시작해보세요
                            </p>
                            <p className="sub-title">
                                Explore curated travel destinations that bring together <br />
                                the unique charms of each region for an unforgettable journey
                            </p>
                        </div>

                        <div className='place-wrap'>
                            {/* <Link to='/places' className='btn-more'>
                                <img src="/images/main/btn-more.png" alt="여행지 더보기" />
                            </Link>  */}
                            <div className="place-inner">
                                {travel.map(place => (
                                    <Link
                                        key={place.id}
                                        to={`/places/detail/${place.id}`}
                                        className='place-item'>
                                        <img src={`http://localhost:5000/${place.image[0]}`} alt="" />
                                    </Link>
                                ))}
                            </div>
                            <Link to='/places/travel' className='btn-more type2'>
                                여행지 보러가기
                            </Link>
                        </div>
                    </div>
                </div>
                {/* end section 02 */}

                <div className='section03-wrap'>
                    <div className='section03-inner'>
                        <div className='title-wrap'>
                            <p className='title'>지역별로 즐길 수 있는 액티비티를 모아 <br />여행의 재미를 한층 더 높여드립니다</p>
                            <p className='sub-title'>Discover a collection of activities that make every trip <br />more exciting and immersive</p>
                        </div>
                        <div className='activity-wrap'>
                            <div className='activity-inner'>
                                {activity.map(place => (
                                    <Link key={place.id} to={`/places/detail/${place.id}`} className='activity-item'>
                                        <img src={`http://localhost:5000/${place.image[0]}`} alt="" />
                                    </Link>
                                ))}
                            </div>

                            <Link to='/places/activity' className='btn-more type2'>
                                액티비티 보러가기
                            </Link>
                        </div>
                    </div>
                </div>
                {/* end section 03 */}

                <div className='section04-wrap'>
                    <div className='section04-inner'>
                        <div className='title-wrap'>
                            <p className='title'>사계절을 수놓는 지역별 축제 정보를 모아 <br />특별한 순간을 경험해보세요</p>
                            <p className='sub-title'>Experience the vibrant festivals of each region, <br />thoughtfully gathered to bring you unforgettable seasonal moments</p>
                        </div>
                        <div className='festivals-wrap'>
                            <div className='festivals-inner'>
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={15}
                                    navigation={false}
                                    onSwiper={(s) => {
                                        setSwiper(s);
                                        setIsBeginning(s.isBeginning);
                                        setIsEnd(s.isEnd);
                                    }}
                                    onSlideChange={(s) => {
                                        setIsBeginning(s.isBeginning);
                                        setIsEnd(s.isEnd);
                                    }}


                                    observer={false}
                                    observeParents={false}

                                    preventClicks
                                    preventClicksPropagation
                                    slideToClickedSlide={false}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 2,
                                            spaceBetween: 10
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 10
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 15
                                        },
                                        1250: {
                                            slidesPerView: 4,
                                            spaceBetween: 15
                                        },
                                    }}
                                >
                                    {festival.map(place => (
                                        <SwiperSlide key={place.id} className='festivals-item'>
                                            <Link key={place.id} to={`/places/detail/${place.id}`} className='festivals-link' onClick={stopClickIfDragging}>
                                                <div className='img-wrap'>
                                                    <img src={`http://localhost:5000/${place.image[0]}`} alt="" loading="lazy" decoding="async" />
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}

                                </Swiper>

                                <div className="section04__navigation-wrap">
                                    <button
                                        className={`btn-prev ${isBeginning ? 'is-disabled' : ''}`}
                                        onClick={() => swiper?.slidePrev()}
                                        disabled={isBeginning}
                                        aria-disabled={isBeginning}
                                    >
                                        <span className='blind'>이전 슬라이드 보기</span>
                                    </button>
                                    <button
                                        className={`btn-next ${isEnd ? 'is-disabled' : ''}`}
                                        onClick={() => swiper?.slideNext()}
                                        disabled={isEnd}
                                        aria-disabled={isEnd}
                                    >
                                        <span className='blind'>다음 슬라이드 보기</span>
                                    </button>
                                </div>
                            </div>

                            <Link to='/places/festival' className='btn-more type2'>
                                축제 보러가기
                            </Link>
                        </div>
                    </div>
                </div>
                {/* end section 04 */}

                <div className='section05-wrap'>
                    <div className='section05-inner'>
                        <div className='title-wrap'>
                            <p className='title'>여행의 순간을 기록한 생생한 리뷰를 통해 <br />다음 여행을 더 특별하게 준비해보세요</p>
                            <p className='sub-title'>Discover authentic reviews filled with real travel moments, <br />and plan your next journey with confidence</p>
                        </div>

                        <div className='review-wrap'>
                            <div className='review-inner'>
                                {review.map(r => (
                                    <Link key={r.id} to={`/review/${r.id}`} className='review-item'>
                                        <div className='img-wrap'>
                                            <img src={`http://localhost:5000/${r.image[0]}`} alt="" />
                                        </div>
                                        <div className='text-wrap'>
                                            <p className='title'>{r.title}</p>
                                            <p className='text'>{r.content}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Link to='/review' className='btn-more type2'>
                                리뷰 보러가기
                            </Link>
                        </div>
                    </div>
                </div>
                {/* end section 05 */}

            </div>
        </div>
    )
}

export default Home
