import React, { useContext } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { Context } from '../reducers';
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [{isLogin}, dispatch] = useContext(Context);
  const handleRental = (e)=>{
    e.preventDefault();
    if (isLogin) {
      navigate('/rent');
    } else {
      alert('로그인 후 사용할 수 있는 서비스입니다.');
    }
  };
  const handleReturn = (e)=>{
    e.preventDefault();
    if (isLogin) {
      navigate('/return');
    } else {
      alert('로그인 후 사용할 수 있는 서비스입니다.');
    }
  };  
  const handleMypage = (e)=>{
    e.preventDefault();
    if (isLogin) {
      navigate('/mypage');
    } else {
      alert('로그인 후 사용할 수 있는 서비스입니다.');
    }
  };
  const handleLogin = (e)=>{
    e.preventDefault();
    navigate('/login');
  };
  const handleLogout = (e)=>{
    e.preventDefault();
    axios('/api/user/logout').then(res=>{
      if (res.data.result === "success"){
        dispatch({type: "isLogin", payload: false});
      } else {
        alert("이미 로그아웃된 유저입니다.")
      }
    }).catch(console.log)
  };
  const handleRegister = (e)=>{
    e.preventDefault();
    navigate('/register');
  }
  return (
    <StyledDiv>
      <StyledImg src="/images/icons/elice.png" alt="elice" onClick={()=>{navigate('/')}}/>
      <StyledTitle>엘리스 Book Cafe</StyledTitle>
      <StyledButtonWrapper>
        <StyledButton onClick={handleRental}>대여하기</StyledButton>
        <StyledButton onClick={handleReturn}>반납하기</StyledButton>
        <StyledButton onClick={handleMypage}>MyPage</StyledButton>
        {isLogin ? <StyledButton onClick={handleLogout}>Logout</StyledButton> : <StyledButton onClick={handleLogin}>Login</StyledButton>}
        {isLogin || <StyledButton onClick={handleRegister}>Register</StyledButton>}
      </StyledButtonWrapper>
    </StyledDiv>
  )
}

export default Nav

const StyledDiv = styled.div`
  background-color: #292961;
  height: 42px;
  padding: 7px;
  padding-left: 15px;
  display: flex;
  box-sizing: border-box;
`;

const StyledTitle = styled.div`
  color: #d1d1ef;
  font-size: 14px;
  font-weight: bold;
  padding: 3px;
  box-sizing: border-box;
  margin-left: 20px;
`;
const StyledButton = styled.button`
  color: #d1d1ef;
  font-size: 12px;
  font-weight: bold;
  margin: 0 30px;
`;

const StyledButtonWrapper = styled.div`
  margin-left: auto;
`;

const StyledImg = styled.img`
  width: 122.94px;
  height: 28px;
  cursor: pointer;
`;
