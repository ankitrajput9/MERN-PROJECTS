import React, { useState } from 'react';
import Register from '../components/register';
import Login from '../components/Login';

const Authlayout = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className='bg-red-300'>
     

      {toggle ? <Register setToggle={setToggle} /> : <Login setToggle={setToggle} />}


    </div>
  );
}

export default Authlayout;
