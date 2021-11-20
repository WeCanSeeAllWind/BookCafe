import {useState} from 'react';
import axios from 'axios';

const url = '/api';

function App() {
  const [word, setWord] = useState();
  axios(url).then(res=>setWord(res.data))
  return (
    <div>
      <h2>Hello</h2>
      <h2>{word}</h2>
    </div>
  );
}

export default App;
