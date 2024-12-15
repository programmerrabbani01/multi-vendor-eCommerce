import { useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import { IoMdClose } from "react-icons/io";

export default function ChatWithSeller() {
  const title = "Chat With Seller";

  const [show, setShow] = useState(false);

  return (
    <>
      <MetaData title={title} />

      {/* start */}

      <div className="px-2 py-5 lg:px-7">
        <div className="w-full h-[calc(100vh-140px)] px-4 py-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
          <div className="flex w-full h-full relative">
            <div
              className={`w-[280px] h-full absolute z-10 ${
                show ? "-left-[16px]" : "-[336px]"
              } md:left-0 md:relative transition-all duration-300`}
            >
              <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto ">
                <div className="flex justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 ">
                  <h2 className="text-2xl font-primaryMedium">Sellers</h2>
                  <span
                    onClick={() => setShow(true)}
                    className="block cursor-pointer md:hidden"
                  >
                    <IoMdClose />
                  </span>
                </div>
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
          </div>
        </div>
      </div>
    </>
  );
}
