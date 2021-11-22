import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../reducers';
import {useNavigate} from 'react-router-dom';

function Rent() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [bucket, setBucket] = useState({});
  const [count, setCount] = useState([0]);
  const [init, setInit] = useState(0);
  const [state, ] = useContext(Context)
  const handleAdd = (e)=>{
    e.preventDefault();
    setBucket(cur=>{
      const newBucket = {...cur, [e.target.name]: [e.target.name, e.target.title, e.target.value, 1]};
      return newBucket
    })
    console.log(bucket);
  }
  const handleMinus = (e)=>{
    e.preventDefault();
    const bookId = e.target.name
    if (count[bookId] > 1) {
      setCount(cur=>{
        const newCount = [...cur]
        newCount[bookId] -= 1
        setBucket(cur=>{
          const newBucket = {...cur}
          newBucket[bookId][3] = newCount[bookId]
          return newBucket
        });
        return newCount
      });
    } else {
      alert(`최소 대여가능 수량은 1권 입니다.`)
    }
  }
  const handlePlus = (e)=>{
    e.preventDefault();
    const possibleCount = e.target.value || 5;
    const bookId = e.target.name;
    if (count[bookId] < possibleCount) {
      setCount(cur=>{
        const newCount = [...cur]
        newCount[bookId] += 1
        setBucket(cur=>{
          const newBucket = {...cur}
          newBucket[bookId][3] = newCount[bookId]
          return newBucket
        });
        return newCount
      });
    } else {
      alert(`최대 대여가능 수량은 ${possibleCount}권 입니다.`)
    }
  }
  const handleRent = (e)=>{
    e.preventDefault();
    axios.post('/api/book/rent', {rentList: Object.values(bucket), sessionId: state.sessionId}).then(res=>{
      if (res.data.result === 'success') {
        setBucket({});
        setInit(cur=>cur+1)
      } else {
        console.log(res.data);
      }
    }).catch(console.log);
  }
  const handleTemp = (e)=>{
    e.preventDefault();
    navigate('/');
  }
  useEffect(()=>{
    axios('/api/book/list').then(res=>{
      setBooks(res.data)
      setCount(cur=>{
        const newCount = [...cur]
        for (let i=0; i<res.data.length; i++) {
          newCount.push(1)
        }
        return newCount
      })
    });
  }, [init])
  return (
    <div>
      <ol>
        <h2 onClick={handleTemp}>대여희망목록</h2>
        {Object.values(bucket).map(book=>(
          <li key={book[0]+book[1]}>
            <h3>{book[1]}</h3>
            <img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/>
            <p>대여가능 권수: {book[2] || 5}</p>
            <p>대여희망 권수: {count[book[0]]}</p>
            <button name={book[0]} value={book[2]} onClick={handleMinus}>-</button>
            <button name={book[0]} value={book[2]} onClick={handlePlus}>+</button></li>
        ))}
        <button onClick={handleRent}>대여신청</button>
      </ol>
      <ol>
        <h2>도서목록</h2>
        {books.map(book=>(
          <li key={book[1]}>
            <h3>{book[1]}</h3>
            <img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/>
            <p>대여가능 권수: {book[5] || 5}</p>
            <button title={book[1]} name={book[0]} value={book[5]} onClick={handleAdd}>추가</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Rent
