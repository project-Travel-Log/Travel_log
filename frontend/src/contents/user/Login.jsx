import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import './Login.css'


const Login = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [loading, setLoading] = useState('');
    return (
        <div className="login-page">
            <section className="login-left">
                <img className="login-bg-img" src='/images/login/로그인 페이지 이미지.png' alt="login-bg-img" />
            </section>

            <section className="login-right">
                <form className="login-form">
                    <img className="login-logo" src='/images/login/로그인로고.png' alt="TRAVELOGUE" />
                    <span className="login-message">Journey Into New Paths and Unseen Horizons</span>
                    <input className="login-input" type="text" placeholder="아이디" />
                    <input className="login-input" type="password" placeholder="비밀번호" />

                    <button className="login-submit-button" type="submit">
                        로그인
                    </button>
                </form>
                <span className="signup-profile-text"><a href="#">계정을 생성하시겠습니까?</a></span>
            </section>
        </div>
    )
}

export default Login