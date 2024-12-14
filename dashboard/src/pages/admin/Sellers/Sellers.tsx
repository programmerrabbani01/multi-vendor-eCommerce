import { useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import Pagination from "../../../components/Pagination.tsx";
import { FaUsersViewfinder } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Sellers() {
  const title = "Sellers";
  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <MetaData title={title} />

      {/*start  */}
      <div className="px-2 pt-5 lg:px-7">
        <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
          {/* select option & search option */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:flex-nowrap">
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
                  <th className="px-4 py-3" scope="col">
                    no
                  </th>
                  <th className="px-4 py-3" scope="col">
                    image
                  </th>
                  <th className="px-4 py-3" scope="col">
                    name
                  </th>
                  <th className="px-4 py-3" scope="col">
                    email
                  </th>
                  <th className="px-4 py-3" scope="col">
                    shop name
                  </th>
                  <th className="px-4 py-3" scope="col">
                    payment status
                  </th>
                  <th className="px-4 py-3" scope="col">
                    division
                  </th>
                  <th className="px-4 py-3" scope="col">
                    district
                  </th>
                  <th className="px-4 py-3" scope="col">
                    action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-b border-slate-700">
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    1
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <img
                      src="/images/product.png"
                      alt="image"
                      className="w-[45px] h-[45px] object-cover"
                    />
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">Rabbani</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">rab@gmail.com</span>
                  </td>
                  <td
                    className="px-4 py-2 break-words whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">Rabbani Multi Variate Store</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">Pending</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">Barishal</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">Patuakhali</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <div className="flex items-center justify-start gap-4">
                      <Link
                        to={`/admin/seller/details/1`}
                        className="p-[6px] text-white rounded bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 "
                      >
                        <FaUsersViewfinder />
                      </Link>
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
