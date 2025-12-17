import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    // 바깥 클릭하면 닫기 (모바일 클릭 UX 보완)
    useEffect(() => {
        const onDocMouseDown = (e) => {
            if (!userMenuRef.current) return;
            if (!userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', onDocMouseDown);
        return () => document.removeEventListener('mousedown', onDocMouseDown);
    }, []);

    // 메뉴 항목 클릭 시 닫기
    const closeUserMenu = () => setUserMenuOpen(false);

    return (
        <header>
            <div className="header-wrap">
                <div className="header-inner">
                    <h1 className="logo-wrap">
                        <Link to="/" className="logo" aria-label="홈">
                        <img src="/images/common/logo.png" alt="Travel Log - 여행로그 로고" />
                        </Link>
                    </h1>

                    <div className="gnb-wrap">
                        <nav aria-label="주요 메뉴">
                        <ul className="gnb-list">
                            <li className="gnb">
                            <NavLink to="/places" className="gnb-link">
                                여행지
                            </NavLink>
                            </li>
                            <li className="gnb">
                            <NavLink to="/activities" className="gnb-link">
                                액티비티
                            </NavLink>
                            </li>
                            <li className="gnb">
                            <NavLink to="/festivals" className="gnb-link">
                                축제
                            </NavLink>
                            </li>
                            <li className="gnb">
                            <NavLink to="/review" className="gnb-link">
                                리뷰
                            </NavLink>
                            </li>
                            <li className="gnb">
                            <NavLink to="/travelLog" className="gnb-link">
                                나의 여행로그
                            </NavLink>
                            </li>
                        </ul>
                        </nav>
                    </div>

                    <div className="header__util-wrap">
                        <div className="header__util-inner">

                        {/* ✅ PC: hover / Mobile: click */}
                        <div
                            ref={userMenuRef}
                            className={`header__util-hover ${userMenuOpen ? 'is-open' : ''}`}
                        >
                            <button
                            type="button"
                            className="header__util mypage"
                            aria-label="회원서비스"
                            aria-haspopup="true"
                            aria-expanded={userMenuOpen}
                            onClick={() => setUserMenuOpen((v) => !v)}
                            >
                            <img src="/images/common/icon_member.png" alt="" />
                            </button>

                            <ul className="header__util-list">
                            <li>
                                <Link to="/Login" onClick={closeUserMenu}>로그인</Link>
                            </li>
                            <li>
                                <Link to="/Auth" onClick={closeUserMenu}>회원가입</Link>
                            </li>
                            <li>
                                <Link to="/MyPage" onClick={closeUserMenu}>마이페이지</Link>
                            </li>
                            <li>
                                <Link to="/Logout" onClick={closeUserMenu}>로그아웃</Link>
                            </li>
                            </ul>
                        </div>

                        <Link to="/wishlist" className="header__util wishlist" aria-label="찜 목록">
                            <img src="/images/common/icon_wish.png" alt="" />
                        </Link>

                        <Link to="/search" className="header__util search" aria-label="검색">
                            <img src="/images/common/icon_search.png" alt="" />
                        </Link>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
