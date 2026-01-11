import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const { user, logout } = useContext(AuthContext) 

    const userRef = useRef(null);
    const searchRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // 바깥 클릭하면 닫기 (모바일 클릭 UX 보완)
    useEffect(() => {
        const onDocMouseDown = (e) => {
            const clickedInside =
            userRef.current?.contains(e.target) ||
            searchRef.current?.contains(e.target) ||
            mobileMenuRef.current?.contains(e.target);

            if (!clickedInside) setOpenMenu(null);

        };

        document.addEventListener('mousedown', onDocMouseDown);
        return () => document.removeEventListener('mousedown', onDocMouseDown);
    }, []);

    const toggleMenu = (menuName) => {
        setOpenMenu((prev) => (prev === menuName ? null : menuName));
    };


    // 메뉴 항목 클릭 시 닫기
    const closeAll = () => setOpenMenu(null);

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
                                <NavLink to="/places/travel" className="gnb-link">
                                    여행지
                                </NavLink>
                                </li>
                                <li className="gnb">
                                <NavLink to="/places/activity" className="gnb-link">
                                    액티비티
                                </NavLink>
                                </li>
                                <li className="gnb">
                                <NavLink to="/places/festival" className="gnb-link">
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

                            {/* PC: hover / Mobile: click */}
                            <div
                                ref={userRef}
                                className={`header__util-hover ${openMenu === 'user' ? 'is-open' : ''}`}
                            >
                                <button
                                type="button"
                                className="header__util mypage"
                                aria-label="회원서비스"
                                aria-haspopup="true"
                                aria-expanded={openMenu === 'user'}
                                onClick={() => toggleMenu('user')}
                                >
                                    <img src="/images/common/icon_member.png" alt="" />
                                </button>

                                <ul className="header__util-list">
                                    {user ? (

                                        <>  
                                            <li>
                                                <p>{user.username}</p>
                                            </li>
                                            <li>
                                                <Link to="/" onClick={logout}>로그아웃</Link>
                                            </li>
                                            <li>
                                                <Link to="/MyPage" onClick={closeAll}>마이페이지</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/Login" onClick={closeAll}>로그인</Link>
                                            </li>
                                            <li>
                                                <Link to="/SignUp" onClick={closeAll}>회원가입</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <Link to="/wishlist" className="header__util wishlist" aria-label="찜 목록">
                                <img src="/images/common/icon_wish.png" alt="" />
                            </Link>

                            {/* ✅ 검색 (드롭다운/패널 방식) */}
                            <div
                                ref={searchRef}
                                className={`search-area ${openMenu === 'search' ? 'is-open' : ''}`}
                            >
                                <button
                                type="button"
                                className="header__util search"
                                aria-label="검색 열기"
                                aria-haspopup="true"
                                aria-expanded={openMenu === 'search'}
                                onClick={() => toggleMenu('search')}
                                >
                                    <img src="/images/common/icon_search.png" alt="" />
                                </button>

                                <div className="search__form-wrap">
                                    <form
                                        className='search__form-inner'
                                        onSubmit = {(e) => {
                                            e.preventDefault();
                                            // navigate(`/search?q=${keyword}`)
                                        }}
                                    >
                                        <input type="text" placeholder='검색어를 입력해주세요' />
                                        <button type='submit'>
                                            <img src="/images/common/icon_search.png" alt="" />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div
                                ref={mobileMenuRef}
                                className={`header__util-hover mobile__menu ${openMenu === 'mobileMenu' ? 'is-open' : ''}`}
                            >
                                <button
                                    type="button"
                                    className="header__util menu"
                                    aria-label="모바일 메뉴 열기"
                                    aria-haspopup="true"
                                    aria-expanded={openMenu === 'mobileMenu'}
                                    onClick={() => toggleMenu('mobileMenu')}
                                >
                                    <img src="/images/common/icon_menu.png" alt="" />
                                </button>

                                <ul className="header__util-list">
                                    <li>
                                        <NavLink to="/places/travel" className="gnb-link">
                                            여행지
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/places/activity" className="gnb-link">
                                            액티비티
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/places/festival" className="gnb-link">
                                            축제
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/review" className="gnb-link">
                                            리뷰
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/travelLog" className="gnb-link">
                                            나의 여행로그
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
