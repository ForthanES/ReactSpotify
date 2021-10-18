import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [code, setCode] = useState();

  useEffect(() => {
    let urlCode = new URLSearchParams(window.location.search).get('code');
    setCode(urlCode);
  }, []);

  return (
    <div className='App'>{code ? <Dashboard code={code} /> : <Login />}</div>
  );
};

export default App;
