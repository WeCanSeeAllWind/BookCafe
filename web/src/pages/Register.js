import axios from 'axios';
import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('/api/user/register', {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    })
    .then(res=>{
      if (res.data.result === 'success') {
        navigate('/');
      } else {
        console.log(res.data)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div>
        <label htmlFor="name">name<input type="text" ref={name} /></label>
        <label htmlFor="email">email<input type="email" ref={email} /></label>
        <label htmlFor="password">password<input type="password" ref={password}/></label>
        <button onClick={handleSubmit}>register</button>
    </div>
  )
}

export default Register

