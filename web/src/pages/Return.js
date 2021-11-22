import axios from 'axios';
import React, {useEffect, useContext, useState} from 'react';
import { Context } from '../reducers';


function Return() {
  const [myBooks, setMyBooks] = useState([])
  const [bucket, setBucket] = useState({})
  const [count, setCount] = useState({})
  const [init, setInit] = useState(0)
  const [{sessionId}, ] = useContext(Context)
  console.log(bucket)
  const handleAdd = (e)=>{
    e.preventDefault();
    const [bookId, bookName, bookCount] = e.target.value.split(',');
    setBucket(cur=>{
      const newBucket = {...cur};
      newBucket[bookId] = [bookId, bookName, bookCount, 1]
      return newBucket
    })
  };
  const handlePlus = (e)=>{
    e.preventDefault();
    const [bookId, , bookCount, ] = e.target.value.split(',');
    if (count[bookId] < bookCount) {
      setCount(cur=>{
        const newCount = {...cur};
        newCount[bookId] += 1
        setBucket(cur=>{
          const newBucket = {...cur};
          newBucket[bookId][3] = newCount[bookId];
          return newBucket
        })
        return newCount
      })
    } else {
      alert(`최대 반납 가능 수량은 ${bookCount}권 입니다.`)
    }
  };
  const handleMinus = (e)=>{
    e.preventDefault();
    const [bookId, , , ] = e.target.value.split(',');
    if (count[bookId] > 1) {
      setCount(cur=>{
        const newCount = {...cur};
        newCount[bookId] -= 1
        setBucket(cur=>{
          const newBucket = {...cur};
          newBucket[bookId][3] = newCount[bookId];
          return newBucket
        })
        return newCount
      })
    } else {
      alert(`최소 반납 가능 수량은 1권 입니다.`)
    }
  };  
  const handleReturn = (e)=>{
    e.preventDefault();
    axios.post('/api/book/return', {sessionId, returnList: Object.values(bucket)}).then(res=>{
      if (res.data.result === "success") {
        setBucket({});
        setInit(cur=>cur+1);
      } else {console.log(res.data)}
    }).catch(console.log)
  };
  useEffect(() => {
    axios.post('/api/book/myBooks', {sessionId}).then(res=>{
      setMyBooks(res.data)
      setCount(cur=>{
        const newCount = {...cur};
        res.data.forEach(book=>{
          newCount[book[0]] = 1
        })
        return newCount
      })
    })
  }, [init])
  return (
    <div>
      <ol>
        <h1>반납할 책 목록</h1>
        {Object.values(bucket).map(book=>(
          <li key={book[0]+book[1]}>
            <p>{book[1]}</p>
            <img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/>
            <p>빌린수량: {book[2]}</p>
            <p>반납할 수량: {book[3]}</p>
            <button value={book} onClick={handlePlus}>+</button>
            <button value={book} onClick={handleMinus}>-</button>
          </li>
        ))}
        <button onClick={handleReturn}>반납하기</button>
      </ol>
      <ol>
        <h1>내가 빌린 책 목록</h1>
        {myBooks.map(book=>(
          <li key={book[0]}>
            <p>{book[1]}</p>
            <img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/>
            <p>빌린수량: {book[2]}</p>
            <button value={book} onClick={handleAdd}>반납 목록에 추가</button>
          </li>
        ))}
      </ol>
    </div>
  )
};

export default Return
