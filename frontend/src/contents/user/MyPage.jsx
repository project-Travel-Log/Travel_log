import React from 'react'
import './MyPage.css'

const MyPage = () => {
    return (
        <div class="mypage">

            {/* <!-- 상단 프로필 영역 --> */}
            <section class="mypage-profile">
                <div class="mypage-profile-img"></div>
                <div class="mypage-profile-info">
                    <span class="mypage-profile-badge">여행자</span>
                    <span class="mypage-profile-name">1234jeju</span>
                </div>
            </section>

            {/* <!-- 카드 슬라이드 영역 --> */}
            <section class="mypage-section">
                <h3 class="mypage-section-title">최근 본 여행지</h3>

                <div class="mypage-card-row">
                    <div class="mypage-card"></div>
                    <div class="mypage-card"></div>
                    <div class="mypage-card"></div>
                    <div class="mypage-card"></div>
                </div>
            </section>

            {/* <!-- 추천 리스트 --> */}
            <section class="mypage-section">
                <h3 class="mypage-section-title">추천 여행지</h3>

                <div class="mypage-list">

                    <div class="mypage-list-item">
                        <div class="mypage-list-thumb"></div>
                        <div class="mypage-list-info">
                            <h4>Jeju</h4>
                            <p>자연과 힐링이 공존하는 여행지</p>
                        </div>
                        <button class="mypage-list-btn">자세히 보기</button>
                    </div>

                    <div class="mypage-list-item">
                        <div class="mypage-list-thumb"></div>
                        <div class="mypage-list-info">
                            <h4>Jeju</h4>
                            <p>자연과 힐링이 공존하는 여행지</p>
                        </div>
                        <button class="mypage-list-btn">자세히 보기</button>
                    </div>

                </div>
            </section>

        </div>
    )
}

export default MyPage
