import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import styled from 'styled-components';

function Login() {
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
        <Nav/>
        <ContentWrapper>
          <FormWapper>
            <StyledImg src="/images/icons/elice.png" alt="elice"/>
            <StyledLabel htmlFor="email">
              <StyledInput type="email" ref={email} placeholder="Email"/>
            </StyledLabel>
            <StyledLabel htmlFor="password">
              <StyledInput type="password" ref={password} placeholder="Password"/>
            </StyledLabel>
            <StyledButton onClick={handleSubmit}>Login</StyledButton>
          </FormWapper>
        </ContentWrapper>
    </div>
  )
}

export default Login

const ContentWrapper = styled.div`
  display: flex;
  height: 98vh;
  background-color: #dadaf9;
`;
const FormWapper = styled.div`
  position: relative;
  margin: auto;
  width: 400px;
  height: 500px;
  border: 2px solid #dadaf9;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  background-color: #ededfe;
  box-sizing: border-box;
`;
const StyledLabel = styled.label`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  background-color: white;
  border-radius: 10px;
`;
const StyledButton = styled.button`
  margin: auto;
  border-radius: 10px;
  width: 250px;
  height: 50px;
  background-color: #514fa1;
  color: #d1d1ef;
  font-size: 15px;
  font-weight: bold;
`;
const StyledInput = styled.input`
  border-radius: 10px;
  width: 250px;
  height: 50px;
  text-align: center;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 50px;
  left: 100px;
  width: 200px;
  height: 48px;
`;
