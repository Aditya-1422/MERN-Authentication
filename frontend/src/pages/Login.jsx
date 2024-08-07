import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { loginInFailure, loginInStart, loginInSuccess } from '../redux/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState('');
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message state on submit

    try {
      dispatch(loginInStart());
      const response = await axios.post(`${URL}/api/auth/login`, {
        email,
        password
      }, {
        withCredentials: true
      });
      dispatch(loginInSuccess(response.data));
      setMessage('User logged in successfully!');
      setMessageStyle('text-green-500');
      setTimeout(() => {
        navigate('/');
      }, 500); 
    } catch (err) {
      dispatch(loginInFailure(err));
      console.error('Error:', err);
      setMessage('User does not exist!');
      setMessageStyle('text-red-500');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading}
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        <OAuth/>
      </form>
      {message && <p className={`${messageStyle} mt-5`}>{message}</p>}
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to='/register'>
          <span className='text-blue-500'>Register</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
