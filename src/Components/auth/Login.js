import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [inputError, setinputError] = useState('');
  const [isUploading, setisUploading] = useState(false);
  // function to get the form inputs values
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // submit handler
  const handleSubmit = async (e) => {
    setisUploading(true);
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
          'http://localhost:3001/auth/checkLogin',
          formData
        );
        const response = await registerRequest.data;
        if (
          registerRequest.status === 200 &&
          response.message === 'Login successful'
        ) {
          setisUploading(false);
          setFormData({});
          sessionStorage.setItem('id', response.mechanicID);
          navigate(`/mechanicpage/${response.mechanicID}`);
        }
        //
        setinputError(response.message);

        setisUploading(false);
        return;
      }
      setisUploading(false);
      setinputError('All fields are required!!');
      return;
    } catch (error) {
      setinputError(error?.response?.data?.message);
      setisUploading(false);
    }
  };
  return (
    <>
      <section className='h-screen w-full'>
        <div className='container-fluid h-full px-6 py-24 flex justify-center items-center'>
          <div className='g-6 flex h-auto lg:h-full w-10/12 flex-wrap items-center justify-center lg:justify-between border shadow-2xl shadow-gray-100 rounded-lg p-8'>
            <div className='mb-12 md:mb-0 md:w-8/12 lg:w-6/12'>
              <img
                src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
                className='hidden md:block md:w-full'
                alt='Phone image'
              />
            </div>

            <div className='h-full md:w-10/12 lg:w-6/12 border shadow-lg rounded-xl p-12 bg-[#3f3d56] text-white'>
              <p className='text-red-500 text-[18px] w-[90%] m-auto text-center'>
                {inputError}
              </p>
              <form onSubmit={handleSubmit}>
                <div className='relative mb-6' data-te-input-wrapper-init>
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
                <div className='relative mb-6' data-te-input-wrapper-init>
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

                <div className='mb-6 flex items-center justify-between'>
                  <div className='mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]'>
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type='checkbox'
                      value=''
                      id='exampleCheck3'
                    />
                    <label
                      className='inline-block pl-[0.15rem] hover:cursor-pointer'
                      htmlFor='exampleCheck3'
                    >
                      Remember me
                    </label>
                  </div>

                  <a
                    href='#!'
                    className='text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600'
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type='submit'
                  className='inline-block w-full rounded bg-[#1265f0] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
                  data-te-ripple-init
                  data-te-ripple-color='light'
                >
                  {isUploading ? 'Signing in......' : 'Sign in'}
                </button>

                <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
                  <p className='mx-4 mb-0 text-center font-semibold dark:text-neutral-200'>
                    OR
                  </p>
                </div>
                {/* <!-- Register link --> */}
                <p className='mb-0 mt-2 pt-1 text-md font-semibold'>
                  Don't have an account ?
                  <a
                    href='/register'
                    className='text-[#1265f0] hover:cursor-pointer ml-2'
                  >
                    Register
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
