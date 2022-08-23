import { useState, useEffect } from 'react';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, isUserLoggedIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/home');
    }
  });

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
    login(values.username, values.password).then(() => {
      setValues(initialValues);
      navigate('/home');
    });
  };

  return (
    <div className='login-screen'>
      <h1>Login</h1>
      <form>
        <input
          value={values.username}
          onChange={handleInputChange}
          type='text'
          name='username'
          placeholder='Username'
        />
        <input
          value={values.password}
          onChange={handleInputChange}
          type='password'
          name='password'
          placeholder='Password'
        />
        <button onClick={loginUser} type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
