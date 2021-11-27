import React, {useState, useEffect, useContext, useRef} from 'react';
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [starCheck, setStarCheck] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const slider = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  useEffect(()=>{
    axios.post('/api/book/main', {page}).then(res=>{
      console.log(res.data)
      const newStarCheck = {}
      res.data[0].forEach(book=>{
        newStarCheck[book[0]] = [false, false, false, false, false]
        const starScore = book[6] || 0
        for (let i=0; i < starScore; i++) {
          newStarCheck[book[0]][i] = true;
        }
      })
      setTotalPages(Math.ceil(res.data[1] / 8))
      setStarCheck(newStarCheck)
      setBooks(res.data[0]);
      axios('/api/user/isLogin').then(res=>{
        if (res.data.result === "success"){
          dispatch({type:"isLogin", payload: true})
        } else {
          console.log(res.data)
          dispatch({type:"isLogin", payload: false})
        }
      }).catch(console.log)
      setCurrentSlide(0);
      setInterval(() => {
        setCurrentSlide(cur=>{
          if (cur > 6) {return 0} else {
            return cur + 1
          }
        })
      }, 4000);
    });
  }, [page]);

  useEffect(() => {
    if (books.length !== 0) {
      slider[currentSlide].current.style.transition = "all 0.5s ease-in-out";
      slider[currentSlide].current.style.transform = `translateY(-${currentSlide}00%)`;
    }
  }, [currentSlide]);

  const handleImg = (e)=>{
    e.preventDefault();
    setIsDetail(e.target.alt);
  }
  const handleDetail = (e)=>{
    e.preventDefault();
    setIsDetail(false);
  }
  const handleLeft = (e)=>{
    e.preventDefault();
    if (page > 1) {setBooks([]); setPage(cur=>cur-1);}
  }
  const handleRight = (e)=>{
    e.preventDefault();
    if (page < totalPages) {setBooks([]); setPage(cur=>cur+1);};
  }
  return (
    <StyledDiv>
      <Nav/>
      {isDetail && <Detail bookId={isDetail} onClick={handleDetail}/>}
      <Container>
        <Slider><div>{books.map((book, i)=>(<div className=".slider" ref={slider[i]}><StyledImg  src={'/images/books/'+book[0]+'.jpg'} alt={i} onClick={handleImg}/></div>))}</div></Slider>
        <ButtonWrapper>
          <Button onClick={handleLeft}><div className="left"></div></Button>
          <StyledBookWrapper>
            {books.map(book=><Book book={book} starCheck={starCheck} handleImg={handleImg}/>)}
          </StyledBookWrapper>
          <Button onClick={handleRight}><div className="right"></div></Button>
        </ButtonWrapper>
      </Container>
    </StyledDiv>
  )
};

export default Main

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
`;
const Container = styled.div`
  max-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto;
`;
const ButtonWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: grid;
  grid-template-columns: 50px auto 50px;
  box-sizing: border-box;
`;
const StyledBookWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
  box-sizing: border-box;
`;
const Slider = styled.div`
  height: 425px;
  background-color: #ededfe;
  display: flex;
  margin-bottom: 10px;
  div {
    position: relative;
    width: 30%;
    height: 100%;
    margin: auto;
    box-sizing: border-box;
    overflow: hidden;
    float: left;
    text-align: center;
    div {
      width: 100%;
      overflow: auto;
      margin: auto;
      background-color: white;
      border-radius: 20px;
    }
  }
`;
const StyledImg = styled.img`
  height: 100%;
`;

const Button = styled.button`
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  box-sizing: border-box;
  .left {
    margin: auto;
    width: 20px;
    height: 20px;
    border-bottom: 3px solid black;
    border-left: 3px solid black;
    transform: rotate(45deg);
  }
  .right {
    margin: auto;
    width: 20px;
    height: 20px;
    border-top: 3px solid black;
    border-right: 3px solid black;
    transform: rotate(45deg);
  }
`;


