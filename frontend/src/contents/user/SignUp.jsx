import React, { useState } from 'react';
import { GENDER } from '../../constants/enums';
import { check, signUp } from '../../API/auth';
import './SignUp.css';

const SignUp = () => {
  const [form, setForm] = useState({
    userid: "",
    password: "",
    password2: "",
    gender: "",
    email: "",
    username: "",
    phone: "",
  });


  const [dupMsg, setDupMsg] = useState({
    userid: "",
    email: "",
    username: "",
    phone: "",
  });

  const [available, setAvailable] = useState({
    userid: null,
    email: null,
    username: null,
    phone: null,
  });
  
  const [file, setFile] = useState('')
  const [view, setView] = useState('')
  const API_BASE = 'http://localhost:5000'
  const DEFAULT_IMG = `${API_BASE}/static/user_img/default.jpg`


  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setView(URL.createObjectURL(selected));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    // 입력이 바뀌면 중복 메시지 & 상태 초기화
    if (['userid', 'email', 'username', 'phone'].includes(name)) {
      setDupMsg(prev => ({
        ...prev,
        [name]: '',
      }));

      setAvailable(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };


  // 아이디 중복 체크
  const checkField = async (field, value) => {
    if (!value) return;

    try {
      const res = await check(field, value);

      setAvailable(prev => ({
        ...prev,
        [field]: res.data.available,
      }));

      setDupMsg(prev => ({
        ...prev,
        [field]: res.data.available
          ? '사용 가능합니다.'
          : '이미 사용 중입니다.',
      }));
    } catch {
      setDupMsg(prev => ({
        ...prev,
        [field]: '중복 확인 실패',
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userid, password, password2, email, username } = form;

    if (!userid || !password || !password2 || !email || !username) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (Object.values(available).some(v => v !== true)) {
      alert('중복 확인을 완료해주세요.');
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([KeyboardEvent, value])=>{
      formData.append('profile_image', file)
    })

    try {
      await signUp(form);
      alert('회원가입이 완료되었습니다.');
      window.location.href = '/Login';
    } catch (err) {
      console.error(err);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="signup-wrap">
      <div className="signup-inner">
        <div className="signup-item">
          <div className="profile">
            <div className="img-wrap">
              {view ? (
                <img src={view || DEFAULT_IMG} alt='프로필 미리보기'/>
              ):(
                <span className='preview' ><img src={DEFAULT_IMG} alt="" /></span> 
              )}
            </div>
            <label className="text"> 프로필 사진 추가 <input type='file' accept='image/*' onChange={handleFileChange}hidden /></label>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              className="signup-input"
              type="text"
              name="userid"
              placeholder="아이디"
              value={form.userid}
              onChange={handleChange}
              onBlur={() => checkField('userid', form.userid)}
            />
            <p>{dupMsg.userid}</p>

            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
            />

            <input
              className="signup-input"
              type="password"
              name="password2"
              placeholder="비밀번호 확인"
              value={form.password2}
              onChange={handleChange}
            />

            <select
              className="signup-input"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">성별 선택</option>
              <option value={GENDER.MALE}>남성</option>
              <option value={GENDER.FEMALE}>여성</option>
            </select>

            <input
              className="signup-input"
              type="email"
              name="email"
              placeholder="이메일"
              value={form.email}
              onChange={handleChange}
              onBlur={() => checkField('email', form.email)}
            />
            <p>{dupMsg.email}</p>

            <input
              className="signup-input"
              type="text"
              name="username"
              placeholder="닉네임"
              value={form.username}
              onChange={handleChange}
              onBlur={() => checkField('username', form.username)}
            />
            <p>{dupMsg.username}</p>

            <input
              className="signup-input"
              type="text"
              name="phone"
              placeholder="전화번호"
              value={form.phone}
              onChange={handleChange}
              onBlur={() => checkField('phone', form.phone)}
            />
            <p>{dupMsg.phone}</p>

            <button className="signup-submit-button" type="submit">
              회원가입
            </button>
          </form>

          <span className="text">
            <a href="/Login">계정을 가지고 계십니까?</a>
          </span>
        </div>
        </div>

        <div className="bg-wrap"></div>
      </div>
    </div>
  );
};

export default SignUp;
