import React,{ useState, useEffect} from 'react';
import './App.css';
import AxiosCancel from './components/AxiosCancel.js'
import FetchCancel from "./components/FetchCancel.js";

function App() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMounted(false);
    }, 10000);
  }, [])

  return (
    <div className="App">
     {mounted && (
        <>
          <AxiosCancel url="https://reqres.in/api/users/2?delay=2" />
          <hr />
          {/* <FetchCancel url="https://reqres.in/api/users/3?delay=2" /> */}
          <hr />
        </>
      )}
    </div>
  );
}

export default App;
