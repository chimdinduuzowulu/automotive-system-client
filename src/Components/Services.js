import React from 'react';
import service1 from '../assets/servicesImages/tekton-O_ufcLVTAYw-unsplash.jpeg';
import service2 from '../assets/servicesImages/service2.jpeg';
import service3 from '../assets/servicesImages/service3.jpeg';
import service4 from '../assets/servicesImages/service2.jpeg';
import service5 from '../assets/servicesImages/service5.jpeg';
import service6 from '../assets/servicesImages/service6.jpeg';

function Services() {
  return (
    <>
      <div className='bg-white py-24 sm:py-32 '>
        <div className='mx-auto max-w-[90%] px-2 lg:px-4'>
          <div className='mx-auto max-w-4xl lg:text-center'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>
              Immediate
            </h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              AUTO REPAIR SERVICES
            </p>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Get a quick and accurate vehicle diagonistic help if you vehicle
              has any of the problems listed below. This system offers a full
              range of automobile repair services to vehicle owners located in
              accorss the the country.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-6xl'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
              <div className='relative p-4 rounded-lg border'>
                <img
                  src={service1}
                  alt=''
                  className='hover:max-w-lg hover:cursor-pointer hover:opacity-[60%]'
                />
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  ENGINE DIAGNOSTICS
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                  suspendisse semper morbi. Odio urna massa nunc massa.
                </dd>
              </div>
              <div className='relative p-4 rounded-lg border'>
                <img
                  src={service2}
                  alt=''
                  className='hover:max-w-lg hover:cursor-pointer hover:opacity-[60%]'
                />
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  LUBE, OIL AND FILTERS
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                  suspendisse semper morbi. Odio urna massa nunc massa.
                </dd>
              </div>
              <div className='relative p-4 rounded-lg border'>
                <img
                  src={service3}
                  alt=''
                  className='hover:max-w-lg hover:cursor-pointer hover:opacity-[60%]'
                />
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  BELTS AND HOSES
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                  suspendisse semper morbi. Odio urna massa nunc massa.
                </dd>
              </div>
              <div className='relative p-4 rounded-lg border'>
                <img
                  src={service4}
                  alt=''
                  className='hover:max-w-lg hover:cursor-pointer hover:opacity-[60%]'
                />
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  AIR CONDITIONING
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                  suspendisse semper morbi. Odio urna massa nunc massa.
                </dd>
              </div>
              <div className='relative p-4 rounded-lg border'>
                <img
                  src={service5}
                  alt=''
                  className='hover:max-w-lg hover:cursor-pointer hover:opacity-[60%]'
                />
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  BRAKE REPAIR
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                  suspendisse semper morbi. Odio urna massa nunc massa.
                </dd>
              </div>
              <div className='relative p-4 rounded-lg border'>
                <img
                  src={service6}
                  alt=''
                  className='hover:max-w-lg hover:cursor-pointer hover:opacity-[60%]'
                />
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  TIRE AND WHEEL SERVICES
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                  suspendisse semper morbi. Odio urna massa nunc massa.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
