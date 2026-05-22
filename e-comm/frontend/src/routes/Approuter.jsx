import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router";
import Authlayout from '../layouts/Authlayout';
import Homelayout from '../layouts/Homelayout';
import Protected from '../components/Protected';


const Approuter = () => {

const router = createBrowserRouter([
{
    path:"/",
    element:<Authlayout/>,
    children:[
{
  index:true,
  element:<Protected/>

}
    ]
},
{
    path:"/home",
    element:<Homelayout/>,
    children:[

    ]
}

])
return <RouterProvider router={router} />

}

export default Approuter;
