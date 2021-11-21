import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Context } from '../reducers';

function Main() {
  const [state, dispatch] = useContext(Context);
  const [books, setBooks] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    axios('/api/book/list').then(res=>{
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
  return (
    <div>
      <div>
        <button onClick={handleRental}>대여하기</button>
        <button onClick={handleMypage}>MyPage</button>
        {isLogin ? <button onClick={handleLogout}>Logout</button> : <button onClick={handleLogin}>Login</button>}
        {isLogin || <button onClick={handleRegister}>Register</button>}
      </div>
      <div>
        {books.map(book=>(<div key={book[1]}><h3>{book[1]}</h3><img src={'/images/books/'+book[0]+'.jpg'} alt={book[1]} width="100px"/></div>))}
      </div>
    </div>
  )
};

export default Main
