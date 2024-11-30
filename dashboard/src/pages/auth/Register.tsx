import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineGithub, AiOutlineGooglePlus } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import MetaData from "../../components/MetaData.tsx";

const Register: React.FC = () => {
  const title = "Sign-Up";

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // handle input change

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle submit form

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission logic here
    console.log(input);
  };

  return (
    <>
      <MetaData title={title} />

      {/* SignUp Start*/}

      <div className="min-h-screen min-w-screen bg-[#161d31] flex items-center justify-center">
        <div className="w-[500px] text-[#d0d2d6] p-2 overflow-y-auto py-5 ">
          <div className="bg-[#283046] p-4 rounded-md">
            <div className="mb-3 header">
              <h2 className="mb-2 text-xl font-bold text-center uppercase bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Welcome to e-commerce
              </h2>
              <p className="text-sm text-center text-gray-500 font-primaryItalic">
                Register To Your Account And Start Today
              </p>
            </div>
            {/* form */}
            <div className="form">
              <form onSubmit={handleSubmitForm}>
                {/* first name */}
                <div className="flex flex-col my-3">
                  <label htmlFor="firstName" className="mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden "
                    name="firstName"
                    value={input.firstName}
                    onChange={handleInputChange}
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
                    id="lastName"
                    placeholder="Last Name"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden "
                    name="lastName"
                    value={input.lastName}
                    onChange={handleInputChange}
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
                    id="email"
                    placeholder="Email Address"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden "
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
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
                    id="password"
                    placeholder="Password"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden "
                    name="password"
                    value={input.password}
                    onChange={handleInputChange}
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
                  className="w-full py-2 mb-3 text-white bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg px-7 transition-all duration-300 "
                >
                  Sign Up
                </button>
                {/* already have an account */}
                <div className="my-3">
                  <p className="flex items-center justify-center gap-1">
                    Already have an account ?
                    <Link
                      to="/login"
                      className="text-blue-500 hover:underline transition-all duration-200 inline-block text-sm"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
                {/* -or- */}
                <div className="w-full flex items-center justify-center my-3 ">
                  <div className="w-[45%] bg-slate-700 h-[1px] "></div>
                  <div className="w-[10%] flex items-center justify-center">
                    <span className="pb-1">Or</span>
                  </div>
                  <div className="w-[45%] bg-slate-700 h-[1px] "></div>
                </div>
                {/* social icons */}
                <div className="flex items-center justify-center gap-3 ">
                  <div className="w-[35px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center items-center cursor-pointer transition-all duration-300 overflow-hidden ">
                    <span>
                      <AiOutlineGooglePlus />
                    </span>
                  </div>
                  <div className="w-[35px] h-[35px] flex rounded-md bg-indigo-700 shadow-lg hover:shadow-indigo-700/50 justify-center items-center cursor-pointer transition-all duration-300 overflow-hidden ">
                    <span>
                      <FiFacebook />
                    </span>
                  </div>
                  <div className="w-[35px] h-[35px] flex rounded-md bg-purple-700 shadow-lg hover:shadow-purple-700/50 justify-center items-center cursor-pointer transition-all duration-300 overflow-hidden ">
                    <span>
                      <AiOutlineGithub />
                    </span>
                  </div>
                  <div className="w-[35px] h-[35px] flex rounded-md bg-cyan-700 shadow-lg hover:shadow-cyan-700/50 justify-center items-center cursor-pointer transition-all duration-300 overflow-hidden ">
                    <span>
                      <CiTwitter />
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
