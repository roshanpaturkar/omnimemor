import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
//Global Style
import GlobalStyle from "./GlobalStyle";
// Pages
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import Registration from './pages/Registartion';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import HomePage from './pages/HomePage';
import useUserStore from './store/userStore';

function App() {
  const location = useLocation();
  const { checkUserToken } = useUserStore();
  useEffect(() => {
    checkUserToken();
  }, [checkUserToken]);

  return (
    <div className='App'>
      <GlobalStyle />
      <Routes location={location} key={location.pathname}>
        <Route path='/' caseSensitive={true} element={<LoadingPage />} />
        <Route path='/login' caseSensitive={true} element={<LoginPage />} />
        <Route path='/register' caseSensitive={true} element={<Registration />} />
        <Route path='/forget-password' caseSensitive={true} element={<ForgetPasswordPage />} />
        <Route path='/home' caseSensitive={true} element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
