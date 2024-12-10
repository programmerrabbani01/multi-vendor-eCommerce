import { useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import { BsArrowBarDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination.tsx";

export default function Orders() {
  const title = "Orders";

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <>
      <MetaData title={title} />

      {/* start */}

      <div className="px-2 pt-5 lg:px-7">
        <div className="w-full p-4 bg-[#283046] rounded-md ">
          {/* select option & search option */}
          <div className="flex flex-wrap lg:flex-nowrap gap-2 items-center justify-between mb-4">
            {/* select */}
            <select
              onChange={(e) => setParPage(parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-700 focus:border-indigo-500 bg-[#283046] rounded-md outline-none text-[#d0d2d6] font-primaryRegular "
            >
              <option value="">Select Option</option>
              <option value="5">5</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
            {/* search */}
            <input
              type="text"
              className="px-4 py-2 border border-slate-700 focus:border-indigo-500 bg-[#283046] rounded-md outline-none text-[#d0d2d6] font-primaryRegular"
              placeholder="search"
            />
          </div>
          {/* table */}
          <div className="relative mt-5 overflow-x-auto">
            <div className="min-w-[800px] w-full text-sm text-left text-[#d0d2d6]">
              {/* table header */}
              <div className="items">
                <div className="text-sm text-[#d0d2d6] border-b border-slate-700 uppercase font-primaryMedium">
                  <div className="flex items-start justify-between">
                    <div className="py-3 w-[25%]">order id</div>
                    <div className="py-3 w-[13%]">price</div>
                    <div className="py-3 w-[18%]">payment status</div>
                    <div className="py-3 w-[18%]">order status</div>
                    <div className="py-3 w-[18%]">action</div>
                    <div className="py-3 w-[8%]">
                      <BsArrowBarDown />
                    </div>
                  </div>
                </div>
              </div>
              {/* table body */}
              <div className="">
                <div className="flex justify-between items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular">
                  <div className="py-4 w-[25%] whitespace-nowrap">
                    #2536585574
                  </div>
                  <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">
                    <Link to="">view</Link>
                  </div>
                  <div
                    onClick={() => setShow(!show)}
                    className="py-4 w-[8%] cursor-pointer whitespace-nowrap"
                  >
                    <BsArrowBarDown />
                  </div>
                </div>
                {/* sub order */}
                <div
                  className={
                    show
                      ? "block border-b border-slate-700 bg-slate-800"
                      : "hidden"
                  }
                >
                  <div className="flex justify-start items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular px-2">
                    <div className="py-4 w-[25%] whitespace-nowrap">
                      #2536585574
                    </div>
                    <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex justify-between items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular">
                  <div className="py-4 w-[25%] whitespace-nowrap">
                    #2536585574
                  </div>
                  <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">
                    <Link to="">view</Link>
                  </div>
                  <div
                    onClick={() => setShow(!show)}
                    className="py-4 w-[8%] cursor-pointer whitespace-nowrap"
                  >
                    <BsArrowBarDown />
                  </div>
                </div>
                {/* sub order */}
                <div
                  className={
                    show
                      ? "block border-b border-slate-700 bg-slate-800"
                      : "hidden"
                  }
                >
                  <div className="flex justify-start items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular px-2">
                    <div className="py-4 w-[25%] whitespace-nowrap">
                      #2536585574
                    </div>
                    <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex justify-between items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular">
                  <div className="py-4 w-[25%] whitespace-nowrap">
                    #2536585574
                  </div>
                  <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">
                    <Link to="">view</Link>
                  </div>
                  <div
                    onClick={() => setShow(!show)}
                    className="py-4 w-[8%] cursor-pointer whitespace-nowrap"
                  >
                    <BsArrowBarDown />
                  </div>
                </div>
                {/* sub order */}
                <div
                  className={
                    show
                      ? "block border-b border-slate-700 bg-slate-800"
                      : "hidden"
                  }
                >
                  <div className="flex justify-start items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular px-2">
                    <div className="py-4 w-[25%] whitespace-nowrap">
                      #2536585574
                    </div>
                    <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex justify-between items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular">
                  <div className="py-4 w-[25%] whitespace-nowrap">
                    #2536585574
                  </div>
                  <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">
                    <Link to="">view</Link>
                  </div>
                  <div
                    onClick={() => setShow(!show)}
                    className="py-4 w-[8%] cursor-pointer whitespace-nowrap"
                  >
                    <BsArrowBarDown />
                  </div>
                </div>
                {/* sub order */}
                <div
                  className={
                    show
                      ? "block border-b border-slate-700 bg-slate-800"
                      : "hidden"
                  }
                >
                  <div className="flex justify-start items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular px-2">
                    <div className="py-4 w-[25%] whitespace-nowrap">
                      #2536585574
                    </div>
                    <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex justify-between items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular">
                  <div className="py-4 w-[25%] whitespace-nowrap">
                    #2536585574
                  </div>
                  <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">
                    <Link to="">view</Link>
                  </div>
                  <div
                    onClick={() => setShow(!show)}
                    className="py-4 w-[8%] cursor-pointer whitespace-nowrap"
                  >
                    <BsArrowBarDown />
                  </div>
                </div>
                {/* sub order */}
                <div
                  className={
                    show
                      ? "block border-b border-slate-700 bg-slate-800"
                      : "hidden"
                  }
                >
                  <div className="flex justify-start items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular px-2">
                    <div className="py-4 w-[25%] whitespace-nowrap">
                      #2536585574
                    </div>
                    <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="flex justify-between items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular">
                  <div className="py-4 w-[25%] whitespace-nowrap">
                    #2536585574
                  </div>
                  <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">pending</div>
                  <div className="py-4 w-[18%] whitespace-nowrap">
                    <Link to="">view</Link>
                  </div>
                  <div
                    onClick={() => setShow(!show)}
                    className="py-4 w-[8%] cursor-pointer whitespace-nowrap"
                  >
                    <BsArrowBarDown />
                  </div>
                </div>
                {/* sub order */}
                <div
                  className={
                    show
                      ? "block border-b border-slate-700 bg-slate-800"
                      : "hidden"
                  }
                >
                  <div className="flex justify-start items-start border-b border-slate-700 text-[#d0d2d6] font-primaryRegular px-2">
                    <div className="py-4 w-[25%] whitespace-nowrap">
                      #2536585574
                    </div>
                    <div className="py-4 w-[13%] whitespace-nowrap">$ 650</div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                    <div className="py-4 w-[18%] whitespace-nowrap">
                      pending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* pagination */}
          <div className="flex justify-end w-full mt-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              parPage={parPage}
              showItem={3}
            />
          </div>
        </div>
      </div>
    </>
  );
}
