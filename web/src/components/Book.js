import React from 'react'
import styled from 'styled-components'

function Book({book, starCheck, handleImg, isRent, handleAdd, count, handlePlus, handleMinus, isWish, isRented, isReturn, isReview, handleReview}) {
  return (
    <StyledDiv key={book[1]}>
      <Wrapper>
        <ImgWrapper><StyledImg src={'/images/books/'+book[0]+'.jpg'} alt={book[0]} onClick={handleImg}/></ImgWrapper>
        <ContentWrapper>
          <TitleWrapper>{book[1]}</TitleWrapper>
          <DetailWrapper>저자: {book[2]}</DetailWrapper>
          <StarWrapper>
            {starCheck[book[0]][0] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
            {starCheck[book[0]][1] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
            {starCheck[book[0]][2] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
            {starCheck[book[0]][3] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
            {starCheck[book[0]][4] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
          </StarWrapper>
          {isRent && <DetailWrapper>대여가능 권수: {book[5] || 5}</DetailWrapper>}
          {isRent && <StyledButton value={book} onClick={handleAdd}>대여</StyledButton>}

          {isWish && <DetailWrapper>대여가능 권수: {book[4] || 5}</DetailWrapper>}
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
`;

const StarWrapper = styled.div`
  width: 100%;
`;

const StyledImg = styled.img`
  max-width: 100%;
`;
const StyledStar = styled.img`
  width: 10%;
`;
const StyledButton = styled.button`
  /* width: 20%; */
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #514fa1;
  color: #d1d1ef;
  font-size: 13px;
  font-weight: bold;
`;



