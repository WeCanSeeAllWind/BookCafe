import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Context } from '../reducers';
import Detail from '../components/Detail';

function Main() {
  const [state, dispatch] = useContext(Context);
  const [books, setBooks] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [starCheck, setStarCheck] = useState({});
  const navigate = useNavigate();
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
      axios.post('/api/user/isLogin', {"session_id": state.sessionId}).then(res=>{
        if (res.data.result === "success"){
          setIsLogin(true);
        } else {console.log(res.data)}
      }).catch(console.log)
    });
  }, []);
  const handleRental = (e)=>{
    e.preventDefault();
    if (isLogin) {
      navigate('/rent');
    } else {
      alert('로그인 후 사용할 수 있는 서비스입니다.');
    }
  };
  const handleReturn = (e)=>{
    e.preventDefault();
    if (isLogin) {
      navigate('/return');
    } else {
      alert('로그인 후 사용할 수 있는 서비스입니다.');
    }
  };  
  const handleMypage = (e)=>{
    e.preventDefault();
    if (isLogin) {
      navigate('/mypage');
    } else {
      alert('로그인 후 사용할 수 있는 서비스입니다.');
    }
  };
  const handleLogin = (e)=>{
    e.preventDefault();
    navigate('/login');
  };
  const handleLogout = (e)=>{
    e.preventDefault();
    axios.post('/api/user/logout', {"session_id": state.sessionId}).then(res=>{
      dispatch({type: "session", payload: "elice"});
      setIsLogin(false);
    })
  };
  const handleRegister = (e)=>{
    e.preventDefault();
    navigate('/register');
  }
  const handleImg = (e)=>{
    e.preventDefault();
    setIsDetail(e.target.alt);
  }
  const handleDetail = (e)=>{
    e.preventDefault();
    setIsDetail(false);
  }
  return (
    <div>
      <div>
        <button onClick={handleRental}>대여하기</button>
        <button onClick={handleReturn}>반납하기</button>
        <button onClick={handleMypage}>MyPage</button>
        {isLogin ? <button onClick={handleLogout}>Logout</button> : <button onClick={handleLogin}>Login</button>}
        {isLogin || <button onClick={handleRegister}>Register</button>}
      </div>
      {isDetail && <Detail bookId={isDetail} onClick={handleDetail}/>}
      <div>
        {books.map(book=>(
          <div key={book[1]}>
            <h3>{book[1]}</h3>
            <img src={'/images/books/'+book[0]+'.jpg'} alt={book[0]} width="100px" onClick={handleImg}/>
            <div>
              {starCheck[book[0]][0] ? <img src={'/images/icons/star_fill.png'} alt="star_fill"/> : <img src={'/images/icons/star_empty.png'} alt="star_empty"/>}
              {starCheck[book[0]][1] ? <img src={'/images/icons/star_fill.png'} alt="star_fill"/> : <img src={'/images/icons/star_empty.png'} alt="star_empty"/>}
              {starCheck[book[0]][2] ? <img src={'/images/icons/star_fill.png'} alt="star_fill"/> : <img src={'/images/icons/star_empty.png'} alt="star_empty"/>}
              {starCheck[book[0]][3] ? <img src={'/images/icons/star_fill.png'} alt="star_fill"/> : <img src={'/images/icons/star_empty.png'} alt="star_empty"/>}
              {starCheck[book[0]][4] ? <img src={'/images/icons/star_fill.png'} alt="star_fill"/> : <img src={'/images/icons/star_empty.png'} alt="star_empty"/>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Main
