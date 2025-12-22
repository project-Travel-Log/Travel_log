import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'


const Login = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [loading, setLoading] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className="login-wrap">
            <div className='login-inner'>
                <div className="bg-wrap"></div>
                <div className="login__form-wrap">
                    <form>
                        <img className='logo' src='/images/login/logo.png' alt="TRAVELOGUE" />
                        <span className="text">Journey Into New Paths and Unseen Horizons</span>
                        <input className="login-input" type="text" placeholder="아이디" />
                        <input className="login-input" type="password" placeholder="비밀번호" />
                        <button className="btn-login" type="submit">
                            로그인
                        </button>
                    </form>
                    <Link to="/SignUp" className="signup">계정을 생성하시겠습니까?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login