import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Mechanic = () => {
  let { id } = useParams();
  sessionStorage.setItem('id', id);
  const [profileImage, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [mechanic, setmechanic] = useState({});
  const [getlongCoords, setLong] = useState('');
  const [getlatCoords, setLat] = useState('');
  const [inputError, setinputError] = useState('');
  const [isUploading, setisUploading] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [mechanicGotten, setmechanicGotten] = useState(false);
  //
  useEffect(() => {
    const getMechanicData = async () => {
      const mechanic = await axios.get(`http://localhost:3001/mechanic/${id}`);
      const result = await mechanic.data;
      setmechanic(result.data);
      const emailData = {
        name: result.data.firstName,
        fromEmail: result.data.email,
      };

      localStorage.setItem('mechanicData', JSON.stringify(emailData));
      setmechanicGotten(true);
    };
    getMechanicData();
    if (mechanicGotten && Object.keys(mechanic).length === 13) {
      setIsAlreadyRegistered(true);
      return;
    }
    return;
  }, [mechanic]);
  //
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Profile image uploader
  const getFile = (e) => {
    setFile(e.target.files[0]);
  };
  //
  const successCallback = async (position) => {
    const getlatCoords = await position.coords.latitude;
    const getlongCoords = await position.coords.longitude;
    setLong(getlongCoords);
    setLat(getlatCoords);
    console.log(position);
  };
  const errorCallback = (error) => {
    console.log(error);
  };
  //
  const handleSubmit = async (e) => {
    setisUploading(true);
    e.preventDefault();
    try {
      if (Object.keys(formData).length === 7 && profileImage !== null) {
        Object.values(formData).every((value) => {
          if (value === '') {
            setinputError('All fields are required***');
            return;
          }
        });
        // Upload image and get the url first
        const imageData = new FormData();
        imageData.append('file', profileImage);
        imageData.append('upload_preset', 'j1pilyhk');
        //
        axios
          .post('https://api.cloudinary.com/v1_1/dcltnnvcu/upload/', imageData)
          .then(async (res) => {
            if (res.status === 200) {
              formData.profileImage = await res.data.secure_url;
              // get the longitude and latitude of a user then fine his city
              await navigator.geolocation.getCurrentPosition(
                successCallback,
                errorCallback
              );
              const locationData = await axios.get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${getlatCoords}&longitude=${getlongCoords}&localityLanguage=en`
              );
              const stateData = await locationData.data;
              const stateValue = await stateData?.locality;
              const lowerCaseState = await stateValue.toLowerCase();
              formData.city = lowerCaseState;
              formData.mechanicID = id;
              // Then send the data to server with the image url
              const registerProfile = await axios.post(
                'http://localhost:3001/mechanic/createProfile',
                formData
              );

              const response = await registerProfile.data;
              if (registerProfile.status === 200) {
                setisUploading(false);
                toast.success(response?.message);
                setisUploading(false);
                setFormData({});
                setinputError('');
                return;
                // navigate(`/mechanicpage`);
              }
              //
              // setinputError(response?.data?.message);
              setisUploading(false);
              return;
            }
          });
      } else {
        setisUploading(false);
        setinputError('All fields are required!!');
        return;
      }
    } catch (error) {
      setinputError(error?.response?.data?.message);
      setisUploading(false);
      return;
    }
  };
  return (
    <>
      <Header page='mechanicPage' />
      {/* The mechanics profile just be filled in here and once it's filled in once, it becomes a disabled data until he clicks on update profile */}
      <div className='row container m-auto'>
        <div className='col-md-8 mb-4'>
          <div className='card mb-4'>
            <div className='card-header py-3'>
              <h5 className='mb-0'>Bio Data</h5>
            </div>
            <div className='card-body'>
              {isAlreadyRegistered ? (
                <>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div className='row mb-4'>
                    <div className='col'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id='form7Example1'
                          className='form-control'
                          value={mechanic?.firstName}
                          disabled
                        />
                        <label className='form-label' htmlFor='form7Example1'>
                          First name
                        </label>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id='form7Example2'
                          className='form-control'
                          value={mechanic?.lastName}
                          disabled
                        />
                        <label className='form-label' htmlFor='form7Example2'>
                          Last name
                        </label>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id='form7Example22'
                          className='form-control'
                          value={mechanic?.state}
                          disabled
                        />
                        <label className='form-label' htmlFor='form7Example2'>
                          State
                        </label>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id='form7Example02'
                          className='form-control'
                          value={mechanic?.city}
                          disabled
                        />
                        <label className='form-label' htmlFor='form7Example2'>
                          City
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Text input --> */}
                  <div className='form-outline mb-4'>
                    <input
                      type='text'
                      id='form7Example3'
                      className='form-control'
                      placeholder='Car servicing, BMW repair, Benz repair...'
                      value={mechanic?.specialties}
                      disabled
                    />
                    <label className='form-label' htmlFor='form7Example3'>
                      Area of specialities in comma(,) separated format.
                    </label>
                  </div>

                  {/* <!-- Text input --> */}
                  <div className='form-outline mb-4'>
                    <input
                      type='text'
                      id='form7Example4'
                      className='form-control'
                      value={mechanic?.address}
                      disabled
                    />
                    <label className='form-label' htmlFor='form7Example4'>
                      Address
                    </label>
                  </div>

                  {/* <!-- Email input --> */}
                  <div className='form-outline mb-4'>
                    <input
                      type='email'
                      id='form7Example5'
                      className='form-control'
                      value={mechanic?.email}
                      disabled
                    />
                    <label className='form-label' htmlFor='form7Example5'>
                      Email
                    </label>
                  </div>

                  {/* <!-- Number input --> */}
                  <div className='form-outline mb-4'>
                    <input
                      type='number'
                      id='form7Example6'
                      className='form-control'
                      value={mechanic?.phone}
                      disabled
                    />
                    <label className='form-label' htmlFor='form7Example6'>
                      Phone
                    </label>
                  </div>

                  {/* <!-- Message input --> */}
                  <div className='form-outline mb-4'>
                    <textarea
                      className='form-control'
                      id='form7Example7'
                      rows='4'
                      value={mechanic?.bio}
                      disabled
                    >
                      {mechanic?.bio}
                    </textarea>
                    <label className='form-label' htmlFor='form7Example7'>
                      In 200 words, tell users about yourself.
                    </label>
                  </div>

                  {/* <!-- Checkbox --> */}
                  <div
                    className='flex w-full items-center justify-start'
                    disabled
                  >
                    <label
                      className='w-[90%] flex flex-col items-center px-4 py-6 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer'
                      disabled
                    >
                      <svg
                        className='w-8 h-8'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                      >
                        <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
                      </svg>
                      <span className='mt-2 text-base leading-normal'>
                        Upload profile image
                      </span>
                      <input type='file' className='hidden' disabled />
                    </label>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p className='w-[90%] text-red-500 text-[18px] text-center'>
                    {inputError}
                  </p>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div className='row mb-4'>
                    <div className='col'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id=''
                          className='form-control'
                          value={formData?.firstName}
                          name='firstName'
                          onChange={handleInput}
                        />
                        <label className='form-label' htmlFor='form7Example1'>
                          First name
                        </label>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id='form7Example2'
                          className='form-control'
                          value={formData?.lastName}
                          name='lastName'
                          onChange={handleInput}
                        />
                        <label className='form-label' htmlFor='form7Example2'>
                          Last name
                        </label>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-outline'>
                        <input
                          type='text'
                          id=''
                          className='form-control'
                          value={formData?.state}
                          name='state'
                          onChange={handleInput}
                        />
                        <label className='form-label' htmlFor='form7Example2'>
                          Enter state
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Text input --> */}
                  <div className='form-outline mb-4'>
                    <input
                      type='text'
                      id='form7Example3'
                      className='form-control'
                      placeholder='Car servicing, BMW repair, Benz repair...'
                      value={formData?.specialties}
                      name='specialties'
                      onChange={handleInput}
                    />
                    <label className='form-label' htmlFor='form7Example3'>
                      Area of specialities in comma(,) separated format.
                    </label>
                  </div>

                  {/* <!-- Email input --> */}
                  <div className='form-outline mb-4'>
                    <input
                      type='email'
                      id='form7Example5'
                      className='form-control'
                      value={formData?.email}
                      name='email'
                      onChange={handleInput}
                    />
                    <label className='form-label' htmlFor='form7Example5'>
                      Email
                    </label>
                  </div>
                  {/* <!-- Number input --> */}
                  <div className='form-outline mb-4'>
                    <input
                      type='text'
                      id='form7Example6'
                      className='form-control'
                      value={formData?.phone}
                      name='phone'
                      onChange={handleInput}
                    />
                    <label className='form-label' htmlFor='form7Example6'>
                      Phone
                    </label>
                  </div>
                  {/* ............ */}

                  {/* <!-- Message input --> */}
                  <div className='form-outline mb-4'>
                    <textarea
                      className='form-control'
                      id='bio'
                      name='bio'
                      rows='4'
                      onChange={handleInput}
                    >
                      {formData?.bio}
                    </textarea>
                    <label className='form-label' htmlFor='form7Example7'>
                      In 200 words, tell users about yourself.
                    </label>
                  </div>
                  {/* <!-- Checkbox --> */}
                  <div className='flex w-full items-center justify-start'>
                    <label className='w-[90%] flex flex-col items-center px-4 py-6 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer'>
                      <svg
                        className='w-8 h-8'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                      >
                        <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
                      </svg>
                      <span className='mt-2 text-base leading-normal'>
                        Upload profile image
                      </span>
                      <input
                        type='file'
                        className='hidden'
                        name='profileImage'
                        id='formFile'
                        onChange={getFile}
                      />
                    </label>
                  </div>

                  {!isAlreadyRegistered &&
                  Object.keys(mechanic).length === 0 ? (
                    <button
                      type='submit'
                      className='bg-green-600 text-white m-4 px-12 py-4 rounded-lg'
                      // onClick={() => console.log('hello')}
                    >
                      {isUploading ? 'Uploading.....' : 'Save'}
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='rounded-lg py-3 bg-green-600 btn-lg btn-block text-white m-4 px-12 cursor-not-allowed'
                      disabled={true}
                    >
                      Save
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <div className='col-md-4 mb-4'>
          <div className='card mb-4'>
            <div className='card-header py-3'>
              <h5 className='mb-0'>Profile details</h5>
            </div>
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
                  Restration date:
                  <span>{mechanic?.createdAt}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center px-0'>
                  Updated:
                  <span>{mechanic?.updatedAt}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                  <div>
                    <strong>User: </strong>
                    <strong>
                      <p className='mb-0'>
                        {/* {mechanic.firstName + ' ' + mechanic.lastName} */}
                      </p>
                    </strong>
                  </div>
                  <span>
                    <strong>
                      {mechanic?.firstName + ' ' + mechanic?.lastName}
                    </strong>
                  </span>
                </li>
              </ul>

              <button
                type='button'
                className='rounded-lg py-3 bg-[#2169b6] btn-lg btn-block text-white m-2 px-12 cursor-not-allowed'
                disabled={true}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mechanic;
