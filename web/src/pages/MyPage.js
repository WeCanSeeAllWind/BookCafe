import axios from 'axios'
import React, {useEffect, useContext, useState} from 'react'
import { Context } from '../reducers';
import Review from '../components/Review';
import Nav from '../components/Nav';
import styled from 'styled-components';
import Book from '../components/Book';
import Detail from '../components/Detail';


function MyPage() {
  const [{sessionId}, ] = useContext(Context);
  const [onReview, setOnReview] = useState(false);
  const [focusBook, setFocusBook] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [starCheck, setStarCheck] = useState({});
  const [isDetail, setIsDetail] = useState(false);
  const [init, setInit] = useState(0);
  const handleReview = (e)=>{
    e.preventDefault();
    const [bookId, bookName, ] = e.target.value.split(',');
    const newFocusBook = [bookId, bookName];
    setFocusBook(newFocusBook);
    setOnReview(true);
  }
  const handleImg = (e)=>{
    e.preventDefault();
    setIsDetail(e.target.alt);
  }
  const handleDetail = (e)=>{
    e.preventDefault();
    setIsDetail(false);
  }
  const handleReviewOut = (e)=>{
    e.preventDefault();
    setFocusBook([]);
    setOnReview(false);
    setInit(cur=>cur+1)
  }
  useEffect(() => {
    axios.post('/api/book/myBooks', {sessionId, isRead: true}).then(res=>{
      const newStarCheck = {}
      res.data.forEach(book=>{
        console.log(book)
        newStarCheck[book[0]] = [false, false, false, false, false]
        const starScore = book[4] || 0
        for (let i=0; i < starScore; i++) {
          newStarCheck[book[0]][i] = true;
        }
      })
      setStarCheck(newStarCheck);
      setMyBooks(res.data)})
  }, [init])
  return (
    <StyledDiv>
      <Nav/>
      {isDetail && <Detail bookId={isDetail} onClick={handleDetail}/>}
      {onReview && <Review book={focusBook} onClick={handleReviewOut}/>}
      <StyledContainer>
        <StyledTwins>
          <h2>내가 읽은 책 목 록</h2>
          <StyledHr/>
          <BookList>
            {myBooks.map(book=><Book book={book} starCheck={starCheck} handleReview={handleReview} isReview={true} handleImg={handleImg}/>)}
          </BookList>
        </StyledTwins>
      </StyledContainer>
    </StyledDiv>
  )
}

export default MyPage

const StyledDiv = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: max-content;
`;

const StyledContainer = styled.div`
  max-height: max-content;
  display: grid;
  background-color: #dadaf9;
  padding: 15px;
  overflow: hidden;
`;


const StyledTwins = styled.div`
  max-height: max-content;
  overflow: hidden;
  position: relative;
  background-color: #ededfe;
  border-radius: 15px;
  padding: 10px;
  text-align: center;
`;

const StyledHr = styled.hr`
  border-color: #dadaf9;
`;

const BookList = styled.div`
  max-height: 84%;
  overflow: auto;
  display: grid;
  padding: 30px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 30px;
  overflow: auto;
`;