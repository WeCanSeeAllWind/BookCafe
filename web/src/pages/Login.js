import React, {useContext, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Context} from '../reducers';

function Login() {
  const [, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('/api/user/login', {
      email: email.current.value,
      password: password.current.value
    }).then(res=>{
      if (res.data.result === 'success'){
        console.log(res.data['session_id'])
        dispatch({type: "session", payload: res.data['session_id']})
        navigate('/');
      } else if (res.data.result === 'not exist'){
        console.log(res.data);
        alert('등록되지 않은 회원입니다.');
      } else if (res.data.result === 'not match'){
        console.log(res.data);
        alert('비밀번호가 다릅니다.');
      }
    }).catch(err=>console.log(err))
  }
  return (
    <div>
        <label htmlFor="email">email<input type="email" ref={email} /></label>
        <label htmlFor="password">password<input type="password" ref={password}/></label>
        <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login
