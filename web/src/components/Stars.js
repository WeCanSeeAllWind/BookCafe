import React from 'react'
import styled from 'styled-components'

function Stars({starCheck, bookId}) {
  return (
    <StarWrapper>
      {starCheck[bookId][0] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
      {starCheck[bookId][1] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
      {starCheck[bookId][2] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
      {starCheck[bookId][3] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
      {starCheck[bookId][4] ? <StyledStar src={'/images/icons/star_fill.png'} alt="star_fill"/> : <StyledStar src={'/images/icons/star_empty.png'} alt="star_empty"/>}
    </StarWrapper>
  )
}

export default Stars

const StarWrapper = styled.div`
  width: 100%;
`;

const StyledStar = styled.img`
  width: 10%;
`;