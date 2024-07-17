import { useSelector } from 'react-redux';
import { useEffect, useRef, useState, useCallback } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageError, setImageError] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    console.log("Current User Profile Picture:", currentUser.profilePicture);
    if (image) {
      handleFileUpload(image);
    }
  }, [image, currentUser.profilePicture]);

  const handleFileUpload = useCallback(async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Download URL:", downloadURL);
          setFormData((prevFormData) => ({ ...prevFormData, profilePicture: downloadURL }));
        });
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          hidden
          accept='image/*'
          ref={fileRef}
          onChange={(e) => { setImage(e.target.files[0]) }}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          onClick={() => fileRef.current.click()}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercentage}%`}</span>
          ) : imagePercentage === 100 ? (
            <span className='text-green-700'>Image uploaded successfully!!</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Log out
        </span>
      </div>
    </div>
  );
};

export default Profile;