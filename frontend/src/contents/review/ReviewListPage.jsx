import React from 'react';
import './ReviewListPage.css';

const ReviewListPage = () => {
  return (
    <>
      <div className="review-detail-container">
        <img src={'/images/review/reviewdetail.png'} alt="리뷰 디테일 메인 사진" />
        <div className="review-detail-container-text">
          <h1>게시글 제목</h1>
          <span>작성자 · 2025.12.11</span>
        </div>
      </div>

      <div className="review-detail-wrap">
        <div className="review-detail-content">
          <img src={'/images/review/reviewsample.png'} alt="샘플 사진" />
          <p>
            여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른 사람들의 속도 속으로 자신을 옮겨 놓는 일이다. 공항이나 기차역에 도착하는 순간부터 마음은 이미 여행자의 리듬에 맞추어 천천히 흔들리기 시작한다. 가방의 무게는 가볍지 않지만, 그 안에는 설렘과 기대가 함께 들어 있어 오히려 발걸음이 가벼워진다.
          </p>
        </div>

        <div className="review-detail-comment-section">
          <h3>댓글 4개</h3>

          <div className="review-detail-comment">
  <div className="review-detail-comment-profile"></div>

  <div className="review-detail-comment-content">
    <div className="review-detail-comment-header">
      <span className="review-detail-comment-user">닉네임</span>
      <span className="review-detail-comment-date">2025.12.11</span>
    </div>

    <p className="review-detail-comment-text">좋아요</p>

    <div className="review-detail-comment-reply">
      <img src={'/images/common/icon-up-arrow.png'} alt="위쪽화살표" className="review-detail-comment-arrow" />
      <span className="review-detail-comment-add">답글 2개</span>
    </div>

    <div className="review-detail-reply-list">
      <div className="review-detail-reply">
        <div className="review-detail-comment-profile"></div>
        <div className="review-detail-comment-content">
          <div className="review-detail-comment-header">
            <span className="review-detail-comment-user">닉네임</span>
            <span className="review-detail-comment-date">2025.12.11</span>
          </div>
          <p className="review-detail-comment-text">좋아요</p>
        </div>
      </div>

      <div className="review-detail-reply">
        <div className="review-detail-comment-profile"></div>
        <div className="review-detail-comment-content">
          <div className="review-detail-comment-header">
            <span className="review-detail-comment-user">닉네임</span>
            <span className="review-detail-comment-date">2025.12.11</span>
          </div>
          <p className="review-detail-comment-text">좋아요</p>
        </div>
      </div>
    </div>
  </div>
</div>


          <div className="review-detail-comment">
            <div className="review-detail-comment-profile"></div>
            <div className="review-detail-comment-content">
              <div className="review-detail-comment-header">
                <span className="review-detail-comment-user">닉네임</span>
                <span className="review-detail-comment-date">2025.12.11</span>
              </div>
              <p className="review-detail-comment-text">좋아요</p>
              <div className="review-detail-comment-reply">
                <img src={'/images/common/icon-down.png'} alt="아래 화살표" className="review-detail-comment-arrow" />
                <span className="review-detail-comment-add">답글 2개</span>
              </div>
            </div>
          </div>

          <div className="review-detail-comment-input">
            <div className="review-detail-comment-profile2"></div>
            <input type="text" placeholder="댓글을 입력해주세요" />
            <button>작성</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewListPage;
