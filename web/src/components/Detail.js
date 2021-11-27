import axios from 'axios'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Nav from './Nav'
import Stars from './Stars'

function Detail({bookId, onClick}) {
  const [book, setBook] = useState({})
  const [init, setInit] = useState(1);
  const starCheckMaker = (starScore)=>{
    const starCheck = {}
    starCheck[bookId] = [false, false, false, false, false]
    for (let i=0; i < starScore; i++) { starCheck[bookId][i] = true }
    return starCheck
  }
  useEffect(()=>{
    axios.post('/api/book/detail', {bookId}).then(res=>{
      const [id, name, publisher, author, publicationDate, pages, , description, link, ] = res.data[0];
      const reviews = res.data[2];
      const starScore = res.data[1] || 0
      console.log(res.data);
      const starCheck = starCheckMaker(starScore)
      const newBook = {id, name, publisher, author, publicationDate, pages, description, link, starScore, reviews, starCheck}
      setBook(newBook);
      setInit(0);
    })
  }, [])
  return (
    <StyledDiv>
      <Nav/>
      <ContentWrapper onClick={onClick}>
        <FormWapper>
          <StyledTitle>{book.name}</StyledTitle>
          <StyledHr/>
          <ConWrapper>
            <img src={'/images/books/'+book.id+'.jpg'} alt={book.name} width="200px"/>
            <p>{book.description}</p>
          </ConWrapper>
          <StyledHr/>
          <ReviewWrapper>
            <div className="columns">
              <div className="name">이름</div>
              <div className="content">내용</div>
              <div className="star">평점</div>
            </div>
            <div className="reviews">
              {init===0 && book.reviews.map(review=>(
                <div>
                  <div className="name">{review[0]}</div>
                  <div className="content">{review[1]}</div>
                  <div className="star">{<Stars bookId={bookId} starCheck={starCheckMaker(review[2])}/>}</div>
                </div>
              ))}
            </div>
          </ReviewWrapper>
          <StyledHr/>
          <DetailWrapper>
            <ConDetail>
              <p>저자: {book.author}</p>
              <p>페이지수: {book.pages} pages</p>
              <p>출판사: {book.publisher}</p>
              <p>출판일: {book.publicationDate}</p>
            </ConDetail>
            <StarWrapper>
              {init===0 && <Stars bookId={book.id} starCheck={book.starCheck}/>}
            </StarWrapper>
          </DetailWrapper>
          <StyledLink onClick={()=>{window.open(`${book.link}`, '_blank')}}>구매링크</StyledLink>
        </FormWapper>
      </ContentWrapper>
    </StyledDiv>
  )
}

export default Detail

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
    height: 300px;
    overflow: auto;
  }
`;

const ReviewWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: 200px;
  width: 100%;
  overflow: hidden;
  .columns {
      border-bottom: 1px dotted #dadaf9;
      font-weight: bold;
    }
  .reviews {
    overflow: auto;
  }
  .reviews div, .columns {
    height: 30px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    
    div {
      display: block;
      text-align: center;
      width: 100%;
      margin-top: 5px;
    }
    .content {
      border-right: solid 1px #dadaf9;
      border-left: solid 1px #dadaf9;
      overflow: auto;
    }
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
  margin-top: 20px;
  margin-bottom: 40px;
  color: #514fa1;
  font-size: 25px;
  font-weight: bold;
`;
const ConWrapper = styled.div`
  display: flex;
  margin: 30px 0;
`;

const DetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-top: 20px;
`;

const StarWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  div {
    margin-top: 10px;
    text-align: center;
    img {
      width: 15%;
    }
  }
`;

const ConDetail = styled.div`
  margin-top: auto;
  height: 50px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  p {
    height: 25px;
    font-size: 16px;
    font-weight: 600;
    color: gray;
  }
`;
const StyledLink = styled.button`
  margin-left: auto;
  margin-right: auto;
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
  margin-bottom: 5px ;
`;