import React from 'react'
import styled from 'styled-components'
import Stars from './Stars'

function Book({book, starCheck, handleImg, isRent, handleAdd, count, handlePlus, handleMinus, isWish, isRented, isReturn, isReview, handleReview, isSlider, className}) {
  return (
    <StyledDiv key={book[1]} className={className}>
      <Wrapper>
        <ImgWrapper><StyledImg src={'/images/books/'+book[0]+'.jpg'} alt={book[0]} onClick={handleImg}/></ImgWrapper>
        <ContentWrapper>
          {isSlider || <TitleWrapper>{book[1]}</TitleWrapper>}
          {isSlider || <DetailWrapper>저자: {book[2]}</DetailWrapper>}
          {isSlider || <Stars starCheck={starCheck} bookId={book[0]}/>}

          {isRent && <DetailWrapper>대여가능 권수: {book[5] === 0 ? 0 : book[5] || 5}</DetailWrapper>}
          {isRent && <StyledButton value={book} onClick={handleAdd}>대여</StyledButton>}

          {isWish && <DetailWrapper>대여가능 권수: {book[4] === 0 ? 0 : book[4] || 5}</DetailWrapper>}
          {isWish && <DetailWrapper>대여희망 권수: {count[book[0]]}</DetailWrapper>}
          {isWish && <StyledButton name={book[0]} value={book[4]} onClick={handleMinus}>-</StyledButton>}
          {isWish && <StyledButton name={book[0]} value={book[4]} onClick={handlePlus}>+</StyledButton>}

          {isRented && <DetailWrapper>빌린수량: {book[3]}</DetailWrapper>}
          {isRented && <StyledButton value={book} onClick={handleAdd}>반납 목록에 추가</StyledButton>}

          {isReturn && <DetailWrapper>빌린수량: {book[3]}</DetailWrapper>}
          {isReturn && <DetailWrapper>반납할 수량: {book[4]}</DetailWrapper>}
          {isReturn && <StyledButton value={book} onClick={handlePlus}>+</StyledButton>}
          {isReturn && <StyledButton value={book} onClick={handleMinus}>-</StyledButton>}
        
          {isReview && <StyledButton value={book} onClick={handleReview}>리뷰 남기기</StyledButton>}
        </ContentWrapper>
      </Wrapper>
    </StyledDiv>
  )
}

export default Book

const StyledDiv = styled.div`
  background-color: white;
  border: 2px solid #d1d1ef;
  border-radius: 10px;
  padding: 10px;
  height: auto;
  box-sizing: inherit;
`;

const Wrapper = styled.div`
width: 100%;
height: 100%;
margin: auto;
display: grid;
grid-template-columns: 2fr 3fr;
`;

const ImgWrapper = styled.div`
  display: table;
  margin: auto;
`;

const ContentWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: table;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const TitleWrapper = styled.h3`
  font-size: 1em;
  font-weight: bold;
`;

const DetailWrapper = styled.p`
  font-size: 0.8em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const StyledButton = styled.button`
  /* width: 20%; */
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #514fa1;
  color: #d1d1ef;
  font-size: 13px;
  font-weight: bold;
  margin-top: 10px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    margin-top: 30px;
    font-size: 35px;
  }
`;

const SlierWrapper = styled.h3`
  color: black;
  font-size: 25px;
  font-weight: bold;
`;
