import axios from 'axios'
import React, {useEffect, useState} from 'react'

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
    <div onClick={onClick}>
      <img src={'/images/books/'+book.id+'.jpg'} alt={book.name} width="100px"/>
      <h1>제목: {book.name}</h1>
      <p>저자: {book.author}</p>
      <p>책 소개: {book.description}</p>
      <p>상세정보
        - 출판사: {book.publisher}
        - 출판일: {book.publicationDate}
        - 페이지수: {book.pages}
        - 구매링크: {book.link}
      </p>
    </div>
  )
}

export default Detail
