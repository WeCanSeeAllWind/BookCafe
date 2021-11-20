import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Main() {
  const [books, setBooks] = useState([]);
  useEffect(()=>{
    axios('/api/book/list').then(res=>setBooks(res.data));
  }, [])
  return (
    <div>
      {books.map(book=>(<div key={book[1]}><h3>{book[1]}</h3><img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/></div>))}
    </div>
  )
}

export default Main
