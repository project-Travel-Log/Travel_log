import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../src/main.css';

const Home = () => {
    const [ swiper, setSwiper ] = useState();
    const [isDragging, setIsDragging] = useState(false);

    const stopClickIfDragging = (e) => {
    if (isDragging) {
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
                                <Link to='/places' className='place-item'>
                                    <img src="/images/temp/temp2.png" alt="" />
                                </Link>
                                <Link to='/places' className='place-item'>
                                    <img src="/images/temp/temp.png" alt="" />
                                </Link>
                                <Link to='/places' className='place-item'>
                                    <img src="/images/temp/main_section02_temp_03.png " alt="" />
                                </Link>
                            </div>
                            <Link to='/places' className='btn-more type2'>
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
                            <p className='sub-title'>Discover a collection of activities that make every trip <br/>more exciting and immersive</p>
                        </div>
                        <div className='activity-wrap'>
                            <div className='activity-inner'>
                                <Link to='/activities' className='activity-item'>
                                    <img src="/images/temp/main_section03_temp_01.png" alt="" />
                                </Link>
                                <Link to='/activities' className='activity-item'>
                                    <img src="/images/temp/main_section03_temp_02.png" alt="" />
                                </Link>
                                <Link to='/activities' className='activity-item'>
                                    <img src="/images/temp/main_section03_temp_03.png" alt="" />
                                </Link>
                                <Link to='/activities' className='activity-item'>
                                    <img src="/images/temp/main_section03_temp_04.png" alt="" />
                                </Link>
                                <Link to='/activities' className='activity-item'>
                                    <img src="/images/temp/main_section03_temp_05.png" alt="" />
                                </Link>
                                <Link to='/activities' className='activity-item'>
                                    <img src="/images/temp/main_section03_temp_06.png" alt="" />
                                </Link>
                            </div>
                            
                            <Link to='/activities' className='btn-more type2'>
                                액티비티 보러가기
                            </Link> 
                        </div>
                    </div>
                </div>
                {/* end section 03 */}

                <div className='section04-wrap'>
                    <div className='section04-inner'>
                        <div className='title-wrap'>
                            <p className='title'>사계절을 수놓는 지역별 축제 정보를 모아 <br/>특별한 순간을 경험해보세요</p>
                            <p className='sub-title'>Experience the vibrant festivals of each region, <br />thoughtfully gathered to bring you unforgettable seasonal moments</p>
                        </div>
                        <div className='festivals-wrap'>
                            <div className='festivals-inner'>
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={15}
                                    speed={600}
                                    loop={true}
                                    loopAdditionalSlides={2}
                                    onSwiper={setSwiper}
                                    navigation={false}
                                    // Swiper 레벨 클릭/탭 방지
                                    preventClicks={true}
                                    preventClicksPropagation={true}
                                    slideToClickedSlide={false}
                                    // 드래그 상태 추적
                                    onTouchStart={() => setIsDragging(false)}
                                    onSliderMove={() => setIsDragging(true)}
                                    onTouchEnd={() => setTimeout(() => setIsDragging(false), 0)}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 2,
                                            spaceBetween : 10
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween : 10
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween : 15
                                        },
                                        1250: {
                                            slidesPerView: 4,
                                            spaceBetween : 15
                                        },
                                    }}
                                >
                                    <SwiperSlide className='festivals-item'>
                                        <Link to='/festivals' className='festivals-link' onClick={stopClickIfDragging}>
                                            <div className='img-wrap'>
                                                <img src="/images/temp/main_section04_temp_01.png" alt="" />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide className='festivals-item'>
                                        <Link to='/festivals' className='festivals-link' onClick={stopClickIfDragging}>
                                            <div className='img-wrap'>
                                                <img src="/images/temp/main_section04_temp_02.png" alt="" />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide className='festivals-item'>
                                        <Link to='/festivals' className='festivals-link' onClick={stopClickIfDragging}>
                                            <div className='img-wrap'>
                                                <img src="/images/temp/main_section04_temp_03.png" alt="" />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide className='festivals-item'>
                                        <Link to='/festivals' className='festivals-link' onClick={stopClickIfDragging}>
                                            <div className='img-wrap'>
                                                <img src="/images/temp/main_section04_temp_04.png" alt="" />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                    <SwiperSlide className='festivals-item'>
                                        <Link to='/festivals' className='festivals-link' onClick={stopClickIfDragging}>
                                            <div className='img-wrap'>
                                                <img src="/images/temp/main_section04_temp_05.png" alt="" />
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                </Swiper>
                                <div className="section04__navigation-wrap">
                                    <button
                                        className='btn-prev'
                                        onClick={ () => swiper?.slidePrev() }
                                    >
                                        <span className='blind'>이전 슬라이드 보기</span>
                                    </button>
                                    <button
                                        className='btn-next'
                                        onClick={ () => swiper?.slideNext() }
                                    >
                                        <span className='blind'>다음 슬라이드 보기</span>
                                    </button>
                                </div>
                            </div>
                            
                            <Link to='/festivals' className='btn-more type2'>
                                축제 보러가기
                            </Link> 
                        </div>
                    </div>
                </div>
                {/* end section 04 */}

                <div className='section05-wrap'>
                    <div className='section05-inner'>
                        <div className='title-wrap'>
                            <p className='title'>여행의 순간을 기록한 생생한 리뷰를 통해 <br/>다음 여행을 더 특별하게 준비해보세요</p>
                            <p className='sub-title'>Discover authentic reviews filled with real travel moments, <br />and plan your next journey with confidence</p>
                        </div>

                        <div className='review-wrap'>
                            <div className='review-inner'>
                                <Link to='/reivew' className='review-item'>
                                    <div className='img-wrap'>
                                        <img src="/images/temp/main_section05_temp.png" alt="" />
                                    </div>
                                    <div className='text-wrap'>
                                        <p className='title'>강릉 영진해변</p>
                                        <p className='text'>영진해변은 드라마 촬영지로 유명하고,</p>
                                    </div>
                                </Link>
                                <Link to='/reivew' className='review-item'>
                                    <div className='img-wrap'>
                                        <img src="/images/temp/main_section05_temp.png" alt="" />
                                    </div>
                                    <div className='text-wrap'>
                                        <p className='title'>강릉 영진해변</p>
                                        <p className='text'>영진해변은 드라마 촬영지로 유명하고, 백사장이 넓어 피크닉, 차박, 물놀이, 낚시</p>
                                    </div>
                                </Link>
                                <Link to='/reivew' className='review-item'>
                                    <div className='img-wrap'>
                                        <img src="/images/temp/main_section05_temp.png" alt="" />
                                    </div>
                                    <div className='text-wrap'>
                                        <p className='title'>강릉 영진해변</p>
                                        <p className='text'>영진해변은 드라마 촬영지로 유명하고, 백사장이 넓어 피크닉, 차박, 물놀이, 낚시를 즐기기 좋다. 방파제나 해변에서 낚시를 즐기거나, 기암과석에서 경치를 즐길 수 있다.</p>
                                    </div>
                                </Link>
                            </div>
                            
                            <Link to='/places' className='btn-more type2'>
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
