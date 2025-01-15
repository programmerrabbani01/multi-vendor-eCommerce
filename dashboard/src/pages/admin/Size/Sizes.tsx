import { useEffect, useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../../components/Pagination.tsx";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import useFormFields from "../../../hooks/useFormFields.ts";
import { createToaster } from "../../../utils/tostify.ts";
import { AppDispatch } from "../../../app/store.ts";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import {
  getSizeData,
  setMessageEmpty,
} from "../../../features/size/sizeSlice.ts";
import {
  createSize,
  deleteSize,
  getAllSizes,
} from "../../../features/size/sizeApiSlice.ts";

export default function Sizes() {
  const title = "Colors";

  const { sizes, error, message, loader } = useSelector(getSizeData);

  // Define the initial state directly
  const { input, handleInputChange, resetForm } = useFormFields({
    name: "",
  });

  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  // handle size delete

  const handleSizeDelete = (id: string | number) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then((willDelete: boolean) => {
        if (willDelete) {
          dispatch(deleteSize(String(id)));
          // swal  ("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // handle size creation
  const handleSizeCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createSize(input as { name: string }));

    resetForm();
    setShow(false);
  };

  // size filtering
  const filteredSizes =
    sizes?.filter((size) =>
      size?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // size pagination
  const paginatedSizes = filteredSizes?.slice(
    (currentPage - 1) * parPage,
    currentPage * parPage
  );

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

  // get all sizes
  useEffect(() => {
    dispatch(getAllSizes());
  }, [dispatch]);

  // style for loader

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "24px",
    color: "#fff",
    message: "0 auto",
  };
  return (
    <>
      <MetaData title={title} />
      {/* start */}
      <div className="px-2 pt-5 lg:px-7">
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md ">
          <h2 className="text-[#d0d2d6] text-base font-primaryMedium ">
            Sizes
          </h2>
          <button
            onClick={() => setShow(true)}
            className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-[#d0d2d6] rounded-sm text-sm font-primarySemiBold "
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap w-full gap-6 lg:flex-nowrap">
          {/* left side */}
          <div className="w-full lg:w-7/12">
            <div className="w-full p-4 bg-[#283046] rounded-md ">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-slate-700 focus:border-indigo-500 bg-[#283046] rounded-md outline-none text-[#d0d2d6] font-primaryRegular"
                  placeholder="search"
                />
              </div>
              {/* table */}
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-[#d0d2d6] text-left ">
                  <thead className="text-sm text-[#d0d2d6] border-b border-slate-700 uppercase font-primaryMedium">
                    <tr>
                      <th className="px-4 py-3" scope="col">
                        no
                      </th>
                      <th className="px-4 py-3" scope="col">
                        name
                      </th>
                      <th className="px-4 py-3" scope="col">
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {paginatedSizes && paginatedSizes.length > 0 ? (
                      paginatedSizes.map((size, index) => (
                        <tr key={index} className="border-b border-slate-700">
                          <td
                            className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                            scope="col"
                          >
                            {index + 1 + (currentPage - 1) * parPage}
                          </td>

                          <td
                            className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                            scope="col"
                          >
                            <span>{size.name}</span>
                          </td>

                          <td
                            className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                            scope="col"
                          >
                            <div className="flex items-center justify-start gap-4">
                              <Link
                                to={`/admin/sizes/editSize/${size._id}`}
                                className="px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50"
                              >
                                <FaEdit />
                              </Link>
                              <button
                                onClick={() => handleSizeDelete(size._id)}
                                className="px-3 py-2 text-white bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-2 text-center">
                          {loader ? "Loading..." : "No categories available"}
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
                  totalItem={filteredSizes.length}
                  parPage={parPage}
                  showItem={3}
                />
              </div>
            </div>
          </div>
          {/* right side */}
          <div
            className={`w-[320px] lg:w-5/12  lg:relative lg:right-0 fixed ${
              show ? "right-0" : "-right-[340px]"
            } z-10 lg:z-0 top-0 transition-all duration-500 `}
          >
            <div className="w-full pl-">
              <div className="bg-[#283046] lg:rounded-md h-screen lg:h-auto px-3 py-2 text-[#d0d2d6] ">
                <div className="flex items-center justify-between">
                  <h1 className="w-full mb-4 text-xl lg:text-center font-primaryMedium ">
                    Add A New Size
                  </h1>

                  <button
                    onClick={() => setShow(false)}
                    className="absolute z-20 block p-2 text-white bg-red-500 rounded-full shadow-md top-3 right-2 hover:bg-red-600 lg:hidden "
                  >
                    <ImCross size={10} />
                  </button>
                </div>
                {/* form */}
                <form onSubmit={handleSizeCreate}>
                  {/* name */}
                  <div className="flex flex-col w-full gap-2 my-3 mb-3">
                    <label
                      htmlFor="name"
                      className="text-lg font-primaryMedium"
                    >
                      Size Name
                    </label>
                    <input
                      type="text"
                      className="px-4 py-2 border border-slate-700 focus:border-indigo-500 bg-[#283046] rounded-md outline-none text-[#d0d2d6] font-primaryRegular"
                      placeholder="Type Size Name"
                      name="name"
                      value={input.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="my-3">
                    <button
                      type="submit"
                      disabled={loader ? true : false}
                      className="w-full py-2 text-lg bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
                    >
                      {loader ? (
                        <ScaleLoader
                          size={10}
                          color="#fff"
                          cssOverride={loaderStyle}
                        />
                      ) : (
                        "Add Size"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
