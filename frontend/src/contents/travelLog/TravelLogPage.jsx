import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';
import { getTravellogList } from '../../API/mytravellog';

const TravelLogPage = () => {
    const navigate = useNavigate();
    const [rlist, setRlist] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        getTravellogList(page, keyword)
            .then(res => {
                setRlist(res.data.mytravellogs);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.error(err));


        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile(); // 최초 1회
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, [page, keyword])


    return (
        <div className="board-wrap">
            <div className="board-header" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/review/mytravellogmain.png)` }}>
                <h3 className='title'>Travellog</h3>
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
                            {rlist.map(mytravellog => (
                                <tr key={mytravellog.id}>
                                    <td className="mo-none">{mytravellog.id}</td>
                                    <td className="title" onClick={() => navigate(`/travelLog/${mytravellog.id}`)}>{mytravellog.title}</td>
                                    <td className="mo-none">{mytravellog.user?.username}</td>
                                    <td>{mytravellog.created_at}</td>
                                    <td>{mytravellog.like_count}</td>
                                </tr>
                            ))}
                            {rlist.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={isMobile ? 3 : 5}
                                        style={{ textAlign: "center" }}
                                    >
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="btn-wrap">
                        <button
                            className="btn-write"
                            onClick={() => navigate('/travellog/write')}
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
