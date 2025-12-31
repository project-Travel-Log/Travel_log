import React from 'react'
import './TravelLogWritePage.css';


const TravelLogWritePage = () => {
  return (
    <div className="travel-write-page">
      <div className="travel-write-banner">
        <img src="/images/review/travellogwrite.png" alt="배너 이미지" />
        <div className="travel-write-profile"></div>
      </div>

      <div className="travel-write-wrap">
        <div className="travel-write-field">
          <label>* 당신의 여행로그를 알려주세요 *</label>
          <input type="text" placeholder="장소를 입력해주세요" />
        </div>

        <div className="travel-write-field">
          <label>사진 업로드</label>
          <div className="travel-write-photo-list">
            <div className="travel-write-photo-add">
              <img src="/images/common/p.png" alt="사진업로드" />
              <p>사진 업로드</p>
            </div>
            <div className="travel-write-photo-preview"></div>
          </div>
        </div>

        <div className="travel-write-field">
          <label>* 당신의 여행로그를 소개해주세요 *</label>
          <textarea placeholder="당신의 추천코스에 대해 자세히 설명해주세요"></textarea>
        </div>

        <div className="travel-write-btns">
          <button className="travel-write-btn-cancel">취소</button>
          <button className="travel-write-btn-submit">글 등록</button>
        </div>
      </div>
    </div>
  );
};

export default TravelLogWritePage