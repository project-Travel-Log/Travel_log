import React, { useState } from 'react';
import { GENDER } from '../../constants/enums'
import './SignUp.css'

const Auth = () => {

  return (
    <div class="signup-page">
      <section class="signup-left">


        <div class="signup-profile">
          <div class="signup-profile-circle"></div>
          <span class="signup-profile-text">프로필 사진 추가</span>
        </div>

        <form class="signup-form">
          <input class="signup-input" type="text" placeholder="아이디" />
          <input class="signup-input" type="password" placeholder="비밀번호" />
          <input class="signup-input" type="password2" placeholder="비밀번호 확인" />
          <input class="signup-input" type="gender" placeholder="성별" />
          <input class="signup-input" type="email" placeholder="email" />
          <input class="signup-input" type="text" placeholder="닉네임" />
          <input class="signup-input" type="text" placeholder="전화번호" />

          <button class="signup-submit-button" type="submit">
            회원가입
          </button>
        </form>
        <span class="signup-profile-text"><a href="#">계정을 가지고 계십니까?</a></span>
      </section>

      <section class="signup-right">
        <img class="signup-bg-img" src='/images/login/회원가입 페이지 이미지.jpg' alt="signup-bg-img" />
      </section>

    </div>
  );
};

export default Auth;
