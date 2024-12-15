import { useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";

export default function ChatWithSeller() {
  const title = "Chat With Seller";

  const [show, setShow] = useState(false);
  const sellerId = 32;

  return (
    <>
      <MetaData title={title} />

      {/* start */}

      <div className="px-2 py-5 lg:px-7">
        <div className="w-full h-[calc(100vh-140px)] px-4 py-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
          <div className="flex w-full h-full relative">
            {/* left */}
            <div
              className={`w-[280px] h-full absolute z-10 ${
                show ? "-left-[16px]" : "-left-[336px]"
              } md:left-0 md:relative transition-all duration-300 `}
            >
              <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto sidebar">
                <div className="flex justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 ">
                  <h2 className="text-2xl font-primaryMedium">Sellers</h2>
                  <span
                    onClick={() => setShow(!show)}
                    className="block cursor-pointer md:hidden"
                  >
                    <IoMdClose />
                  </span>
                </div>
                {/* item start */}
                <div
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-sm cursor-pointer bg-slate-700`}
                >
                  <div className="relative">
                    <img
                      src="/images/seller.png"
                      alt=""
                      className="max-w-[38px] w-[38px] h-[38px] border-white border-2 p-[2px] rounded-full object-cover "
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0 "></div>
                  </div>
                  <div className="flex justify-center items-start flex-col w-full ">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-primarySemiBold">
                        GOLAM RABBANI
                      </h2>
                      {/* <span>Hello ! How are you ?sss</span> */}
                    </div>
                    {/* <span className="text-sm font-primaryRegular">
                      2 min ago
                    </span> */}
                  </div>
                </div>

                {/* item end */}
                {/* item start */}
                <div
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-sm cursor-pointer `}
                >
                  <div className="relative">
                    <img
                      src="/images/seller.png"
                      alt=""
                      className="max-w-[38px] w-[38px] h-[38px] border-white border-2 p-[2px] rounded-full object-cover "
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0 "></div>
                  </div>
                  <div className="flex justify-center items-start flex-col w-full ">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-primarySemiBold">
                        GOLAM RABBANI
                      </h2>
                      {/* <span>Hello ! How are you ?sss</span> */}
                    </div>
                    {/* <span className="text-sm font-primaryRegular">
                      2 min ago
                    </span> */}
                  </div>
                </div>

                {/* item end */}
                {/* item start */}
                <div
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-sm cursor-pointer `}
                >
                  <div className="relative">
                    <img
                      src="/images/seller.png"
                      alt=""
                      className="max-w-[38px] w-[38px] h-[38px] border-white border-2 p-[2px] rounded-full object-cover "
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0 "></div>
                  </div>
                  <div className="flex justify-center items-start flex-col w-full ">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-primarySemiBold">
                        GOLAM RABBANI
                      </h2>
                      {/* <span>Hello ! How are you ?sss</span> */}
                    </div>
                    {/* <span className="text-sm font-primaryRegular">
                      2 min ago
                    </span> */}
                  </div>
                </div>

                {/* item end */}
                {/* item start */}
                <div
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-sm cursor-pointer `}
                >
                  <div className="relative">
                    <img
                      src="/images/seller.png"
                      alt=""
                      className="max-w-[38px] w-[38px] h-[38px] border-white border-2 p-[2px] rounded-full object-cover "
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0 "></div>
                  </div>
                  <div className="flex justify-center items-start flex-col w-full ">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-primarySemiBold">
                        GOLAM RABBANI
                      </h2>
                      {/* <span>Hello ! How are you ?sss</span> */}
                    </div>
                    {/* <span className="text-sm font-primaryRegular">
                      2 min ago
                    </span> */}
                  </div>
                </div>

                {/* item end */}
              </div>
            </div>
            {/* right */}
            <div className="w-full md:w-[calc(100%-200px)] md:pl-4 ">
              {/* top */}
              <div className="flex justify-between items-center">
                {sellerId && (
                  <div className="flex justify-start items-center gap-3">
                    <div className="relative">
                      <img
                        src="/images/seller.png"
                        alt=""
                        className="max-w-[42px] w-[42px] h-[42px] border-green-500 border-2 p-[2px] rounded-full object-cover "
                      />
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0 "></div>
                    </div>
                  </div>
                )}
                <div
                  onClick={() => setShow(!show)}
                  className="w-[35px] h-[35px] bg-blue-500 shadow-lg hover:shadow-blue-500/50 rounded-sm cursor-pointer flex justify-center items-center md:hidden "
                >
                  <FaList />
                </div>
              </div>
              {/* bottom */}
              <div className="py-4">
                <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto sidebar ">
                  {/* left message */}
                  <div className="w-full flex justify-start items-center">
                    <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                      <div className="">
                        <img
                          src="/images/seller.png"
                          alt=""
                          className="max-w-[38px] w-[38px] h-[38px] object-cover border-2 border-white rounded-full p-[3px] "
                        />
                      </div>
                      <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 py-1 px-2 rounded-sm ">
                        <span className="">How are you ?</span>
                      </div>
                    </div>
                  </div>
                  {/* right message */}
                  <div className="w-full flex justify-end items-center">
                    <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                      <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 py-1 px-2 rounded-sm ">
                        <span className="">How are you ?</span>
                      </div>
                      <div className="">
                        <img
                          src="/images/seller.png"
                          alt=""
                          className="max-w-[38px] w-[38px] h-[38px] object-cover border-2 border-white rounded-full p-[3px] "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form action="" className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type Your Message"
                  className="w-full flex justify-between items-center px-2 py-[5px] border border-slate-700 outline-none focus:border-indigo-500 rounded-md bg-transparent "
                />
                <button
                  type="submit"
                  className="bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 w-[75px] h-[35px] rounded-md flex justify-center items-center font-primarySemiBold text-white "
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
