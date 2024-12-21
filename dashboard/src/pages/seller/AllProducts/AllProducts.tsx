import { useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import Pagination from "../../../components/Pagination.tsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const title = "All Products";

  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Utility function to truncate text after 10 words
  const truncateWords = (text: string, limit: number): string => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };
  return (
    <>
      <MetaData title={title} />

      {/* start */}

      <div className="px-2 py-5 md:px-7">
        <div className="w-full pt-4 pl-4 pr-4 pb-6 bg-[#283046] text-[#d0d2d6] rounded-md">
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
            <table className="w-full text-sm text-[#d0d2d6] text-left ">
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
                    category
                  </th>
                  <th className="px-4 py-3" scope="col">
                    brand
                  </th>
                  <th className="px-4 py-3" scope="col">
                    price
                  </th>
                  <th className="px-4 py-3" scope="col">
                    discount
                  </th>
                  <th className="px-4 py-3" scope="col">
                    stoke
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
                      src="/images/t-shirt.webp"
                      alt="image"
                      className="w-[45px] h-[45px] object-cover"
                    />
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span>
                      {truncateWords(
                        "Jersey T-Shirt Fabric Soft And Comfortable Premium Quality",
                        4
                      )}
                    </span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">T-Shirt</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">No Brand</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">$ 565</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">5%</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <span className="">100</span>
                  </td>
                  <td
                    className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                    scope="col"
                  >
                    <div className="flex items-center justify-start gap-4">
                      <Link
                        to={`/seller/viewProduct/1`}
                        className="px-3 py-2 text-white rounded bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 "
                      >
                        <GrOverview />
                      </Link>
                      <Link
                        to={`/seller/allProducts/editProduct/1`}
                        className="px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 "
                      >
                        <FaEdit />
                      </Link>
                      <button className="px-3 py-2 text-white bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash />
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
