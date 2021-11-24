import axios from 'axios';
import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import styled from 'styled-components';

function Register() {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordCheck =useRef();
  const handleSubmit = (e)=>{
    e.preventDefault()
    if (name.current.value === "") return alert("이름을 입력해주세요");
    if (email.current.value === "") return alert("이메일을 입력해주세요");
    if (password.current.value === "") return alert("비밀번호를 입력해주세요");
    if (password.current.value !== passwordCheck.current.value) return alert("비밀번호가 서로 다릅니다.");
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
        <Nav/>
        <ContentWrapper>
          <FormWapper>
            <StyledTitle>회 원 가 입</StyledTitle>
            <StyledLabel >
              <StyledInput type="text" ref={name} placeholder="Nick Name"/>
            </StyledLabel>
            <StyledLabel >
              <StyledInput type="email" ref={email} placeholder="Email"/>
            </StyledLabel>
            <StyledLabel>
              <StyledInput type="password" ref={password} placeholder="Password"/>
            </StyledLabel>
            <StyledLabel>
              <StyledInput type="password" ref={passwordCheck} placeholder="Password Check"/>
            </StyledLabel>
            <StyledButton onClick={handleSubmit}>Register</StyledButton>
          </FormWapper>
        </ContentWrapper>
    </div>
  )
}

export default Register

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
  background-color: #ededfe;
  box-sizing: border-box;
`;
const StyledTitle = styled.h1`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 40px;
  color: #514fa1;
  font-size: 20px;
  font-weight: bold;
`;
const StyledLabel = styled.label`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
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


