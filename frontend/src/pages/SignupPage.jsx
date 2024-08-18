import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg shadow-md w-full max-w-md flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Signup</h2>
        
        <label htmlFor="email" className="mb-2 text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 rounded-lg p-2 mb-4"
          required
        />

        <label htmlFor="username" className="mb-2 text-white">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="border-2 rounded-lg p-2 mb-4"
          required
        />

        <label htmlFor="password" className="mb-2 text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 rounded-lg p-2 mb-6"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-4 rounded focus:shadow-outline w-1/3 mx-12"
        >
          Signup
        </button>
          

          <p className="inline-block align-baseline font-bold text-sm text-white">Already have an account?</p>
        <Link
          to="/login"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-green-600 "
        >
       Login
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
