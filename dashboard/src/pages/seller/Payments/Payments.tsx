import { CgDollar } from "react-icons/cg";
import MetaData from "../../../components/MetaData.tsx";

import {
  FixedSizeList as List,
  ListChildComponentProps,
  ListProps,
} from "react-window";
import { forwardRef } from "react";

const handleOnWheel = ({ deltaY }: React.WheelEvent<HTMLDivElement>) => {
  console.log("handleOnWheel", deltaY);
};

const outerElementType = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} onWheel={handleOnWheel} {...props} />);

export default function Payments() {
  const title = "Payments";

  const Row = ({ index, style }: ListChildComponentProps) => {
    return (
      <div style={style} className="flex text-sm font-primaryRegular">
        <div className="w-[25%] p-2 whitespace-nowrap ">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap ">$ 454</div>
        <div className="w-[25%] p-2 whitespace-nowrap ">
          <span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs ">
            Pending
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap ">12 jun 2024</div>
      </div>
    );
  };

  return (
    <>
      <MetaData title={title} />

      {/* start */}

      <div className="px-2 py-5 md:px-7">
        {/* top cards */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {/* item */}
          <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-primarySemiBold ">$ 190</h2>
              <h4 className="text-base font-primaryRegular">Total Sales</h4>
            </div>
            <div className="w-[46px] h-[47px] bg-[#28c76f1f] rounded-full flex justify-center items-center animate-pulse">
              <CgDollar size={23} className="text-[#28c76f] shadow-lg" />
            </div>
          </div>
          {/* item */}
          <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-primarySemiBold ">$ 190</h2>
              <h4 className="text-base font-primaryRegular">
                Available Amount
              </h4>
            </div>
            <div className="w-[46px] h-[47px] bg-[#00cfe81f] rounded-full flex justify-center items-center animate-pulse">
              <CgDollar size={23} className="text-[#00cfe8] shadow-lg" />
            </div>
          </div>
          {/* item */}
          <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-primarySemiBold ">$ 0</h2>
              <h4 className="text-base font-primaryRegular">
                Withdrawal Amount
              </h4>
            </div>
            <div className="w-[46px] h-[47px] bg-[#7367f01f] rounded-full flex justify-center items-center animate-pulse">
              <CgDollar size={23} className="text-[#7367f0] shadow-lg" />
            </div>
          </div>
          {/* item */}
          <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-primarySemiBold ">$ 0</h2>
              <h4 className="text-base font-primaryRegular">Pending Amount</h4>
            </div>
            <div className="w-[46px] h-[47px] bg-[#e000e81f] rounded-full flex justify-center items-center animate-pulse">
              <CgDollar size={23} className="text-[#cd00e8] shadow-lg" />
            </div>
          </div>
        </div>
        {/* left & right section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4 ">
          {/* left -> Send Request */}
          <div className="bg-[#283046] text-[#d0d2d6] rounded-md p-5 ">
            {/* title */}
            <h2 className="text-xl uppercase font-primarySemiBold ">
              send request
            </h2>
            {/* form */}
            <div className="py-5">
              <form action="">
                <div className="flex gap-3 flex-wrap md:flex-nowrap">
                  <input
                    type="number"
                    min="0"
                    name="amount"
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium w-[79%]"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 text-lg bg-indigo-500 rounded-md hover:shadow-indigo-500/50 hover:shadow-lg font-primaryMedium"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* pending request table */}
            <div className="">
              <h2 className="text-xl uppercase font-primarySemiBold pb-4">
                pending request
              </h2>
              {/* table */}
              <div className="w-full overflow-x-auto sidebar2">
                {/* top */}
                <div className="flex bg-[#161d31] uppercase text-sm font-primaryMedium min-w-[340px] ">
                  <div className="w-[25%] p-2">no</div>
                  <div className="w-[25%] p-2">amount</div>
                  <div className="w-[25%] p-2">status</div>
                  <div className="w-[25%] p-2">date</div>
                </div>
                {/* bottom */}
                <div className="">
                  {
                    <List
                      style={{ minWidth: "340px" } as React.CSSProperties}
                      className="List sidebar"
                      width="100%"
                      height={350}
                      itemCount={20}
                      itemSize={35}
                      outerElementType={
                        outerElementType as ListProps["outerElementType"]
                      }
                    >
                      {Row}
                    </List>
                  }
                </div>
                {/*  */}
              </div>
            </div>
          </div>
          {/* right -> Success Withdraw */}
          <div className="bg-[#283046] text-[#d0d2d6] rounded-md p-5 ">
            {/* title */}
            <h2 className="text-xl uppercase font-primarySemiBold pb-4">
              success withdraw
            </h2>
            {/* table */}
            <div className="w-full overflow-x-auto sidebar2">
              {/* top */}
              <div className="flex bg-[#161d31] uppercase text-sm font-primaryMedium min-w-[340px] ">
                <div className="w-[25%] p-2">no</div>
                <div className="w-[25%] p-2">amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
              </div>
              {/* bottom */}
              <div className="">
                {
                  <List
                    style={{ minWidth: "340px" } as React.CSSProperties}
                    className="List sidebar"
                    width="100%"
                    height={350}
                    itemCount={20}
                    itemSize={35}
                    outerElementType={
                      outerElementType as ListProps["outerElementType"]
                    }
                  >
                    {Row}
                  </List>
                }
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
