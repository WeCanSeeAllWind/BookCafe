import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Nav from '../components/Nav';
import styled from 'styled-components';
import Book from '../components/Book';
import Detail from '../components/Detail';


function Return() {
  const [myBooks, setMyBooks] = useState([])
  const [bucket, setBucket] = useState({})
  const [count, setCount] = useState({})
  const [init, setInit] = useState(0)
  const [starCheck, setStarCheck] = useState({});
  const [isDetail, setIsDetail] = useState(false);
  const handleAdd = (e)=>{
    e.preventDefault();
    const [bookId, bookName, bookAuthor, bookCount] = e.target.value.split(',');
    setBucket(cur=>{
      const newBucket = {...cur};
      newBucket[bookId] = [bookId, bookName, bookAuthor, bookCount, 1]
      return newBucket
    })
  };
  const handleImg = (e)=>{
    e.preventDefault();
    setIsDetail(e.target.alt);
  }
  const handleDetail = (e)=>{
    e.preventDefault();
    setIsDetail(false);
  }
  const handlePlus = (e)=>{
    e.preventDefault();
    const [bookId, , ,bookCount, ] = e.target.value.split(',');
    if (count[bookId] < bookCount) {
      setCount(cur=>{
        const newCount = {...cur};
        newCount[bookId] += 1
        setBucket(cur=>{
          const newBucket = {...cur};
          newBucket[bookId][4] = newCount[bookId];
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
    axios.post('/api/book/return', {returnList: Object.values(bucket)}).then(res=>{
      if (res.data.result === "success") {
        console.log(res.data)
        setBucket({});
        setMyBooks([])
        setInit(cur=>cur+1);
      } else {console.log(res.data)}
    }).catch(console.log)
  };
  useEffect(() => {
    axios.post('/api/book/myBooks', {isRead: false}).then(res=>{
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
      setCount(cur=>{
        const newCount = {...cur};
        res.data.forEach(book=>{
          newCount[book[0]] = 1
        })
        return newCount
      })
      setMyBooks(res.data);
    })
  }, [init])
return (
  <StyledDiv>
    <Nav/>
    {isDetail && <Detail bookId={isDetail} onClick={handleDetail}/>}
    <StyledContainer>
      <StyledTwins>
        <h2>내가 빌린 책 목 록</h2>
        <StyledHr/>
        <BookList>
          {myBooks.map(book=><Book book={book} starCheck={starCheck} handleImg={handleImg} isRented={true} handleAdd={handleAdd}/>)}
        </BookList>
      </StyledTwins>
      <StyledTwins>
        <h2>대 여 희 망</h2>
        <StyledHr/>
        <WishList>
          {Object.values(bucket).map(book=>(
            <Book book={book} starCheck={starCheck} handleImg={handleImg} isReturn={true} handlePlus={handlePlus} handleMinus={handleMinus} count={count}/>
          ))}
        </WishList>
        <StyledButton onClick={handleReturn}>반납하기</StyledButton>
      </StyledTwins>
    </StyledContainer>
  </StyledDiv>
)
}

export default Return

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