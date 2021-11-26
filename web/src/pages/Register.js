import axios from 'axios';
import React, {useRef, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import styled from 'styled-components';

function Register() {
  const navigate = useNavigate();
  const name = useRef();
  const [email, setEmail] = useState("");
  const [isEmailFormat, setIsEmailFormat] = useState(false);
  const [password, setPassword] = useState("");
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const passwordCheck = useRef();
  const [passCheck, setPassCheck] = useState([false, false, false, false, false]);
  const isChar = (asciList)=>{
    const index = asciList.findIndex(e => (65<=Number(e) && Number(e)<=122))
    if (index === -1) return false
    return true
  }
  const isNum = (asciList)=>{
    const index = asciList.findIndex(e => (48<=Number(e) && Number(e)<=57))
    if (index === -1) return false
    return true
  }
  const isSpecial = (asciList)=>{
    const index = asciList.findIndex(e => (33<=Number(e) && Number(e)<=47) || (58<=Number(e) && Number(e)<=64) || (91<=Number(e) && Number(e)<=96) || (123<=Number(e) && Number(e)<=126))
    if (index === -1) return false
    return true
  }
  const isLength = ()=>{
    if (password.length < 8) return false
    return true
  }
  const handleOverlapCheck = (e)=>{
    e.preventDefault();
    axios.post('/api/user/isEmail', {email: email}).then(res=>{
      if (res.data.result === "success") {
        setIsEmailCheck(true)
      } else {
        alert('이미 사용 중인 이메일입니다.')
      }
    }).catch(console.log)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    if (name.current.value === "") return alert("이름을 입력해주세요");
    if (email === "") return alert("이메일을 입력해주세요");
    if (!isEmailFormat) return alert("이메일을 형식에 맞게 입력해주세요");
    if (!isEmailCheck) return alert('이메일 중복확인을 해주세요')
    if (password === "") return alert("비밀번호를 입력해주세요");
    if (!passCheck[4]) return alert("비밀번호를 안전하게 설정해주세요. 영문, 숫자, 특수문자 중 3종류 이상을 조합하여 최소 8자리 이상의 길이로 구성 ");
    if (password !== passwordCheck.current.value) return alert("비밀번호가 서로 다릅니다.");
    axios.post('/api/user/register', {
      name: name.current.value,
      email: email,
      password: password
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
  useEffect(() => {
    setIsEmailCheck(false);
    const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (reg.test(email)) {setIsEmailFormat(true)} else {setIsEmailFormat(false)}
  }, [email])
  useEffect(() => {
    let asciList = []
    password.split("").forEach(a=>asciList.push(a.charCodeAt(0)))
    if (isChar(asciList)) {setPassCheck(cur=>{const newPass = [...cur]; newPass[0] = true; return newPass})} else {setPassCheck(cur=>{const newPass = [...cur]; newPass[0] = false; return newPass})}
    if (isNum(asciList)) {setPassCheck(cur=>{const newPass = [...cur]; newPass[1] = true; return newPass})} else {setPassCheck(cur=>{const newPass = [...cur]; newPass[1] = false; return newPass})}
    if (isSpecial(asciList)) {setPassCheck(cur=>{const newPass = [...cur]; newPass[2] = true; return newPass})} else {setPassCheck(cur=>{const newPass = [...cur]; newPass[2] = false; return newPass})}
    if (isLength()) {setPassCheck(cur=>{const newPass = [...cur]; newPass[3] = true; return newPass})} else {setPassCheck(cur=>{const newPass = [...cur]; newPass[3] = false; return newPass})}
    if (isChar(asciList) && isNum(asciList) && isSpecial(asciList) && isLength()) {setPassCheck(cur=>{const newPass = [...cur]; newPass[4] = true; return newPass})} else {setPassCheck(cur=>{const newPass = [...cur]; newPass[4] = false; return newPass})}
  }, [password])

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
              <StyledInput type="email" value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </StyledLabel>
            <StyledLabel>
              <StyledInput type="password" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </StyledLabel>
            <StyledPassCheck>
              {passCheck[0] ? <Fullfilled>영문</Fullfilled> : <Unfilled>영문</Unfilled> }
              {passCheck[1] ? <Fullfilled>숫자</Fullfilled> : <Unfilled>숫자</Unfilled> }
              {passCheck[2] ? <Fullfilled>특수문자</Fullfilled> : <Unfilled>특수문자</Unfilled> }
              {passCheck[3] ? <Fullfilled>8자 이상</Fullfilled> : <Unfilled>8자 이상</Unfilled> }
            </StyledPassCheck>
            <StyledLabel>
              <StyledInput type="password" ref={passwordCheck} placeholder="Password Check"/>
            </StyledLabel>
            <StyledButton onClick={handleSubmit}>Register</StyledButton>
            {isEmailCheck ? <OverlapChecked>사용 가능</OverlapChecked> : <OverlapCheck onClick={handleOverlapCheck}>중복 확인</OverlapCheck>}
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
  width: 450px;
  height: 550px;
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
  margin-top: 20px;
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

const StyledPassCheck = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

const Fullfilled = styled.div`
  font-size: 0.8em;
  color: #514fa1;
  font-weight: bold;
  margin-right: 10px;
`;
const Unfilled = styled.div`
  font-size: 0.8em;
  color: gray;
  margin-right: 10px;
`;
const OverlapCheck = styled.button`
  position: absolute;
  padding: 0 0.5px;
  right: 100px;
  top: 193px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  background-color: #514fa1;
  color: #d1d1ef;
  font-size: 10px;
  font-weight: bold;
  opacity: 0.7;
`

const OverlapChecked = styled.button`
  position: absolute;
  padding: 0 0.5px;
  right: 100px;
  top: 193px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  background-color: green;
  color: greenyellow;
  font-size: 10px;
  font-weight: bold;
  opacity: 0.5;
`
