import React from 'react';

const HeroSection = () => {
  return (
    <div className='bg-gray-600 h-[90vh] flex  ' >
     <div className='h-full  w-[20%] text-2xl font-bold flex-col text-white flex items-center'>
        <h1>Coder</h1>
        <div className='h-full w-full'>
<button className='bg-gray-500 hover:cursor-pointer hover:bg-gray-400 w-full text-sm text-white font-medium py-2 px-4 rounded'>
  + New Chat
</button>
        </div>
     </div>
     <div className='h-full  w-[80%] bg-amber-100'>
     </div>
    </div>
  );
}

export default HeroSection;
