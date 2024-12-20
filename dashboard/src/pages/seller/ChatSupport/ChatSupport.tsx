import MetaData from "../../../components/MetaData.tsx";

export default function ChatSupport() {
  const title = "Chat With Admin";

  return (
    <>
      <MetaData title={title} />

      {/* start */}
      <div className="px-2 py-5 lg:px-7">
        <div className="w-full h-[calc(100vh-140px)] px-4 py-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
          <div className="relative flex w-full h-full">
            {/* right */}
            <div className="w-full md:pl-4 ">
              {/* top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                  <div className="relative">
                    <img
                      src="/images/seller.png"
                      alt=""
                      className="max-w-[42px] w-[42px] h-[42px] border-green-500 border-2 p-[2px] rounded-full object-cover "
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0 "></div>
                  </div>
                  <h2 className="text-base font-primarySemiBold">
                    GOLAM RABBANI
                  </h2>
                </div>
              </div>
              {/* bottom */}
              <div className="py-4">
                <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto sidebar ">
                  {/* left message */}
                  <div className="flex items-center justify-start w-full">
                    <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                      <div className="">
                        <img
                          src="/images/seller.png"
                          alt=""
                          className="max-w-[38px] w-[38px] h-[38px] object-cover border-2 border-white rounded-full p-[3px] "
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center w-full px-2 py-1 bg-orange-500 rounded-sm shadow-lg shadow-orange-500/50 ">
                        <span className="">How are you ?</span>
                      </div>
                    </div>
                  </div>
                  {/* right message */}
                  <div className="flex items-center justify-end w-full">
                    <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                      <div className="flex flex-col items-start justify-center w-full px-2 py-1 bg-blue-500 rounded-sm shadow-lg shadow-blue-500/50 ">
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
