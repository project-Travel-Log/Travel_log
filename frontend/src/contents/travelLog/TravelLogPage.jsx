import React from 'react';
import './TravelLogPage.css';

const TravelLogPage = () => {
  const reviews = [
    { id: 27, title: '게시글 제목', nickname: '글쓴이', date: '2025.12.11', like: 125 },
    { id: 26, title: '게시글 제목', nickname: '글쓴이', date: '2025.12.11', like: 125 },
  ];

  return (
    <div className="review-page">
      <div className="review-pic" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/review/reviewlistmain.png)` }}>
        <h1>My Travellog</h1>
        <div className="review-search-box">
          <input type="text" />
          <button>검색</button>
        </div>
      </div>

      <div className="review-content">
        <table className="review-table">
          <thead>
            <tr>
              <th className="col-no">순번</th>
              <th className="col-title">제목</th>
              <th className="col-nick">닉네임</th>
              <th className="col-date">등록일</th>
              <th className="col-like">추천수</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(item => (
              <tr key={item.id}>
                <td className="col-no">{item.id}</td>
                <td className="title col-title">{item.title}</td>
                <td className="col-nick">{item.nickname}</td>
                <td className="col-date">{item.date}</td>
                <td className="col-like">{item.like}</td>
              </tr>
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="col-no"></td>
                <td className="col-title"></td>
                <td className="col-nick"></td>
                <td className="col-date"></td>
                <td className="col-like"></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="review-write-btn-wrap">
          <button className="review-write-btn">글 작성하기</button>
        </div>

        <div className="pagination">
          <span>{'<<'}</span>
          <span>{'<'}</span>
          <span className="active">1</span>
          <span>{'>'}</span>
          <span>{'>>'}</span>
        </div>
      </div>
    </div>
  );
};

export default TravelLogPage;
