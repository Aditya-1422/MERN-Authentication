import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import axios from 'axios';
import { URL } from '../url.js';
import { useDispatch } from 'react-redux';
import { loginInSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // Extracting user info from the result
      const user = {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      // Awaiting the axios post request
      const response = await axios.post(`${URL}/api/auth/google`, user);

      // Logging the response for debugging
      console.log(response);

      // Dispatching login success with user data
      dispatch(loginInSuccess(response.data));
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      console.log("Could not log in with Google!!! ", error);
    }
  };

  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
