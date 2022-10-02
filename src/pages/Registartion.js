import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from '../store/userStore';
import useQuoteStore from '../store/quoteStore';
import useLoadingManagerStore from '../store/loadingManagerStore';

const Registration = () => {
    const { register, isUserLoggedIn } = useUserStore();
    const { quote, author, getQuote } = useQuoteStore();
    const { registerLoading, setRegisterLoading } = useLoadingManagerStore();
    const navigate = useNavigate();

    useEffect(() => {
        getQuote();
        if (isUserLoggedIn) {
            navigate('/home');
        }
    }, [isUserLoggedIn, getQuote, navigate]);

    const initialValues = {
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validateUserData = (name, email, mobile, password, confirmPassword) => {
        if (name === '' || email === '' || mobile === '' || password === '' || confirmPassword === '') {
            toast.error('All fields are mandatory!');
            return false;
        } else {
            if (email) {
                var re = /\S+@\S+\.\S+/;
                if (!re.test(email)) {
                    toast.error('Invalid email address!');
                    return false;
                }
            }
            if (!mobile.match(/^\d{10}$/)) {
                toast.error('Invalid mobile number!');
                return false;
            }
            if (password !== confirmPassword) {
                toast.error("Passwords don't match!");
                return false;
            }
            if (password.length < 7) {
                toast.error('Password should be atleast 7 characters long!');
                return false;
            }
            return true;
        }
    }

    const registerUser = (e) => {
        e.preventDefault();
        console.log(values);
        if (validateUserData(values.name, values.email, values.mobile, values.password, values.confirmPassword)) {
            setRegisterLoading(true);
            register(values.name, values.email, values.mobile, values.password).then(() => {
                setRegisterLoading(false);
                if (!isUserLoggedIn) {
                    toast.error('User already exists!');
                } else {
                    setValues(initialValues);
                }
            });
        }
    };

    return (
        <MainWrapper>
            <DesignWrapper>
                <h1>Omnimemor</h1>
                <h2>{quote}</h2>
                <h3>-{author}</h3>
            </DesignWrapper>
            <InputWrapper>
                <InnerBox>
                    <FormWrapper>
                        <FormInput
                            value={values.name}
                            onChange={handleInputChange}
                            type='text'
                            name='name'
                            placeholder='Full Name'
                        />
                        <FormInput
                            value={values.email}
                            onChange={handleInputChange}
                            type='email'
                            name='email'
                            placeholder='Email'
                        />
                        <FormInput
                            value={values.mobile}
                            onChange={handleInputChange}
                            type='tel'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            name='mobile'
                            placeholder='Mobile'
                        />
                        <FormInput
                            value={values.password}
                            onChange={handleInputChange}
                            type='password'
                            name='password'
                            placeholder='Password'
                        />
                        <FormInput
                            value={values.confirmPassword}
                            onChange={handleInputChange}
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                        />
                        <LoadingAnimation>
                            {registerLoading && <ReactLoading type='bars' color='#fff' height={50} width={50} />}
                        </LoadingAnimation>
                        {!registerLoading && <button onClick={registerUser} type='submit'>Register</button>}
                    </FormWrapper>
                </InnerBox>
            </InputWrapper>
            <ToastContainer theme="dark" />
        </MainWrapper>
    );
};

const MainWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background-image: url('https://images.unsplash.com/photo-1547756536-cde3673fa2e5?ixlib=rb-1.2.1&dl=b-k-HAl6CKxM3xU-unsplash.jpg');
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
    margin-top: 34%;
    margin-left: 12rem;
    color: #cac9b9;
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

export default Registration;
