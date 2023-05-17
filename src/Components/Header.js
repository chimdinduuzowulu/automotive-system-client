import React, { useState } from 'react';

function Header({ page }) {
  const [headerRoute, setheaderRoute] = useState('');
  let id = sessionStorage.getItem('id');
  return (
    <div
      className={`
      ${page !== 'home' ? 'bg-[#2169b6] text-white mb-[120px]' : 'bg-white'}`}
    >
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav
          className='flex items-center justify-between p-6 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <a href='/index' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <h1 className='font-bold text-[#1f69b7] text-[30px]'>
                CarService
              </h1>
            </a>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <a
              href={
                page === 'home'
                  ? '/index'
                  : page === 'mechanics'
                  ? '/index'
                  : page === 'mechanicPage'
                  ? '/requests'
                  : page === 'requests'
                  ? `/mechanicpage/${id}`
                  : '/mechanics'
              }
              className='text-sm font-bold leading-8 text-[white] rounded-lg bg-[#1f69b7] p-4 hover:text-white'
            >
              {page === 'mechanics'
                ? 'Home Page'
                : page === 'mechanicPage'
                ? 'View Requests'
                : page === 'requests'
                ? 'Back to page'
                : 'Mechanics Near me'}

              <span aria-hidden='true' className='ml-2'>
                &rarr;
              </span>
            </a>
            {page === 'index' ? (
              <a
                href={'/login'}
                className='text-sm font-bold leading-8 text-[white] rounded-lg bg-[#1f69b7] p-4 hover:text-white mx-6'
              >
                Mechanic Login
                <span aria-hidden='true' className='ml-2'>
                  &rarr;
                </span>
              </a>
            ) : null}
          </div>
        </nav>
      </header>
    </div>
  );
}
export default Header;
