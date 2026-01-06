import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';

const TravelLogPage = () => {
  const navigate = useNavigate();

  const reviews = [
    { id: 25, title: '게시글 제목', nickname: '글쓴이', date: '2025.12.11', like: 125 },
    { id: 24, title: '게시글 제목', nickname: '글쓴이', date: '2025.12.11', like: 125 },
  ];

  const [page, setPage] = useState(1);
  const totalPages = 23;

  return (
        <div className="board-wrap">
            <div className="board-header" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/review/mytravellogmain.png)` }}>
                <h3 className='title'>Travellog</h3>
                <form action="">
                    <div className="search-wrap">
                        <input type="text" />
                        <button type='submit'>검색</button>
                    </div>
                </form>
            </div>

            <div className="board__table-wrap">
                <div className="board-inner">
                    <table className="board__table">
                        <colgroup>
                            <col className="col-no mo-none" />
                            <col className="col-title" />
                            <col className="col-nick mo-none" />
                            <col className="col-date" />
                            <col className="col-like" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="mo-none">순번</th>
                                <th>제목</th>
                                <th className="mo-none">닉네임</th>
                                <th>등록일</th>
                                <th>추천수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(item => (
                            <tr key={item.id} onClick={() => navigate(`/travelLog/${item.id}`)}>
                                <td className="mo-none">{item.id}</td>
                                <td className="title"><Link to="travelLog">{item.title}</Link></td>
                                <td className="mo-none">{item.nickname}</td>
                                <td>{item.date}</td>
                                <td>{item.like}</td>
                            </tr>
                            ))}
                            {Array.from({ length: 0 }).map((_, i) => (
                            <tr key={`empty-${i}`}>
                                <td colSpan={ 5 } style={{'text-align' : 'center'}}>등록된 리뷰가 없습니다.</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="btn-wrap">
                        <button
                            className="btn-write"
                            onClick={() => navigate('/travelLog/write')}
                            >
                                글 작성하기
                        </button>
                    </div>
                    
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onChange={(p) => setPage(p)}
                    />
                </div>
            </div>
        </div>
  );
};

export default TravelLogPage;
