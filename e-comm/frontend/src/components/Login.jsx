import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { axiosInstance } from '../api/axios.instance'
import { toast } from 'react-toastify'

const Login = ({ setToggle }) => {
  const { register, reset, handleSubmit } = useForm()
  const handleForm = async (formdata) => {
   try {
     let res =await axiosInstance.post("/auth/login", formdata,)
    let {data}= res;
    toast(data.message)
    reset()
    
   } catch (error) {

    console.log(error.response)
    
   }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 to-green-200">

      <form
        onSubmit={handleSubmit(handleForm)}
        className="w-full max-w-md bg-white border border-green-300 rounded-xl p-8 shadow-md"
      >
        {/* Logo / Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-700">
            D<span className="text-green-500">Mart</span>
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Login to your account
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md transition active:scale-95"
        >
          Login
        </button>

        {/* Register link */}
        <p className="text-center text-sm mt-5 text-gray-700">
          New to D-Mart?{" "}
          <span
            onClick={() => setToggle(true)}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
