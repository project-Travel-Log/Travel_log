import React from 'react';
import './TravelLogDetailPage.css';

const TravelLogDetailPage = () => {
  return (
    <div className="detail-wrap">
      <div className="detail-header">
        <img src={process.env.PUBLIC_URL + '/images/review/reviewdetail.png'} alt="" />
        <div className="detail-header-text">
          <h1>게시글 제목</h1>
          <span>작성자 · 2025.12.11</span>
        </div>
      </div>

      <div className="detail-content">
        <img src={process.env.PUBLIC_URL + '/images/review/reviewsample.png'} alt="" />
        <p>
          여행 중 만난 풍경을 기록합니다. 이곳은 정말 아름다웠고 다시 방문하고 싶은 장소였습니다.
          사진으로는 다 담기지 않는 감동이 있었어요.
        </p>
      </div>

      <div className="detail-comment-section">
        <h3>댓글 4개</h3>

        <div className="comment">
          <div className="comment-profile"></div>
          <div className="comment-body">
            <span className="comment-user">닉네임</span>
            <span className="comment-date">2025.12.11</span>
            <p>너무 멋진 여행이네요!</p>
          </div>
        </div>

        <div className="comment-input">
          <input type="text" placeholder="댓글을 입력해주세요" />
          <button>작성</button>
        </div>
      </div>
    </div>
  );
};

export default TravelLogDetailPage;
