import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Mechanics() {
  const [allMechanics, setallMechanics] = useState([]);
  const [IsReady, setIsReady] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [userCity, setuserCity] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [errorResult, seterrorResult] = useState('');
  const navigate = useNavigate();
  //

  useEffect(() => {
    const successCallback = async (position) => {
      const getlatCoords = await position.coords.latitude;
      const getlongCoords = await position.coords.longitude;
      setLong(getlongCoords);
      setLat(getlatCoords);
      console.log('Lat, ', getlatCoords);
      console.log('Long, ', getlongCoords);
    };
    const errorCallback = (error) => {
      console.log(error);
    };
    try {
      navigator.geolocation.watchPosition(successCallback, errorCallback);
      const getMechanics = async () => {
        const locationData = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
        );
        console.log(locationData);
        const stateData = await locationData.data;
        const stateValue = await stateData?.locality;
        const lowerCaseState = await stateValue.toLowerCase();
        setuserCity(stateValue);
        console.log(lowerCaseState);
        const response = await axios.get(
          `http://localhost:3001/mechanic/userCity/${lowerCaseState}`
        );
        const data = await response.data;
        setallMechanics(data.data);
        setIsReady(true);
        seterrorResult('');
      };
      getMechanics();
    } catch (error) {
      setIsError(true);
      seterrorResult('Error fetching data ****');
      return;
    }
  }, [long]);
  const redirectToPage = (id) => {
    navigate(`/mechanic/${id}`);
  };
  return (
    <>
      <Header page='mechanics' />
      <div tabIndex='0' className='focus:outline-none mt-auto'>
        <div className='mx-auto container-fluid p-8'>
          <div className='flex flex-wrap items-center justify-center lg:justify-around gap-4'>
            {IsReady && allMechanics.length > 0 ? (
              allMechanics?.map((mechanic) => (
                <div
                  tabIndex='0'
                  className='focus:outline-none mx-2 w-72 xl:mb-0 mb-8 cursor-pointer shadow-lg shadow-inner rounded-xl border-2 border-black'
                  onClick={() => redirectToPage(mechanic.id)}
                  key={mechanic.id}
                >
                  <div>
                    <img
                      alt='person capturing an image'
                      src={mechanic.profileImage}
                      tabIndex='0'
                      className='focus:outline-none w-full h-44'
                    />
                  </div>
                  <div className='bg-[#1f2937] '>
                    <div className='flex items-center justify-between px-4 pt-4'>
                      <div>
                        <img
                          className='dark:bg-white focus:outline-none'
                          src='https://tuk-cdn.s3.amazonaws.com/can-uploader/4-by-2-col-grid-svg1.svg'
                          alt='bookmark'
                        />
                      </div>
                      <div className='bg-yellow-200 py-1.5 px-6 rounded-full'>
                        <p
                          tabIndex='0'
                          className='focus:outline-none text-sm font-12 text-green-500'
                        >
                          Online{' '}
                        </p>
                      </div>
                    </div>
                    <div className='p-4'>
                      <div className='flex items-center'>
                        <h2
                          tabIndex='0'
                          className='focus:outline-none text-lg dark:text-white font-semibold'
                        >
                          {mechanic.firstName + ' ' + mechanic.lastName}
                        </h2>
                        <p
                          tabIndex='0'
                          className='focus:outline-none text-sm text-gray-600 dark:text-gray-200 pl-5 font-bold'
                        >
                          4 min away
                        </p>
                      </div>
                      <p
                        tabIndex='0'
                        className='focus:outline-none text-xs text-gray-600 dark:text-gray-200 mt-2'
                      >
                        {mechanic.bio}
                      </p>
                      <div className='flex mt-4'>
                        <div>
                          <p
                            tabIndex='0'
                            className='focus:outline-none text-xs text-gray-600 dark:text-gray-200 px-2 bg-gray-200 dark:bg-gray-700 py-1'
                          >
                            {mechanic.phone}
                          </p>
                        </div>
                        <div className='pl-2'>
                          <p
                            tabIndex='0'
                            className='focus:outline-none text-xs text-gray-600 dark:text-gray-200 px-2 bg-gray-200 dark:bg-gray-700 py-1'
                          >
                            {mechanic.email}
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-wrap items-center justify-between py-4'>
                        <h2
                          tabIndex='0'
                          className='focus:outline-none text-indigo-700 text-xs font-semibold'
                        >
                          {mechanic.specialties}
                        </h2>
                        <h3
                          tabIndex='0'
                          className='focus:outline-none text-indigo-700 text-xl font-semibold'
                        >
                          {mechanic.state + ' ' + mechanic.city}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='flex justify-center items-center w-full h-full'>
                {IsReady && allMechanics.length === 0
                  ? 'Sorry! There is no mechanc found at your location!'
                  : 'Fetching Data....'}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Mechanics;
