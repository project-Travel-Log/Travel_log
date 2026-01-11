import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';
import { getReviewList } from '../../API/review';

const ReviewListPage = () => {
    const navigate = useNavigate();
    const [rlist, setRlist] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        getReviewList(page, keyword)
            .then(res => {
                console.log("리뷰리스트", res.data)
                setRlist(res.data.reviews)
                setTotalPages(res.data.totalPages)
            })
            .catch(err => console.error(err))
    }, [page, keyword])

    // const totalPages = 23; // 서버에서 받은 전체 페이지 수

    return (
        <div className="board-wrap">
            <div className="board-header" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/review/reviewlistmain.png)` }}>
                <h3 className='title'>Review</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setPage(1);
                }}>
                    <div className="search-wrap">
                        <input type="text" value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="제목 또는 작성자 검색"
                        />
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
                            {rlist.map(review => (
                                <tr key={review.id}>
                                    <td className="mo-none">{review.no}</td>
                                    <td className="title" onClick={() => navigate(`/review/${review.id}`)}>{review.title}</td>
                                    <td className="mo-none">{review.user?.username}</td>
                                    <td>{review.created_at}</td>
                                    <td>{review.like_count}</td>
                                </tr>
                            ))}
                            {rlist.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center" }}>
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                    <div className="btn-wrap">
                        <button
                            className="btn-write"
                            onClick={() => navigate('/review/write')}
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
export default ReviewListPage;
