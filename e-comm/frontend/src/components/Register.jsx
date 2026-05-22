import React from 'react'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../api/axios.instance'
import { toast } from 'react-toastify'

const Register = ({ setToggle }) => {
  const { register, reset, handleSubmit } = useForm()

  const handleForm = async (formdata) => {
    try {
      let res = await axiosInstance.post("/auth/register", formdata)
      let { data, status } = res;
      console.log(res)
      toast(`${data.message} 🛒`)
      reset()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 to-green-200">

      <form
        onSubmit={handleSubmit(handleForm)}
        className="w-full max-w-md bg-white border border-green-300 rounded-xl p-8 shadow-md"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-700">
            D<span className="text-green-500">Mart</span>
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Create your account
          </p>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Username
          </label>
          <input
            {...register("user")}
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Mobile */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            {...register("mobile")}
            type="text"
            placeholder="Enter mobile number"
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md transition active:scale-95"
        >
          Register
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-5 text-gray-700">
          Already registered?{" "}
          <span
            onClick={() => setToggle(false)}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default Register
