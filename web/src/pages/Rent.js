import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Rent() {
  const [books, setBooks] = useState([]);
  const [bucket, setBucket] = useState({});
  const handleAdd = (e)=>{
    e.preventDefault();
    setBucket(cur=>{
      const newBucket = {...cur, [e.target.name]: [e.target.name , e.target.title]};
      return newBucket
    })
    console.log(bucket);
  }
  const handleMinus = (e)=>{
    e.preventDefault();
  }
  const handlePlus = (e)=>{
    e.preventDefault();
  }
  const handleRent = (e)=>{
    e.preventDefault();
    axios.post('/api/book/rent', {rentList: Object.keys(bucket)}).then(res=>{
      if (res.data.result === 'success') {
        setBucket({});
      } else {
        console.log(res.data);
      }
    }).catch(console.log);
  }
  useEffect(()=>{
    axios('/api/book/list').then(res=>setBooks(res.data));
  }, [])
  return (
    <div>
      <ol>
        <h2>대여희망목록</h2>
        {Object.values(bucket).map(book=>(
          <li>
            <h3>{book[1]}</h3>
            <img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/>
            <button onClick={handleMinus}>-</button>
            <button onClick={handlePlus}>+</button></li>
        ))}
        <button onClick={handleRent}>대여신청</button>
      </ol>
      <ol>
        <h2>도서목록</h2>
        {books.map(book=>(
          <li>
            <h3>{book[1]}</h3>
            <img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/>
            <button title={book[1]} name={book[0]} onClick={handleAdd}>추가</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Rent
