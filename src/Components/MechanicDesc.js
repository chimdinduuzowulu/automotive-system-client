import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function MechanicDesc() {
  const [requestData, setrequestData] = useState({});
  const [error, seterror] = useState('');
  const { id } = useParams();
  //
  const [mechanicDetails, setmechanicDetails] = useState({});

  useEffect(() => {
    const getMechanicDetail = async () => {
      const response = await axios.get(`http://localhost:3001/mechanic/${id}`);
      const data = await response.data;
      setmechanicDetails(data.data);
    };
    getMechanicDetail();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setrequestData({ ...requestData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    requestData.mechanicID = id;
    requestData.requestStatus = 'Pending';
    const requestUpload = await axios.post(
      'http://localhost:3001/request/',
      requestData
    );
    const res = await requestUpload.data;
    if (requestUpload.status === 200) {
      toast.success(res.message);
      seterror('');
      setrequestData(res);
      return;
    }
    toast.error('Error creating data');
    seterror('Upload error');
    return;
  };

  return (
    <>
      <Header page='mechanic' />
      <div className='py-20 xl:mx-auto 2xl:container relative z-40 flex flex-wrap justify-center items-center bg-gray-100'>
        <p className='w-full p-8 text-center text-red-500'>{error}</p>
        <form onSubmit={handleSubmit}>
          {/* Image and description */}
          <div
            className='flex relative'
            style={{ transform: 'translateX(0%)' }}
          >
            <div className='w-full h-auto mt-14 md:flex justify-around items-center gap-2 px-12'>
              <div className='relative lg:w-[45%] sm:w-96 xl:h-96 h-80'>
                <img
                  src={mechanicDetails.profileImage}
                  alt='image of profile'
                  className='w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded'
                />
                <div className='w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-indigo-100 rounded-full'>
                  <img
                    src='https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg1.svg'
                    alt='commas'
                  />
                </div>
              </div>
              <div className='md:w-1/3 lg:w-[55%] xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between'>
                <div>
                  <h1 className='text-2xl font-semibold xl:leading-loose text-gray-800 dark:text-black '>
                    {mechanicDetails.bio}
                  </h1>
                  <p className='text-base font-sm leading-6 mt-4 text-black dark:text-black  '>
                    <span className='font-bold'> Specialities:</span>{' '}
                    {mechanicDetails.specialties}
                  </p>
                  <p className='text-base font-sm leading-6 mt-4 text-black dark:text-black  '>
                    <span className='font-bold'> Phone:</span>{' '}
                    {mechanicDetails.phone}
                  </p>
                  <p className='text-base font-sm leading-6 mt-4 text-black dark:text-black  '>
                    <span className='font-bold'> Email:</span>{' '}
                    {mechanicDetails.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Request form */}
          <div className='w-full'>
            <div className='w-full bg-gray-100 flex items-center justify-center px-5 py-5 h-auto'>
              <div className='bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden'>
                <div className='md:flex w-full justify-center items-center'>
                  <div className='w-full md:w-1/2 py-10 px-2 md:px-10'>
                    <div>
                      <div className='flex flex-wrap w-full'>
                        <div className='w-full mb-5 flex flex-wrap justify-start'>
                          <label
                            HtmlFor=''
                            className='w-full text-md font-semibold p-4 bg-gray-200 border'
                          >
                            Vehicle Year
                          </label>
                          <div className='flex w-full'>
                            <input
                              type='range'
                              id='vol'
                              name='vehicleYear'
                              min='0'
                              max='2024'
                              onChange={handleInput}
                              className='w-full pr-3 py-2 rounded-lg border-1 border-gray-100 outline-none focus:border-[#1f69b7] bg-[#1f69b7]'
                            />
                          </div>
                        </div>
                        {/*  */}
                        <div className='w-full mb-5 flex flex-wrap justify-start items-start'>
                          <label
                            HtmlFor=''
                            className='text-xs font-semibold px-1 w-full'
                          >
                            Petrol type
                          </label>
                          <div className='flex w-full justify-center'>
                            <input
                              type='text'
                              className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                              placeholder='Petrol type'
                              name='petrolType'
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 px-4 w-full'>
                        <div className='w-full mb-5'>
                          <label
                            HtmlFor=''
                            className='text-xs font-semibold px-1 w-full'
                          >
                            Transsmission
                          </label>
                          <div className='flex w-full justify-center'>
                            <input
                              type='text'
                              className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                              placeholder='Transmission'
                              name='transmission'
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='w-full mb-5'>
                          <label
                            HtmlFor=''
                            className='text-xs font-semibold px-1'
                          >
                            Engine size
                          </label>
                          <div className='flex'>
                            <input
                              type='text'
                              className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                              placeholder='Engine size'
                              name='engineSize'
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                        <div className='w-full mb-5'>
                          <label
                            HtmlFor=''
                            className='text-xs font-semibold px-1'
                          >
                            Horse Power
                          </label>
                          <div className='flex'>
                            <input
                              type='text'
                              className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                              placeholder='Horse Power'
                              name='horsePower'
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 py-10 px-5 md:px-10'>
                    <div>
                      <div className='flex flex-wrap -mx-3'>
                        <div className='w-full px-3 mb-5 flex flex-wrap justify-start items-center'>
                          <label
                            HtmlFor=''
                            className='text-md font-semibold p-4 w-full bg-gray-200 border'
                          >
                            Vehicle Make
                          </label>
                        </div>
                        <div className='w-full px-3 mb-5'>
                          <div className='flex'>
                            <select
                              name='vehicleMake'
                              onChange={handleInput}
                              className='w-full pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                            >
                              <option value=''>Choose......</option>
                              <option value='BMW'>BMW</option>
                              <option value='BENZ'>BENZ</option>
                              <option value='HONDA'>HONDA</option>
                              <option value='TOYOTA'>TOYOTA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class='relative w-full mb-5'>
                        <label
                          HtmlFor=''
                          className='text-xs font-semibold px-1'
                        >
                          Car problem in detail
                        </label>
                        <textarea
                          className='peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear'
                          id='carProblem'
                          rows='3'
                          name='carProblem'
                          onChange={handleInput}
                        ></textarea>
                      </div>
                      <div className='w-full mb-5'>
                        <label
                          HtmlFor=''
                          className='text-xs font-semibold px-1'
                        >
                          Vehicle millage
                        </label>
                        <div className='flex'>
                          <input
                            type='text'
                            className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                            placeholder='Millage'
                            name='vehicleMillage'
                            onChange={handleInput}
                          />
                        </div>
                      </div>

                      <div className='w-full mb-5'>
                        <label
                          HtmlFor=''
                          className='text-xs font-semibold px-1'
                        >
                          Number of engines
                        </label>
                        <div className='flex'>
                          <input
                            type='text'
                            className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                            placeholder='Number of engines'
                            name='engineNos'
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 py-10 px-5 md:px-10'>
                    <div>
                      <div className='flex flex-wrap -mx-3'>
                        <div className='w-full px-3 mb-5 flex flex-wrap justify-start items-center'>
                          <label
                            HtmlFor=''
                            className='text-md font-semibold p-4 w-full bg-gray-200 border'
                          >
                            Contact Info
                          </label>
                        </div>
                      </div>
                      <div className='w-full mb-5'>
                        <div className='flex'>
                          <input
                            type='text'
                            className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                            placeholder='Enter your email'
                            onChange={handleInput}
                            name='userEmail'
                          />
                        </div>
                      </div>
                      <div className='w-full mb-5'>
                        <label
                          HtmlFor=''
                          className='text-xs font-semibold px-1'
                        >
                          Full name
                        </label>
                        <div className='flex'>
                          <input
                            type='text'
                            className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                            placeholder='Enter your fullname'
                            name='fullName'
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='w-full mb-5'>
                        <label
                          HtmlFor=''
                          className='text-xs font-semibold px-1'
                        >
                          Phone
                        </label>
                        <div className='flex'>
                          <input
                            type='text'
                            className='w-full pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                            placeholder='Enter your Phone number'
                            name='phone'
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className='flex -mx-3'>
                        <div className='w-1/2 px-3 mb-5'>
                          <button
                            type='submit'
                            className='block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold'
                          >
                            Request Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default MechanicDesc;
