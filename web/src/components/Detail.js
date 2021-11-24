import axios from 'axios'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Nav from './Nav'

function Detail({bookId, onClick}) {
  const [book, setBook] = useState({})
  useEffect(()=>{
    axios.post('/api/book/detail', {bookId}).then(res=>{
      const [id, name, publisher, author, publicationDate, pages, , description, link, ] = res.data
      const newBook = {id, name, publisher, author, publicationDate, pages, description, link}
      setBook(newBook)
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
          <ConDetail>
            <StyledHr/>
            <p>저자: {book.author}</p>
            <p>출판사: {book.publisher}</p>
            <p>출판일: {book.publicationDate}</p>
            <p>페이지수: {book.pages} pages</p>
          </ConDetail>
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
const ConDetail = styled.div`
  margin-top: auto;
  margin-bottom: 30px;
  p {
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
  margin-bottom: 20px ;
`;