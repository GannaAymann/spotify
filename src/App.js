import { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Main from './components/Main'
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
function App() {
  const [{token},dispatch]=useStateProvider();
  useEffect(()=>{

      const hash = window.location.hash;    
      if(hash)
      {
        const token =hash.substring(1).split('&')[0].split('=')[1];
        dispatch({type:reducerCases.SET_TOKEN,token})
      }
  },[token,dispatch])

  return (
    <div className="App">
     
      {
         token? <Main/>:<Login/>
      }
      
      
      
    </div>
  );
}

export default App;
