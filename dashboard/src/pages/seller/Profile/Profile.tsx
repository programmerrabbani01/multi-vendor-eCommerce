import { BsImage } from "react-icons/bs";
import MetaData from "../../../components/MetaData.tsx";
import { FadeLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function Profile() {
  const title = "Profile";

  const image = true;
  const loading = false;
  const status = "active";
  const userInfo = true;

  return (
    <>
      <MetaData title={title} />
      {/* start */}
      <div className="px-2 py-5 lg:px-7">
        <div className="flex flex-wrap w-full gap-3 md:flex-nowrap">
          {/* left */}
          <div className="w-full md:w-6/12">
            <div className="w-full px-4 py-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
              {/* image */}
              <div className="flex items-center justify-center py-3">
                {image ? (
                  <label
                    htmlFor="img"
                    className="h-[210px] w-[300px] relative cursor-pointer p-3 overflow-hidden "
                  >
                    <img
                      src="/images/seller.png"
                      alt=""
                      className="object-contain w-full h-full"
                    />
                    {loading && (
                      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-slate-600 opacity-70">
                        <span>
                          <FadeLoader />
                        </span>
                      </div>
                    )}
                  </label>
                ) : (
                  <label
                    htmlFor="img"
                    className="flex justify-center items-center flex-col h-[210px] w-[300px] border border-dashed cursor-pointer border-[#d0d2d6] hover:border-indigo-500 relative "
                  >
                    <span>
                      <BsImage />
                    </span>
                    <span>Select Image</span>
                    {loading && (
                      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-slate-600 opacity-70">
                        <span>
                          <FadeLoader />
                        </span>
                      </div>
                    )}
                  </label>
                )}
                <input type="file" id="img" className="hidden" />
              </div>
              {/*  */}
              <div className="px-0 py-2 md:px-5">
                <div className="relative flex flex-col justify-between gap-2 p-4 text-sm rounded-md bg-slate-800 ">
                  {/* edit button */}

                  <div className="flex items-center justify-start gap-4">
                    <Link
                      to=""
                      className="absolute px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 right-2 top-2"
                    >
                      <FaEdit />
                    </Link>
                  </div>

                  {/* details */}

                  {/* name */}
                  <div className="flex items-center gap-2">
                    <span className="font-primaryMedium">Name :</span>
                    <span className="font-primaryRegular">
                      G M GOLAM RABBANI
                    </span>
                  </div>

                  {/* email */}
                  <div className="flex items-center gap-2">
                    <span className="font-primaryMedium">Email :</span>
                    <span className="font-primaryRegular">
                      rabbani@gmail.com
                    </span>
                  </div>

                  {/* role */}
                  <div className="flex items-center gap-2">
                    <span className="font-primaryMedium">Role :</span>
                    <span className="font-primaryRegular">Seller</span>
                  </div>

                  {/* status */}
                  <div className="flex items-center gap-2">
                    <span className="font-primaryMedium">Status :</span>
                    <span className="font-primaryRegular">Active</span>
                  </div>

                  {/* Payment Account */}
                  <div className="flex items-center gap-2">
                    <span className="font-primaryMedium">
                      Payment Account :
                    </span>
                    <p>
                      {status === "active" ? (
                        <span className="font-primaryRegular  bg-yellow-500 text-white text-xs ml-2 px-2 py-0.5 rounded shadow-lg hover:shadow-yellow-500/50">
                          Pending
                        </span>
                      ) : (
                        // <span
                        //   className={`font-primaryRegular text-white text-xs ml-2 px-2 py-0.5 rounded shadow-lg ${
                        //     status === "active"
                        //       ? "bg-green-500 hover:shadow-green-500/50"
                        //       : status === "pending"
                        //       ? "bg-yellow-500 hover:shadow-yellow-500/50"
                        //       : "bg-red-500 hover:shadow-red-500/50"
                        //   }`}
                        // >
                        //   {status === "active" && "Active"}
                        //   {status === "pending" && "Pending"}
                        //   {status === "rejected" && "Rejected"}
                        // </span>
                        <span className="font-primaryRegular bg-blue-500 text-white text-xs cursor-pointer ml-2 px-2 py-0.5 rounded shadow-lg hover:shadow-blue-500/50">
                          Click For Active
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {/* user info */}
              <div className="px-0 py-2 md:px-5">
                {!userInfo ? (
                  <form action="">
                    {/* shop name */}
                    <div className="flex flex-col w-full gap-1 mb-2">
                      <label
                        htmlFor="shopName"
                        className="mb-1 font-primarySemiBold"
                      >
                        Shop Name
                      </label>
                      <input
                        type="text"
                        name="shopName"
                        id="shopName"
                        placeholder="Shop Name"
                        className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular "
                      />
                    </div>
                    {/* division */}
                    <div className="flex flex-col w-full gap-1 mb-2">
                      <label
                        htmlFor="division"
                        className="mb-1 font-primarySemiBold"
                      >
                        Division
                      </label>
                      <input
                        type="text"
                        name="division"
                        id="division"
                        placeholder="Division"
                        className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular "
                      />
                    </div>
                    {/* district */}
                    <div className="flex flex-col w-full gap-1 mb-2">
                      <label
                        htmlFor="district"
                        className="mb-1 font-primarySemiBold"
                      >
                        District
                      </label>
                      <input
                        type="text"
                        name="district"
                        id="district"
                        placeholder="District"
                        className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular "
                      />
                    </div>
                    {/* subDistrict */}
                    <div className="flex flex-col w-full gap-1 mb-3">
                      <label
                        htmlFor="subDistrict"
                        className="mb-1 font-primarySemiBold"
                      >
                        Sub District
                      </label>
                      <input
                        type="text"
                        name="subDistrict"
                        id="subDistrict"
                        placeholder="Sub District"
                        className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular "
                      />
                    </div>
                    {/* button */}
                    <button
                      type="submit"
                      className="py-2 text-lg uppercase bg-blue-500 rounded-md px-7 hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <div className="relative flex flex-col justify-between gap-2 p-4 text-sm rounded-md bg-slate-800 ">
                    {/* edit button */}

                    <div className="flex items-center justify-start gap-4">
                      <Link
                        to=""
                        className="absolute px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 right-2 top-2"
                      >
                        <FaEdit />
                      </Link>
                    </div>

                    {/* details */}

                    {/* Shop Name */}
                    <div className="flex items-center gap-2">
                      <span className="font-primaryMedium">Shop Name :</span>
                      <span className="font-primaryRegular">
                        Rabbani's Variates Store
                      </span>
                    </div>

                    {/* Division */}
                    <div className="flex items-center gap-2">
                      <span className="font-primaryMedium">Division :</span>
                      <span className="font-primaryRegular">Barishal</span>
                    </div>

                    {/* District */}
                    <div className="flex items-center gap-2">
                      <span className="font-primaryMedium">District :</span>
                      <span className="font-primaryRegular">Patuakhali</span>
                    </div>

                    {/* Sub District */}
                    <div className="flex items-center gap-2">
                      <span className="font-primaryMedium">Sub District :</span>
                      <span className="font-primaryRegular">Patuakhali</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w-full md:w-6/12">
            <div className="w-full px-4 py-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
              {/* title */}

              <h1 className="mb-4 text-2xl font-primarySemiBold">
                Change Password
              </h1>

              {/* form */}
              <form action="">
                {/* email */}
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="email" className="mb-1 font-primarySemiBold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular "
                  />
                </div>
                {/* old password */}
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label
                    htmlFor="oldPassword"
                    className="mb-1 font-primarySemiBold"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    id="Old Password"
                    placeholder="oldPassword"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular "
                  />
                </div>
                {/* new password */}
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label
                    htmlFor="newPassword"
                    className="mb-1 font-primarySemiBold"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                    className="px-3 py-2 bg-transparent border outline-none border-slate-700 text-[#d0d2d6] focus:border-indigo-500 rounded-md overflow-hidden font-primaryRegular "
                  />
                </div>

                {/* button */}
                <button
                  type="submit"
                  className="py-2 text-lg uppercase bg-blue-500 rounded-md px-7 hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
