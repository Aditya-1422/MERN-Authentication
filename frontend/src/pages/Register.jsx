import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import OAuth from '../components/OAuth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message state on submit

    try {
      setLoading(true)
      const response = await axios.post(`${URL}/api/auth/register`, {
        username,
        email,
        password
      }, {
        withCredentials: true
      });
      console.log(response.data)
      setMessage('User registered successfully!');
      setMessageStyle('text-green-500');
      setTimeout(() => {
        navigate('/login');
      }, 800);
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error('Error:', err);
      setMessage('User already exists!');
      setMessageStyle('text-red-500');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Register</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 p-3 rounded-lg'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          {loading ? 'Loading...' : 'Register'}
        </button>
        <OAuth/>
      </form>
      {message && <p className={`${messageStyle} mt-5`}>{message}</p>}
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/login'>
          <span className='text-blue-500'>Login</span>
        </Link>
      </div>
    </div>
  );
}

export default Register;