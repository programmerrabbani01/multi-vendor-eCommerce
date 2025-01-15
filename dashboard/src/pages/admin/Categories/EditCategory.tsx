import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../components/MetaData.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store.ts";
import {
  getCategoryData,
  setMessageEmpty,
} from "../../../features/category/categorySlice.ts";
import useFormFields from "../../../hooks/useFormFields.ts";
import { updateCategory } from "../../../features/category/categoryApiSlice.ts";
import { ImCross } from "react-icons/im";
import { createToaster } from "../../../utils/tostify.ts";
import { RiseLoader } from "react-spinners";

export default function EditCategory() {
  const title = "Edit Category";

  const { id } = useParams<{ id: string }>();
  console.log("Editing Category ID:", id);

  const { category, error, message, loader } = useSelector(getCategoryData);

  const { input, handleInputChange, setInput } = useFormFields({
    name: "", // Default name is an empty string
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // get previous name and photo
  useEffect(() => {
    if (category && category.length > 0) {
      const categoryToEdit = category.find((c) => c._id === id);

      if (categoryToEdit) {
        setInput({
          name: categoryToEdit.name || "",
        });

        // Ensure photo is a string or set it to null
        setImagePreview(
          typeof categoryToEdit.photo === "string" ? categoryToEdit.photo : null
        );
      }
    }
  }, [category, id, setInput]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null); // Clear the selected image
    setImagePreview(null); // Clear the image preview
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      console.error("Category ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name);
    if (image) formData.append("categoryPhoto", image);

    try {
      const response = await dispatch(
        updateCategory({
          DataId: id,
          formData,
        })
      ).unwrap();

      if (response && response.category) {
        console.log("Category updated successfully:", response);
        navigate("/admin/categories");
      } else {
        console.error("Invalid response:", response);
      }
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

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

      {/* Start */}

      <div className="px-2 py-5 md:px-7">
        <div className="w-full pt-4 pl-4 pr-4 pb-6 bg-[#283046] text-[#d0d2d6] rounded-md ">
          {/* top */}
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-2xl font-primarySemiBold">Edit Category</h1>
            <Link
              to="/admin/categories"
              className="py-2 my-2 text-lg bg-indigo-500 rounded-md px-7 hover:shadow-indigo-500/50 hover:shadow-lg font-primaryMedium"
            >
              Categories
            </Link>
          </div>
          {/* form */}
          <div className="">
            <form onSubmit={handleSubmit}>
              {/* category Name */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="name" className="font-primarySemiBold">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Category Name"
                    onChange={handleInputChange}
                    value={input.name}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
                {/* Image Upload */}
                <div className="flex flex-col w-full gap-1 mb-5">
                  <label htmlFor="image" className="font-primarySemiBold">
                    Category Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="text-lg font-primaryMedium flex flex-col justify-center items-center w-full h-[238px] border border-dashed border-[#d0d2d6] hover:border-indigo-500 cursor-pointer"
                  >
                    {imagePreview ? (
                      <div className="relative flex items-center justify-center w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Category Preview"
                          className="object-contain max-h-[200px] w-full"
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
                      <span>Select an image</span>
                    )}
                  </label>
                </div>
              </div>

              {/* button */}
              <button
                type="submit"
                disabled={loader ? true : false}
                className="py-2 text-lg bg-blue-500 rounded-md px-7 hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
              >
                {loader ? (
                  <RiseLoader
                    size={10}
                    color="#fff"
                    cssOverride={loaderStyle}
                  />
                ) : (
                  "Update Category"
                )}
              </button>
            </form>
          </div>
          {/* form */}
        </div>
      </div>
    </>
  );
}
