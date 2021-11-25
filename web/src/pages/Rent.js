import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Book from '../components/Book';
import Detail from '../components/Detail';
import styled from 'styled-components';

function Rent() {
  const [books, setBooks] = useState([]);
  const [bucket, setBucket] = useState({});
  const [count, setCount] = useState([0]);
  const [init, setInit] = useState(0);
  const [starCheck, setStarCheck] = useState({});
  const [isDetail, setIsDetail] = useState(false);
  const handleAdd = (e)=>{
    e.preventDefault();
    const [id, name, author, countTotal, countRent, countCurrent, review_avg] = e.target.value.split(',')
    setBucket(cur=>{
      const newBucket = {...cur, [id]: [id, name, author, 1, countCurrent]};
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
    axios.post('/api/book/rent', {rentList: Object.values(bucket)}).then(res=>{
      if (res.data.result === 'success') {
        setBucket({});
        setInit(cur=>cur+1)
      } else {
        console.log(res.data);
      }
    }).catch(console.log);
  }
  const handleImg = (e)=>{
    e.preventDefault();
    setIsDetail(e.target.alt);
  }
  const handleDetail = (e)=>{
    e.preventDefault();
    setIsDetail(false);
  }
  useEffect(()=>{
    axios('/api/book/list').then(res=>{
      const newStarCheck = {}
      res.data.forEach(book=>{
        newStarCheck[book[0]] = [false, false, false, false, false]
        const starScore = book[6] || 0
        for (let i=0; i < starScore; i++) {
          newStarCheck[book[0]][i] = true;
        }
      })
      setStarCheck(newStarCheck)
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
    <StyledDiv>
      <Nav/>
      {isDetail && <Detail bookId={isDetail} onClick={handleDetail}/>}
      <StyledContainer>
        <StyledTwins>
          <h2>도 서 목 록</h2>
          <StyledHr/>
          <BookList>
            {books.map(book=><Book book={book} starCheck={starCheck} handleImg={handleImg} isRent={true} handleAdd={handleAdd}/>)}
          </BookList>
        </StyledTwins>
        <StyledTwins>
          <h2>대 여 희 망</h2>
          <StyledHr/>
          <WishList>
            {Object.values(bucket).map(book=>(
              <Book book={book} starCheck={starCheck} handleImg={handleImg} isWish={true} handlePlus={handlePlus} handleMinus={handleMinus} count={count}/>
            ))}
          </WishList>
          <StyledButton onClick={handleRent}>대여신청</StyledButton>
        </StyledTwins>
      </StyledContainer>
    </StyledDiv>
  )
}

export default Rent

const StyledDiv = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: max-content;
`;

const StyledContainer = styled.div`
  max-height: max-content;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
  background-color: #dadaf9;
  padding: 15px;
  overflow: auto;
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

const StyledButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 50%;
  /* margin: auto; */
  border-radius: 10px;
  width: 250px;
  height: 50px;
  background-color: #514fa1;
  color: #d1d1ef;
  font-size: 15px;
  font-weight: bold;
  transform: translate(50%);
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

const WishList = styled.div`
  max-height: 84%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  padding: 30px;
  overflow: auto;
`;