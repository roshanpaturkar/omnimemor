import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useOtpManagerStore from '../store/otpManagerStore';
import useLoadingManagerStore from '../store/loadingManagerStore';

const ForgetPasswordPage = () => {
    const { isOtpSent, isOtpVerified, isPasswordReset, error, setError, sendOtp, verifyOtp, resetPassword, resetOtpManagerState } = useOtpManagerStore();
    const { loginLoading, setLoginLoading } = useLoadingManagerStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (isPasswordReset) {
            toast.success('Password reset successful!');
            navigate('/login');
            resetOtpManagerState()
        }
    }, [error, isPasswordReset, navigate, resetOtpManagerState]);

    const initialValues = {
        email: '',
        otp: '',
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

    const submitData = (e) => {
        e.preventDefault();
        setLoginLoading(true);
        if (!isOtpSent && !isOtpVerified && !isPasswordReset) {
            if (values.email === '') {
                toast.error('Email is mandatory!');
                setLoginLoading(false);
            } else {
                sendOtp(values.email).then(() => {
                    console.log(error);
                    setLoginLoading(false);
                    setError(null);
                });
            }
        } else if (isOtpSent && !isOtpVerified && !isPasswordReset) {
            if (values.otp === '') {
                toast.error('OTP is mandatory!');
                setLoginLoading(false);
            } else {
                verifyOtp(values.email, values.otp).then(() => {
                    setLoginLoading(false);
                    setError(null);
                });
            }
        } else if (isOtpSent && isOtpVerified && !isPasswordReset) {
            if (values.password === '') {
                toast.error('Password cannot be empty!');
                setLoginLoading(false);
            } else if (values.password.length < 7) {
                toast.error('Password must be atleast 7 characters long!');
                setLoginLoading(false);
            } else {
                resetPassword(values.email, values.password).then(() => {
                    setValues(initialValues);
                    setLoginLoading(false);
                });
            }
        }
    };

    return (
        <MainWrapper>
            <InputWrapper>
                <InnerBox>
                    <h2>Forget Password</h2>
                    <FormWrapper>
                        {(!isOtpSent && !isOtpVerified && !isPasswordReset) && <FormInput
                            value={values.email}
                            onChange={handleInputChange}
                            type='email'
                            name='email'
                            placeholder='Email'
                        />}
                        {(isOtpSent && !isOtpVerified && !isPasswordReset) && <FormInput
                            value={values.otp}
                            onChange={handleInputChange}
                            type='number'
                            name='otp'
                            placeholder='OTP'
                        />}
                        {(isOtpSent && isOtpVerified && !isPasswordReset) && <FormInput
                            value={values.password}
                            onChange={handleInputChange}
                            type='password'
                            name='password'
                            placeholder='New Password'
                        />}
                        <LoadingAnimation>
                            {loginLoading && <ReactLoading type='bars' color='#fff' height={50} width={50} />}
                        </LoadingAnimation>
                        {!loginLoading && <Button onClick={submitData} type='submit'>Submit</Button>}
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
  background-image: url('https://allears.net/wp-content/uploads/2021/08/2021-Warner-Bros-Studio-Tour-London-The-Making-of-Harry-Potter-Hogwarts-after-dark.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerBox = styled.div`
  padding: 40px 50px;
  background: #ffffff8b;
  justify-content: center;
  align-content: center;
  border-radius: 8px;

  h2 {
    text-align: center;
    color: white;
  }

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
  margin-top: 1rem;
  flex-direction: column;
  align-items: center;
  button {
  color: white;
  background-color: black;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  padding: 10px;
  outline: none;
  width: 100px;
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

const Button = styled.button`
  background-color: black;
  color: white;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  padding: 10px;
  outline: none;
  width: 100px;
`

export default ForgetPasswordPage;