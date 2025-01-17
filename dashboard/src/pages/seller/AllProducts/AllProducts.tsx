import { useEffect, useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import Pagination from "../../../components/Pagination.tsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductData,
  setMessageEmpty,
} from "../../../features/product/productSlice.ts";
import { AppDispatch } from "../../../app/store.ts";
import {
  deleteProduct,
  getAllProducts,
} from "../../../features/product/productApiSlice.ts";
import swal from "sweetalert";
import { createToaster } from "../../../utils/tostify.ts";

export default function AllProducts() {
  const title = "All Products";

  const { products, error, message, loader } = useSelector(getProductData);

  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // Utility function to truncate text after 10 words
  const truncateWords = (text: string, limit: number): string => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  // product filtering
  const filteredProducts =
    products?.filter((product) =>
      product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // product pagination
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * parPage,
    currentPage * parPage
  );

  // handle brand delete

  const handleDeleteProduct = (id: string | number) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then((willDelete: boolean) => {
        if (willDelete) {
          dispatch(deleteProduct(String(id)));
          // swal  ("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // get all products

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // message handler
  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

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
              onChange={(e) => setParPage(parseInt(e.target.value) || 5)}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                    color
                  </th>
                  <th className="px-4 py-3" scope="col">
                    size
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
                {paginatedProducts && paginatedProducts.length > 0 ? (
                  paginatedProducts?.map((product, index) => {
                    return (
                      <tr
                        key={product._id || index}
                        className="border-b border-slate-700"
                      >
                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          {index + 1}
                        </td>
                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          <img
                            src={
                              product.photos?.[0]?.url || "/default-image.jpg"
                            }
                            alt="image"
                            className="w-[45px] h-[45px] object-cover"
                          />
                        </td>
                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          {truncateWords(product.title, 4)}
                        </td>

                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          <span className="">
                            {Array.isArray(product?.category) &&
                            product?.category.length > 0 ? (
                              <div className="flex flex-col gap-1">
                                {product.category.map((cat, index) => (
                                  <div key={index}>
                                    {truncateWords(cat.name, 2)}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span>N/A</span>
                            )}
                          </span>
                        </td>
                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          {Array.isArray(product?.brand) &&
                          product?.brand.length > 0 ? (
                            <div className="flex flex-col gap-1">
                              {product.brand.map((br, index) => (
                                <div key={index}>
                                  {truncateWords(br.name, 1)}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span>N/A</span>
                          )}
                        </td>

                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          {product.colors && product.colors.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {product.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1 w-[calc(50%-0.5rem)]" // Adjust width for two items per row
                                >
                                  <div
                                    className="w-4 h-4 rounded-full"
                                    style={{
                                      backgroundColor:
                                        typeof color.colorCode === "string"
                                          ? color.colorCode
                                          : undefined,
                                    }}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span>N/A</span>
                          )}
                        </td>

                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          {(product.sizes as { name: string }[]).length > 0 ? (
                            <div className="flex flex-wrap gap-4">
                              {(product.sizes as { name: string }[]).map(
                                (size, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-1 w-[calc(50%-0.5rem)]"
                                  >
                                    {size.name}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <span>N/A</span>
                          )}
                        </td>

                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          <span className="">$ {product.price}</span>
                        </td>
                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          <span className="">{product.discount || "0%"}%</span>
                        </td>
                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          <span className="">{product.stock}</span>
                        </td>
                        <td
                          className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                          scope="col"
                        >
                          <div className="flex items-center justify-start gap-4">
                            <Link
                              to={`/seller/viewProduct/${product._id}`}
                              className="px-3 py-2 text-white rounded bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50 "
                            >
                              <GrOverview />
                            </Link>
                            <Link
                              to={`/seller/allProducts/editProduct/${product._id}`}
                              className="px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 "
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="px-3 py-2 text-white bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="px-4 pt-4 pb-2 text-center">
                      {loader ? (
                        <h1 className="text-2xl font-primaryMedium">
                          Loading...
                        </h1>
                      ) : (
                        <h1 className="text-2xl font-primaryMedium">
                          No product available
                        </h1>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          <div className="flex justify-end w-full mt-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={filteredProducts.length}
              parPage={parPage}
              showItem={3}
            />
          </div>
        </div>
      </div>
    </>
  );
}
