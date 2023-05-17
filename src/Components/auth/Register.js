import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [inputError, setinputError] = useState('');
  const [responseMessage, setresponseMessage] = useState('');
  const [isUploading, setisUploading] = useState(false);
  // function to get the form inputs values
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(formData).length === 2) {
        Object.values(formData).every((value) => {
          if (value === '') {
            setinputError('All fields are required!!');
            return;
          }
        });
        // Your code here
        const registerRequest = await axios.post(
          'http://localhost:3001/auth/register',
          formData
        );
        const response = await registerRequest.data;
        if (response.message === 'Registered successfully') {
          toast.success('Account created successfully');
          setresponseMessage(response.message);
          setisUploading(false);
          setFormData({});
          navigate('/login');
        }
        setinputError(response.message);
        setisUploading(false);
        return;
      }
      setinputError('All fields are required!!');
      return;
    } catch (error) {
      setisUploading(false);
      setinputError(error?.response?.data?.message);
    }
  };
  return (
    <>
      <section className='h-screen w-full'>
        <div className='container-fluid h-full px-6 py-24 flex justify-center items-center'>
          <div className='g-6 flex h-full w-10/12 flex-wrap items-center justify-center lg:justify-between border shadow-2xl shadow-gray-100 rounded-lg p-8'>
            <div className='h-full md:w-10/12 lg:w-6/12 border shadow-lg rounded-xl p-12 bg-[#3f3d56] text-white'>
              <p className='text-red-500 text-[18px] w-[90%] m-auto text-center'>
                {inputError}
              </p>
              <form onSubmit={handleSubmit}>
                <div className='relative mb-6'>
                  <label htmlFor='exampleFormControlInput33' className=''>
                    Username
                  </label>
                  <input
                    type='text'
                    className='peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear  motion-reduce:transition-none text-black'
                    id='exampleFormControlInput33'
                    name='username'
                    value={formData?.username}
                    onChange={handleInput}
                  />
                </div>

                <div className='relative mb-6'>
                  <label htmlFor='exampleFormControlInput33' className=''>
                    Password
                  </label>
                  <input
                    type='password'
                    className='peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear  motion-reduce:transition-none text-black'
                    id='exampleFormControlInput33'
                    name='password'
                    value={formData?.password}
                    onChange={handleInput}
                  />
                </div>

                <button
                  type='submit'
                  className='inline-block w-full rounded bg-[#1265f0] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                  data-te-ripple-init
                  data-te-ripple-color='light'
                >
                  {isUploading ? 'Registering......' : 'Register'}
                </button>

                <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
                  <p className='mx-4 mb-0 text-center font-semibold dark:text-neutral-200'>
                    OR
                  </p>
                </div>
                {/* <!-- Register link --> */}
                <p className='mb-0 mt-2 pt-1 text-md font-semibold'>
                  Already have an account ?
                  <a
                    href='/login'
                    className='text-[#1265f0] hover:cursor-pointer ml-2'
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
            <div className='mb-12 md:mb-0 md:w-8/12 lg:w-6/12'>
              <img
                src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
                className='w-full'
                alt='Phone image'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
