import React from 'react';
import logo1 from '../assets/logoImages/Audi.jpeg';
import logo2 from '../assets/logoImages/BMW.jpeg';
import logo3 from '../assets/logoImages/Ford.jpeg';
import logo4 from '../assets/logoImages/Honda.jpeg';
import logo5 from '../assets/logoImages/Jaguar.png';
import logo6 from '../assets/logoImages/Lexus.jpeg';
import logo7 from '../assets/logoImages/Mazda.png';
import logo8 from '../assets/logoImages/nissan.jpeg';
import logo9 from '../assets/logoImages/volkwagen.jpeg';

function CarBrands() {
  return (
    <>
      <div class='bg-white py-24 sm:py-32'>
        <div class='mx-auto max-w-7xl px-6 lg:px-8'>
          <h2 class='text-center text-lg font-semibold leading-8 text-gray-900'>
            Find specialists around you for any of the car brands and more
          </h2>
          <div class='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
            <img
              class='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
              src={logo1}
              alt='Transistor'
              width='158'
              height='48'
            />
            <img
              class='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
              src={logo2}
              alt='Reform'
              width='158'
              height='48'
            />
            <img
              class='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
              src={logo3}
              alt='Tuple'
              width='158'
              height='48'
            />
            <img
              class='col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1'
              src={logo4}
              alt='SavvyCal'
              width='158'
              height='48'
            />
            <img
              class='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
              src={logo5}
              alt='Statamic'
              width='158'
              height='48'
            />
            <img
              class='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
              src={logo6}
              alt='Statamic'
              width='158'
              height='48'
            />
            <img
              class='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
              src={logo7}
              alt='Statamic'
              width='158'
              height='48'
            />
            <img
              class='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
              src={logo8}
              alt='Statamic'
              width='158'
              height='48'
            />
            <img
              class='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
              src={logo9}
              alt='Statamic'
              width='158'
              height='48'
            />
          </div>
          <div className='flex flex-1 justify-center mt-12'>
            <a
              href='#'
              className='text-sm font-bold leading-8 text-[white] rounded-lg bg-[#1f69b7] p-4 hover:text-white'
            >
              Mechanics Near me <span aria-hidden='true'>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarBrands;
