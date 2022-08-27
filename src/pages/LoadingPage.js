import { useEffect } from 'react';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import loadingImage from '../assets/images/loading.jpg';

const LoadingPage = () => {
  const navigate = useNavigate();
  const { userToken, getUserDetails } = useUserStore();
  useEffect(() => {
    if (userToken) {
      getUserDetails().then(() => {
        navigate('/home');
      });
    } else {
      navigate('/login');
    }
  }, [userToken, getUserDetails, navigate]);
  return (
    <MainWrapper>
      <ReactLoading type='bars' color='#fff' height={250} width={250} />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${loadingImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default LoadingPage;
