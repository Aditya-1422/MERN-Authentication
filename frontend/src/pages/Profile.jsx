import React from 'react'
// import { useSelector } from 'react-redux';

const Profile = () => {
  // const currentUser = useSelector((state) => this.state.currentUser)
  const handleSubmit = () =>{
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          hidden
          accept='image/*'
        />
        {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
        <img
          src=""
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        />
        <p className='text-sm self-center'>
          {/* {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )} */}
        </p>
        <input
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {/* {loading ? 'Loading...' : 'Update'} */}
          "Update"
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Log out
        </span>
      </div>
      {/* <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p> */}
      <p className='text-green-700 mt-5'>
        {/* {updateSuccess && 'User is updated successfully!'} */}
      </p>
    </div>
  );
}

export default Profile