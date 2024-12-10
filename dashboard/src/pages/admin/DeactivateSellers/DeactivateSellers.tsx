import { useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import Pagination from "../../../components/Pagination.tsx";
import { FaUsersViewfinder } from "react-icons/fa6";

export default function DeactivateSellers() {
  const title = "Deactivate Sellers";

  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <MetaData title={title} />

      {/* start */}

      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
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
          <div className="relative overflow-x-auto sidebar2">
            <table className="min-w-[800px] w-full text-sm text-[#d0d2d6] text-left ">
              <thead className="text-sm text-[#d0d2d6] border-b border-slate-700 uppercase font-primaryMedium">
                <tr>
                  <th className="py-3 px-4" scope="col">
                    no
                  </th>
                  <th className="py-3 px-4" scope="col">
                    image
                  </th>
                  <th className="py-3 px-4" scope="col">
                    name
                  </th>
                  <th className="py-3 px-4" scope="col">
                    email
                  </th>

                  <th className="py-3 px-4" scope="col">
                    payment status
                  </th>
                  <th className="py-3 px-4" scope="col">
                    status
                  </th>
                  <th className="py-3 px-4" scope="col">
                    action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className=" border-b border-slate-700">
                  <td
                    className="py-2 px-4 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    1
                  </td>
                  <td
                    className="py-2 px-4 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <img
                      src="/images/product.png"
                      alt="image"
                      className="w-[45px] h-[45px] object-cover"
                    />
                  </td>
                  <td
                    className="py-2 px-4 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">Rabbani</span>
                  </td>
                  <td
                    className="py-2 px-4 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">rab@gmail.com</span>
                  </td>
                  <td
                    className="py-2 px-4 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">Pending</span>
                  </td>
                  <td
                    className="py-2 px-4 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">Deactice</span>
                  </td>

                  <td
                    className="py-2 px-4 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <div className="">
                      <button className="px-3 py-2 bg-cyan-500 text-white rounded hover:shadow-lg hover:shadow-cyan-500/50 ">
                        <FaUsersViewfinder />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
