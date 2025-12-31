import React from 'react';
import './TravelLogDetailPage.css';

const TravelLogDetailPage = () => {
 return (
  <>
   <div className="tld-container">
    <img src="/images/review/reviewdetail.png" alt="리뷰 디테일 메인 사진" />
    <div className="tld-container-text">
     <h1>게시글 제목</h1>
     <span>닉네임 | 2025.12.11</span>
    </div>
   </div>

   <div className="tld-wrap">
    <div className="tld-content">
     <img src="/images/review/tldsample.png" alt="샘플 사진" />
     <p>
      여행을 떠난다는 것은 단순히 지도를 따라 새로운 장소를 방문하는 행위가 아니다. 익숙한 생활의 틀을 잠시 벗어나, 다른 공기와 다른 빛, 다른 사람들의 속도 속으로 자신을 옮겨 놓는 일이다. 공항이나 기차역에 도착하는 순간부터 마음은 이미 여행자의 리듬에 맞추어 천천히 흔들리기 시작한다. 가방의 무게는 가볍지 않지만, 그 안에는 설렘과 기대가 함께 들어 있어 오히려 발걸음이 가벼워진다.


     </p>
    </div>

    <div className="tld-comment-section">
     <h3>댓글 6개</h3>

     <div className="tld-comment">
      <div className="tld-comment-profile"></div>
      <div className="tld-comment-content">
       <div className="tld-comment-header">
        <span className="tld-comment-user">닉네임</span>
        <span className="tld-comment-date">2025.12.11</span>
       </div>

       <p className="tld-comment-text">좋아요</p>

       <div className="tld-comment-like">
        <img src="/images/common/icon-thumb-up.png" className="tld-comment-like-icon" />
        <span className="tld-comment-like-count">14</span>
       </div>

       <div className="tld-comment-reply">
        <img src="/images/common/icon-up-arrow.png" className="tld-comment-arrow" />
        <span className="tld-comment-add">답글 2개</span>
       </div>

       <div className="tld-reply-list">
        <div className="tld-reply">
         <div className="tld-comment-profile"></div>
         <div className="tld-comment-content">
          <div className="tld-comment-header">
           <span className="tld-comment-user">닉네임</span>
           <span className="tld-comment-date">2025.12.11</span>
          </div>
          <p className="tld-comment-text">좋아요</p>
          <div className="tld-comment-like">
           <img src="/images/common/icon-thumb-up.png" className="tld-comment-like-icon" />
           <span className="tld-comment-like-count">14</span>
          </div>
         </div>
        </div>

        <div className="tld-reply">
         <div className="tld-comment-profile"></div>
         <div className="tld-comment-content">
          <div className="tld-comment-header">
           <span className="tld-comment-user">닉네임</span>
           <span className="tld-comment-date">2025.12.11</span>
          </div>
          <p className="tld-comment-text">좋아요</p>
          <div className="tld-comment-like">
           <img src="/images/common/icon-thumb-up.png" className="tld-comment-like-icon" />
           <span className="tld-comment-like-count">14</span>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>

     <div className="tld-comment">
      <div className="tld-comment-profile"></div>
      <div className="tld-comment-content">
       <div className="tld-comment-header">
        <span className="tld-comment-user">닉네임</span>
        <span className="tld-comment-date">2025.12.11</span>
       </div>

       <p className="tld-comment-text">좋아요</p>

       <div className="tld-comment-like">
        <img src="/images/common/icon-thumb-up.png" className="tld-comment-like-icon" />
        <span className="tld-comment-like-count">14</span>
       </div>

       <div className="tld-comment-reply">
        <img src="/images/common/icon-down.png" className="tld-comment-arrow" />
        <span className="tld-comment-add">답글 2개</span>
       </div>
      </div>
     </div>

     <div className="tld-comment-input">
      <div className="tld-comment-profile2"></div>
      <input type="text" placeholder="댓글을 입력해주세요" />
      <button>작성</button>
     </div>
    </div>
   </div>
  </>
 );
};

export default TravelLogDetailPage;
