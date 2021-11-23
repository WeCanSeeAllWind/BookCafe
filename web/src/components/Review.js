import axios from 'axios';
import React, {useState, useRef, useContext} from 'react';
import { Context } from '../reducers';

function Review({book, onClick}) {
  const [isFilled, setIsFilled] = useState([0, false, false, false, false, false]);
  const [starScore, setStarScore] = useState(0);
  const reviewText = useRef();
  const [{sessionId}, ] = useContext(Context);
  const [bookId, bookName] = book;
  const handleStar = (e)=>{
    e.preventDefault();
    const newIsFilled = [false, false, false, false, false, false];
    for (let i=1; i <= Number(e.target.alt); i++) {newIsFilled[i] = true};
    setIsFilled(newIsFilled);
    setStarScore(Number(e.target.alt));
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('/api/review/new', {sessionId, bookId, starScore, reviewText: reviewText.current.value}).then(res=>{
      if (res.data.result === "change") {
        alert("리뷰는 1권당 하나씩만 작성이 가능합니다. 새로 작성하신 리뷰로 변경했습니다.")
      }
    }).catch(console.log);
  }
  return (
    <div>
      <h1>{bookName}이 마음에 드셨나요? 평점을 남겨주세요</h1>
      <div>
        {isFilled[1] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="1"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="1"/>}
        {isFilled[2] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="2"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="2"/>}
        {isFilled[3] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="3"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="3"/>}
        {isFilled[4] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="4"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="4"/>}
        {isFilled[5] ? <img src={'/images/icons/star_fill.png'} onClick={handleStar} alt="5"/> : <img src={'/images/icons/star_empty.png'} onClick={handleStar} alt="5"/>}
      </div>
      <input type="text" ref={reviewText} required/>
      <button onClick={handleSubmit}>리뷰 등록</button>
      <button onClick={onClick}>리뷰작성 나가기</button>
    </div>
  )
}

export default Review
