import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewDetailPage.css';

const ReviewDetailPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="rd-container">
        <div className="rd-container-text">
          <h1>대관령 양떼목장</h1>
          <img src="/images/common/icon_wish.png" alt="찜" />
        </div>
      </div>

      <div className="rd-wrap">
        <div className="rd-content">
          <img src="/images/review/reviewsample1.png" alt="샘플 사진1" />
          <p>
            여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른 사람들의 속도 속으로 자신을 옮겨 놓는 일이다. 공항이나 기차역에 도착하는 순간부터 마음은 이미 여행자의 리듬에 맞추어 천천히 흔들리기 시작한다. 가방의 무게는 가볍지 않지만, 그 안에는 설렘과 기대가 함께 들어 있어 오히려 발걸음이 가벼워진다.
          </p>
          <img src="/images/review/reviewsample2.png" alt="샘플 사진2" />
        </div>

        <div className="rd-comment-section">
          <div className="rd-comment-title-wrap">
            <h3>Review</h3>
            <button
              className="write-review-btn"
              onClick={() => navigate('/review/write')}>
                나도 리뷰 작성해보기
              </button>
          </div>

          <div className="rd-comment">
            <div className="rd-comment-profile"></div>
            <div className="rd-comment-content">
              <div className="rd-comment-header">
                <span className="rd-comment-user">닉네임</span>
                <span className="rd-comment-date">2025.12.11</span>
              </div>
              <p className="rd-comment-text">좋아요</p>
              <div className="rd-comment-like">
                <img src="/images/common/icon-thumb-up.png" className="rd-comment-like-icon" alt="추천" />
                <span className="rd-comment-like-count">14</span>
              </div>
            </div>
          </div>

          <div className="rd-comment">
            <div className="rd-comment-profile"></div>
            <div className="rd-comment-content">
              <div className="rd-comment-header">
                <span className="rd-comment-user">닉네임</span>
                <span className="rd-comment-date">2025.12.11</span>
              </div>
              <p className="rd-comment-text">좋아요</p>
              <div className="rd-comment-like">
                <img src="/images/common/icon-thumb-up.png" className="rd-comment-like-icon" alt="추천" />
                <span className="rd-comment-like-count">14</span>
              </div>
            </div>
          </div>
          <div className="rd-comment-input">
            <div className="rd-comment-profile2"></div>
            <input type="text" placeholder="리뷰를 작성해주세요" />
            <button>작성</button>
          </div>
          <div className="rd-back-wrap">
            <button className="rd-back-btn">추천 게시판 목록으로 돌아가기</button>
          </div>


        </div>
      </div>
    </>
  );
};

export default ReviewDetailPage;
