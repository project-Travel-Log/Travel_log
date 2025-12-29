import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { login } from '../../API/auth';
import './Login.css'


const Login = () => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault()

        if (loading) return

        if(!userid||!password){
            alert("아이디와 비밀번호를 입력해 주세요")
        }
        try{
            const res = await login(userid, password)
            localStorage.setItem('access_token', res.data.access_token)
            alert('로그인 성공')
            window.location.href = '/'
        }catch{

            alert('로그인 실패');
        }
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