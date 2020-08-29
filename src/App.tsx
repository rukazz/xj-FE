import React, { useState, useEffect } from 'react';
import './App.css';
// import AxiosCancel from './components/AxiosCancel.js';
// import FetchCancel from './components/FetchCancel.js';
// import CancelToken from './components/Test2.js';
// import cls from 'classnames';
import { BaseLayout } from './components/BaseLayout';
import { ThemeProvider } from './hooks/useTheme';

function App() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMounted(false);
    }, 500);
  }, []);

  return (
    <div className="App">
      <ThemeProvider>
        <BaseLayout />
      </ThemeProvider>
      {/* {mounted && ( */}
      {/* <> * /}
      {/* <AxiosCancel url="https://reqres.in/api/users/2?delay=2" /> */}
      {/* <p>{test}</p>
                <hr /> */}
      {/* <FetchCancel url="https://reqres.in/api/users/3?delay=2" /> */}
    </div>
  );
}

export default App;
