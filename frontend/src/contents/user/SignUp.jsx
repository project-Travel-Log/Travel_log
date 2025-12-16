import React, { useState } from 'react';
import { Card, Button, Form, Alert, ToggleButtonGroup, ToggleButton, Spinner } from 'react-bootstrap';
import { GENDER } from '../../constants/enums'

const Auth = () => {
  const [mode, setMode] = useState()
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const resetMsg = () => setMsg(null);

  const validate = () => {
    if (!email) return setMsg({ type: 'danger', text: 'Email required.' });
    if (!/\S+@\S+\.\S+/.test(email))
      return setMsg({ type: 'danger', text: 'Invalid email format.' });

    if (!pw) return setMsg({ type: 'danger', text: 'Password required.' });

    if (!name) return setMsg({ type: 'danger', text: 'Name required.' });
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    resetMsg();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (mode === 'login') {
        if (email === 'test@example.com' && pw === '123456') {
          setMsg({ type: 'success', text: 'Login success!' });
        } else {
          setMsg({ type: 'danger', text: 'Login failed.' });
        }
      } else {
        setMsg({ type: 'success', text: 'Signup complete!' });
        setName('');
        setEmail('');
        setPw('');
        setMode('login');
      }
    }, 800);
  };

  return (
    <Card className="p-3">

      {msg && <Alert variant={msg.type}>{msg.text}</Alert>}

      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력해 주세요"
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            value={pw}
            type="password"
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>성별</Form.Label>
          <div className='d=flex gap3'>
            <Form.Check
              type='radio'
              label='Male'
              name='gender'
              value={GENDER.MALE}
              checked={gender === GENDER.MALE}
              onChange={(e) => setGender(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Female'
              name='gender'
              value={GENDER.FEMALE}
              checked={gender === GENDER.FEMALE}
              onChange={(e) => setGender(e.target.value)}
            ></Form.Check>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            value={name}
            type="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="닉네임을 입력해 주세요"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            value={phone}
            type="phone"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호"
          />
        </Form.Group>
        <Button type="submit" className="w-100" disabled={loading}>회원가입
        </Button>
      </Form>
    </Card>
  );
};

export default Auth;
