import React, { useState } from "react";
import { AiOutlineGithub, AiOutlineGooglePlus } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";
import { FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";
import MetaData from "../../components/MetaData.tsx";

const Login: React.FC = () => {
  const title = "Sign-In";

  const [input, setInput] = useState({
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

      {/* SignIn Start*/}
      <div className="min-h-screen min-w-screen bg-[#161d31] flex items-center justify-center">
        <div className="w-[500px] text-[#d0d2d6] p-2 overflow-y-auto py-5 ">
          <div className="bg-[#283046] p-4 rounded-md">
            {/* header */}
            <div className="mb-3 header">
              <h2 className="mb-2 text-2xl font-bold text-center text-transparent uppercase bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text font-primarySemiBold">
                Welcome to e-commerce
              </h2>

              <p className="text-sm text-center text-gray-500 font-primaryItalic ">
                Login To Your Account And Start Today
              </p>
            </div>
            {/* form */}
            <div className="form">
              <form onSubmit={handleSubmitForm}>
                {/* email */}
                <div className="flex flex-col my-3">
                  <label htmlFor="email" className="mb-2 font-primarySemiBold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular"
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* password */}
                <div className="flex flex-col my-3">
                  <label
                    htmlFor="password"
                    className="mb-2 font-primarySemiBold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular"
                    name="password"
                    value={input.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* button */}
                <button
                  type="submit"
                  className="w-full py-2 mb-3 text-white transition-all duration-300 bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg px-7 font-primarySemiBold"
                >
                  Sign In
                </button>
                {/* already have an account */}
                <div className="my-3">
                  <p className="flex items-center justify-center gap-1 font-primaryMedium">
                    Don't have an account ?
                    <Link
                      to="/register"
                      className="inline-block text-sm text-blue-500 transition-all duration-200 hover:underline font-primaryRegular"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
                {/* -or- */}
                <div className="flex items-center justify-center w-full my-3 ">
                  <div className="w-[45%] bg-slate-700 h-[1px] "></div>
                  <div className="w-[10%] flex items-center justify-center">
                    <span className="pb-1 font-primaryMedium">Or</span>
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

export default Login;
