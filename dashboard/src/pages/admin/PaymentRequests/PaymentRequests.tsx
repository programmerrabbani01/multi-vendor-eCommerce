import React, { forwardRef } from "react";
import MetaData from "../../../components/MetaData.tsx";
import {
  FixedSizeList as List,
  ListChildComponentProps,
  ListProps,
} from "react-window";

const handleOnWheel = ({ deltaY }: React.WheelEvent<HTMLDivElement>) => {
  console.log("handleOnWheel", deltaY);
};

const outerElementType = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} onWheel={handleOnWheel} {...props} />);

export default function PaymentRequests() {
  const title = "Payment Requests";

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
        <div className="w-[25%] p-2 whitespace-nowrap ">
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] rounded-sm cursor-pointer ">
            Confirm
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <MetaData title={title} />
      {/* start */}
      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
          <h2 className="text-2xl font-primarySemiBold uppercase pb-5 ">
            withdrawal request
          </h2>
          <div className="w-full">
            <div className="w-full overflow-x-auto sidebar2">
              {/* top */}
              <div className="flex bg-[#161d31] uppercase text-sm font-primaryMedium min-w-[340px] ">
                <div className="w-[25%] p-2">no</div>
                <div className="w-[25%] p-2">amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
                <div className="w-[25%] p-2">action</div>
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
