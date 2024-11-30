import React from "react";

const Register: React.FC = () => {
  return (
    <>
      <div className="min-h-screen min-w-screen bg-[#161d31] flex items-center justify-center ">
        <div className="w-[500px] text-[#d0d2d6] p-2 overflow-y-auto ">
          <div className="bg-[#283046] p-4 rounded-md">
            <div className="mb-3 header">
              <h2 className="mb-2 text-xl font-bold text-center uppercase">
                Welcome to e-commerce
              </h2>
              <p className="text-sm text-center text-gray-500 font-primaryItalic">
                Register To Your Account And Start Today
              </p>
            </div>
            <div className="form">
              <form action="">
                {/* first name */}
                <div className="flex flex-col my-3">
                  <label htmlFor="firstName" className="mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden "
                    required
                  />
                </div>
                {/* last name */}
                <div className="flex flex-col my-3">
                  <label htmlFor="lastName" className="mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden "
                    required
                  />
                </div>
                {/* email */}
                <div className="flex flex-col my-3">
                  <label htmlFor="email" className="mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden "
                    required
                  />
                </div>
                {/* password */}
                <div className="flex flex-col my-3">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden "
                    required
                  />
                </div>
                {/* checkbox */}
                <div className="flex items-center my-3 space-x-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="w-4 h-4 overflow-hidden text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600"
                    required
                  />
                  <label htmlFor="checkbox">
                    I agree to privacy policy & terms
                  </label>
                </div>
                {/* button */}
                <button
                  type="submit"
                  className="w-full py-2 mb-3 text-white bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg px-7 "
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
