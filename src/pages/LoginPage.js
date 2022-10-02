import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import goldenSnitch from '../assets/images/goldensnitch.png';
import useUserStore from '../store/userStore';
import useQuoteStore from '../store/quoteStore';
import useLoadingManagerStore from '../store/loadingManagerStore';

const LoginPage = () => {
  const { login, isUserLoggedIn } = useUserStore();
  const { quote, author, getQuote } = useQuoteStore();
  const { loginLoading, setLoginLoading } = useLoadingManagerStore();
  const navigate = useNavigate();

  useEffect(() => {
    getQuote();
    if (isUserLoggedIn) {
      navigate('/home');
    }
  }, [isUserLoggedIn, getQuote, navigate]);

  const initialValues = {
    username: '',
    password: '',
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    login(values.username, values.password).then(() => {
      setValues(initialValues);
      setLoginLoading(false);
      navigate('/home');
    });
  };

  return (
    <MainWrapper>
      <DesignWrapper>
        <h1>Omnimemor</h1>
        <img src={goldenSnitch} alt="Golden Snitch" />
        <h2>{quote}</h2>
        <h3>-{author}</h3>
      </DesignWrapper>
      <InputWrapper>
        <InnerBox>
          <FormWrapper>
            <FormInput
              value={values.username}
              onChange={handleInputChange}
              type='text'
              name='username'
              placeholder='Email'
            />
            <FormInput
              value={values.password}
              onChange={handleInputChange}
              type='password'
              name='password'
              placeholder='Password'
            />
            <LoadingAnimation>
              {loginLoading && <ReactLoading type='bars' color='#fff' height={50} width={50} />}
            </LoadingAnimation>
            {!loginLoading && <button onClick={loginUser} type='submit'>Login</button>}
          </FormWrapper>
          
          <p><a href='/forget-password'>Forget Password</a></p>
          <p>
            Don't have an account? <a href='/register'>Register</a>
          </p>
        </InnerBox>
      </InputWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background-image: url('https://cdna.artstation.com/p/assets/images/images/032/123/348/4k/jerome-comentale-hogwarts.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const DesignWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  img {
    width: 500px;
    margin-left: 16rem;
  };
  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #fff;
    padding: 3rem;
  };
  h2 {
    font-size: 2rem;
    margin-left: 12rem;
    color: #B1B09B;
  };
  h3 {
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-left: 12rem;
    color: #FFFFFF;
  }
`;

const InputWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerBox = styled.div`
  padding: 40px 50px;
  background: #B1B09B;
  justify-content: center;
  align-content: center;
  border-radius: 8px;

  a {
    text-decoration: none;
  };

  p {
    text-align: center;
    margin-top: 1rem;
    color: black;
  };
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  button {
    padding: 8px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: large;
    font-weight: bold;
    color: #fff;
    background: #32332C;
  };
`;

const FormInput = styled.input`
  padding: 8px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: larger;
`;

const LoadingAnimation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export default LoginPage;
