import React, { useEffect, useState } from "react";
import MetaData from "../../components/MetaData.tsx";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../features/auth/authApiSlice.ts";
import { AppDispatch } from "../../app/store.ts";
import { createToaster } from "../../utils/tostify.ts";
import { getAuthData, setMessageEmpty } from "../../features/auth/authSlice.ts";
import { useNavigate } from "react-router-dom";

const AdminLogIn: React.FC = () => {
  const title = "Admin Sign-In";

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { error, message, user } = useSelector(getAuthData);
  const navigate = useNavigate();

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

    if (!input.email || !input.password) {
      createToaster("All Fields Are Required");
    } else {
      dispatch(adminLogin(input));

      // clear form
      setInput({
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
    }
    if (user) {
      // navigate("/");
    }
  }, [dispatch, error, message, user, navigate]);
  return (
    <>
      <MetaData title={title} />

      {/* SignIn Start*/}
      <div className="min-h-screen min-w-screen bg-[#161d31] flex items-center justify-center">
        <div className="w-[500px] text-[#d0d2d6] p-2 overflow-y-auto py-5 ">
          <div className="bg-[#283046] p-4 rounded-md">
            <div className="mb-3 header">
              <div className="h-[70px] flex justify-center items-center ">
                <div className="w-[180px] h-[50px] ">
                  <img
                    src="http://localhost:3001/images/logo.png"
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* form */}
            <div className="form">
              <form onSubmit={handleSubmitForm}>
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

                {/* button */}
                <button
                  type="submit"
                  className="w-full py-2 mb-3 text-white bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg px-7 transition-all duration-300 "
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogIn;
