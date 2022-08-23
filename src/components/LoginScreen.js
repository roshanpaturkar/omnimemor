import { useState } from 'react';
import useUserStore from '../store/userStore';

const LoginScreen = () => {

    const initialValues = {
      username: '',
      password: ''
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

    const {
      userToken,
      logout,
        login,
      getUserDetails,
    } = useUserStore();

    const loginUser = (e) => {
        e.preventDefault();
        console.log(values);
        login(values.username, values.password);
    }

    if (userToken) {
        return (
            <div>
                <h2>User is logged in</h2>
                {/* <h3>{userDetails}</h3> */}
                <button onClick={logout}>Logout</button>
                <button onClick={getUserDetails}>Get Details</button>
            </div>
        );
    } else {
        <h2>User is not logged in</h2>;
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
    }
}

export default LoginScreen;