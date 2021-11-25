import React, {useState, useEffect, useContext} from 'react';
import { Context } from '../reducers';
import Detail from '../components/Detail';
import Nav from '../components/Nav';
import axios from 'axios';
import Book from '../components/Book';
import styled from 'styled-components';

function Main() {
  const [, dispatch] = useContext(Context);
  const [books, setBooks] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [starCheck, setStarCheck] = useState({});
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
      setBooks(res.data);
      axios('/api/user/isLogin').then(res=>{
        if (res.data.result === "success"){
          dispatch({type:"isLogin", payload: true})
        } else {
          console.log(res.data)
          dispatch({type:"isLogin", payload: false})
        }
      }).catch(console.log)
    });
  }, []);

  const handleImg = (e)=>{
    e.preventDefault();
    setIsDetail(e.target.alt);
  }
  const handleDetail = (e)=>{
    e.preventDefault();
    setIsDetail(false);
  }
  return (
    <StyledDiv>
      <Nav/>
      {isDetail && <Detail bookId={isDetail} onClick={handleDetail}/>}
      <StyledBookWrapper>
        {books.map(book=><Book book={book} starCheck={starCheck} handleImg={handleImg}/>)}
      </StyledBookWrapper>
    </StyledDiv>
  )
};

export default Main

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledBookWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 30px;
  padding: 30px;
`;
