import React, { useContext, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { Context } from '../reducers';
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [{isLogin}, dispatch] = useContext(Context);
  const [isThumb, setIsThumb] = useState(false);
  const [profile, setProfile] = useState([]);
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
        setIsThumb(false);
      } else {
        alert("이미 로그아웃된 유저입니다.")
      }
    }).catch(console.log)
  };
  const handleRegister = (e)=>{
    e.preventDefault();
    navigate('/register');
  }
  const handleThumb = (e)=>{
    e.preventDefault();
    axios('/api/user/whoami').then(res=>{
      setProfile(res.data);
      setIsThumb(cur=>!cur);
    }).catch(console.log);
  }
  return (
    <StyledDiv>
      <StyledImg src="/images/icons/elice.png" alt="elice" onClick={()=>{navigate('/')}}/>
      <StyledTitle>엘리스 Book Cafe</StyledTitle>
      <StyledButtonWrapper>
        <StyledButton onClick={handleRental}>대여하기</StyledButton>
        <StyledButton onClick={handleReturn}>반납하기</StyledButton>
        <StyledButton onClick={handleMypage}>MyPage</StyledButton>
        {isLogin || <StyledButton onClick={handleLogin}>Login</StyledButton>}
        {isLogin || <StyledButton onClick={handleRegister}>Register</StyledButton>}
      </StyledButtonWrapper>
      {isLogin && <StyledThumb onClick={handleThumb}>
          <div>
            <div className="circle"></div>
            <div className="arrow"></div>
          </div>
        </StyledThumb>}
      {isThumb && <Profile>
        <div>닉네임: {profile[1]}</div>
        <div>이메일: {profile[0]}</div>
        <hr/>
        <button onClick={handleLogout}>Logout</button>
        </Profile>}
    </StyledDiv>
  )
}

export default Nav

const Profile = styled.div`
  position: absolute;
  top: 45px;
  right: 30px;
  width: 200px;
  height: 100px;
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  z-index: 999;
  div {
    margin-bottom: 10px;
  }
  button {
    padding: 5px;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
  }
`;

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
  margin: auto 30px;
  height: 100%;
  box-sizing: border-box;
`;

const StyledButtonWrapper = styled.div`
  margin-left: auto;
  box-sizing: border-box;
`;

const StyledThumb = styled.button`
  color: #d1d1ef;
  font-size: 12px;
  font-weight: bold;
  margin: auto 30px;
  height: 100%;
  box-sizing: border-box;
  background-color: #4b4b7d;
  border-radius: 5px;
  width: 45px;
  height: 100%;
  div {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .circle {
    margin: auto;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #9B61C1;
  }
  .arrow {
    margin: auto;
    width: 5px;
    height: 5px;
    border-right: 2px solid #d1d1ef;
    border-bottom: 2px solid #d1d1ef;
    transform: rotate(45deg);
  }
`;

const StyledImg = styled.img`
  width: 122.94px;
  height: 28px;
  cursor: pointer;
`;
