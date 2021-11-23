import axios from 'axios'
import React, {useEffect, useContext, useState} from 'react'
import { Context } from '../reducers';
import Review from '../components/Review';
import {useNavigate} from 'react-router-dom';


function MyPage() {
  const [{sessionId}, ] = useContext(Context);
  const [onReview, setOnReview] = useState(false);
  const [focusBook, setFocusBook] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const navigate = useNavigate()
  const handleReview = (e)=>{
    e.preventDefault();
    const [bookId, bookName, ] = e.target.value.split(',');
    const newFocusBook = [bookId, bookName];
    setFocusBook(newFocusBook);
    setOnReview(true);
  }
  const handleReviewOut = (e)=>{
    e.preventDefault();
    setFocusBook([]);
    setOnReview(false);
  }
  useEffect(() => {
    axios.post('/api/book/myBooks', {sessionId, isRead: true}).then(res=>{setMyBooks(res.data)})
  }, [])
  return (
    <div>
      {onReview && <Review book={focusBook} onClick={handleReviewOut}/>}
      <h1 onClick={()=>{navigate('/')}}>내가 읽은 책 목록</h1>
        {myBooks.map(book=>(
          <li key={book[0]}>
            <p>{book[1]}</p>
            <img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/>
            <button value={book} onClick={handleReview}>리뷰 남기기</button>
          </li>
        ))}
    </div>
  )
}

export default MyPage
