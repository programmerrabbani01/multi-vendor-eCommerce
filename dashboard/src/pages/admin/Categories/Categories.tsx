import { useState } from "react";
import MetaData from "../../../components/MetaData.tsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../../components/Pagination.tsx";
import { BsImage } from "react-icons/bs";
import { ImCross } from "react-icons/im";

export default function Categories() {
  const title = "Categories";

  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State for selected image

  // change image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL); // Set the preview URL
      setSelectedImage(file); // Store the selected file
    }
  };

  // remove select image
  const handleRemoveImage = () => {
    setImagePreview(null); // Remove the preview
    setSelectedImage(null); // Clear the selected image
  };

  return (
    <>
      <MetaData title={title} />

      {/* start */}

      <div className="px-2 pt-5 lg:px-7">
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md ">
          <h2 className="text-[#d0d2d6] text-base font-primaryMedium ">
            Categories
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
              <div className="relative overflow-x-auto">
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
                        <span className="">perfume</span>
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <div className="flex items-center justify-start gap-4">
                          <button className="px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 ">
                            <FaEdit />
                          </button>
                          <button className="px-3 py-2 text-white bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        2
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <img
                          src="/images/product2.avif"
                          alt="image"
                          className="w-[45px] h-[45px] object-cover"
                        />
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <span className="">makeup</span>
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <div className="flex items-center justify-start gap-4">
                          <button className="px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 ">
                            <FaEdit />
                          </button>
                          <button className="px-3 py-2 text-white bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        3
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <img
                          src="/images/product3.jpeg"
                          alt="image"
                          className="w-[45px] h-[45px] object-cover"
                        />
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <span className="">shoes</span>
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <div className="flex items-center justify-start gap-4">
                          <button className="px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 ">
                            <FaEdit />
                          </button>
                          <button className="px-3 py-2 text-white bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        4
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <img
                          src="/images/product4.webp"
                          alt="image"
                          className="w-[45px] h-[45px] object-cover"
                        />
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <span className="">headphone</span>
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <div className="flex items-center justify-start gap-4">
                          <button className="px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 ">
                            <FaEdit />
                          </button>
                          <button className="px-3 py-2 text-white bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        5
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <img
                          src="/images/product5.png"
                          alt="image"
                          className="w-[45px] h-[45px] object-cover"
                        />
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <span className="">camera</span>
                      </td>
                      <td
                        className="px-4 py-2 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <div className="flex items-center justify-start gap-4">
                          <button className="px-3 py-2 text-white bg-blue-500 rounded hover:shadow-lg hover:shadow-blue-500/50 ">
                            <FaEdit />
                          </button>
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
                    Add A New Category
                  </h1>

                  <button
                    onClick={() => setShow(false)}
                    className="absolute z-20 block p-2 text-white bg-red-500 rounded-full shadow-md top-3 right-2 hover:bg-red-600 lg:hidden "
                  >
                    <ImCross size={10} />
                  </button>
                </div>
                {/* form */}
                <form>
                  {/* name */}
                  <div className="flex flex-col w-full gap-2 my-3 mb-3">
                    <label
                      htmlFor="name"
                      className="text-lg font-primaryMedium"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="px-4 py-2 border border-slate-700 focus:border-indigo-500 bg-[#283046] rounded-md outline-none text-[#d0d2d6] font-primaryRegular"
                      placeholder="Type Category Name"
                    />
                  </div>
                  {/* image */}
                  <div className="my-3">
                    <label
                      htmlFor="image"
                      className="text-lg font-primaryMedium flex flex-col justify-center items-center w-full h-[238px] border border-dashed border-[#d0d2d6] hover:border-indigo-500 cursor-pointer "
                    >
                      {imagePreview ? (
                        <div className="relative flex items-center justify-center w-full h-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-[200px] object-contain"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                          >
                            <ImCross size={10} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <BsImage size={20} />
                          <span>Select Image</span>
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <div className="my-3">
                    <button
                      type="submit"
                      className="w-full py-2 text-lg bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
                    >
                      Add Category
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
