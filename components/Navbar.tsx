import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-white py-4 shadow-sm w-full flex justify-between px-6 items-center">
      <h1 className="font-bold">Notes App</h1>
      <div className='font-semibold cursor-pointer'>Login</div>
    </div>
  );
};

export default Navbar;
