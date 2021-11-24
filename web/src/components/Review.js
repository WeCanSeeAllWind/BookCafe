import axios from 'axios';
import React, {useState, useRef, useContext} from 'react';
import { Context } from '../reducers';
import Nav from './Nav';
import styled from 'styled-components';

function Review({book, onClick}) {
  const [isFilled, setIsFilled] = useState([0, false, false, false, false, false]);
  const [starScore, setStarScore] = useState(0);
  const reviewText = useRef();
  const [{sessionId}, ] = useContext(Context);
  const [bookId, bookName] = book;
  const handleStar = (e)=>{
    e.preventDefault();
    const newIsFilled = [false, false, false, false, false, false];
    for (let i=1; i <= Number(e.target.alt); i++) {newIsFilled[i] = true};
    setIsFilled(newIsFilled);
    setStarScore(Number(e.target.alt));
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('/api/review/new', {sessionId, bookId, starScore, reviewText: reviewText.current.value}).then(res=>{
      if (res.data.result === "change") {
        alert("리뷰는 1권당 하나씩만 작성이 가능합니다. 새로 작성하신 리뷰로 변경했습니다.")
      }
      onClick(e)
    }).catch(console.log);
  }
  return (
    <StyledDiv>
      <Nav/>
      <ContentWrapper>
        <FormWapper>
          <StyledTitle>{bookName}이</StyledTitle>
          <StyledTitle>마음에 드셨나요? 평점을 남겨주세요</StyledTitle>
          <StyledHr/>
          <Stars>
            {isFilled[1] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="1"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="1"/>}
            {isFilled[2] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="2"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="2"/>}
            {isFilled[3] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="3"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="3"/>}
            {isFilled[4] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="4"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="4"/>}
            {isFilled[5] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="5"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="5"/>}
          </Stars>
          <StyledInput type="text" ref={reviewText} required placeholder="리뷰를 입력해주세요."/>
          <StyledButton onClick={handleSubmit}>리뷰 등록</StyledButton>
        </FormWapper>
      </ContentWrapper>
    </StyledDiv>
  )
}

export default Review
const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;
const ContentWrapper = styled.div`
  display: flex;
  height: 98vh;
  background-color: rgba(218, 218, 248, 0.8);
  p {
    margin-left: 10px;
    line-height: 1.7;
  }
`;
const FormWapper = styled.div`
  position: relative;
  margin: auto;
  width: 700px;
  height: 900px;
  border: 2px solid #dadaf9;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
`;
const StyledTitle = styled.h1`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  color: #514fa1;
  font-size: 25px;
  font-weight: bold;
`;

const Stars = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
`;
const ConWrapper = styled.div`
  display: flex;
  margin: 30px 0;
`;
const ConDetail = styled.div`
  margin-top: auto;
  margin-bottom: 30px;
  p {
    font-size: 16px;
    font-weight: 600;
    color: gray;
  }
`;
const StyledButton = styled.button`
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  border-radius: 10px;
  width: 250px;
  height: 50px;
  background-color: #514fa1;
  color: #d1d1ef;
  font-size: 15px;
  font-weight: bold;
`;


const StyledHr = styled.div`
  border: solid 1px #dadaf9;
  margin-bottom: 20px ;
`;

const StyledInput = styled.textarea`
  background-color: #dadaf9;
  width: 500px;
  height: 450px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  color: black;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  padding: 50px;
  box-sizing: border-box;
`;