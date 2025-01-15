import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../components/MetaData.tsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store.ts";
import useFormFields from "../../../hooks/useFormFields.ts";
import { createToaster } from "../../../utils/tostify.ts";
import axios from "axios";
import { RiseLoader } from "react-spinners";
import {
  getSizeData,
  setMessageEmpty,
} from "../../../features/size/sizeSlice.ts";
import { updateSize } from "../../../features/size/sizeApiSlice.ts";

interface sizeValues {
  name: string; // Name of the size
}

export default function EditSize() {
  const title = "Edit Color";

  const { id } = useParams<{ id: string }>();

  const { sizes, error, message, loader } = useSelector(getSizeData);

  const { input, handleInputChange, setInput } = useFormFields({
    name: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // get previous name
  useEffect(() => {
    if (sizes && sizes.length > 0) {
      const sizesToEdit = sizes.find((s) => s._id === id);

      if (sizesToEdit) {
        setInput({
          name: sizesToEdit.name || "",
        });
      }
    }
  }, [sizes, id, setInput]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      createToaster("Size ID is missing", "error");
      return;
    }

    if (!input.name) {
      createToaster("Please fill out all fields", "error");
      return;
    }

    const colorData: sizeValues = {
      name: String(input.name),
    };

    try {
      await dispatch(updateSize({ id, values: colorData })).unwrap();
      createToaster("Size updated successfully!", "success");
      navigate("/admin/sizes"); // Redirect to the sizes list
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        createToaster(
          error.response?.data?.message || "Failed to update color",
          "error"
        );
      } else {
        createToaster("An unexpected error occurred", "error");
      }
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
            <h1 className="text-2xl font-primarySemiBold">Edit Size</h1>
            <Link
              to="/admin/sizes"
              className="py-2 my-2 text-lg bg-indigo-500 rounded-md px-7 hover:shadow-indigo-500/50 hover:shadow-lg font-primaryMedium"
            >
              Sizes
            </Link>
          </div>
          {/* form */}
          <div className="">
            <form onSubmit={handleSubmit}>
              {/* Size Name */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="name" className="font-primarySemiBold">
                    Size Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Size Name"
                    onChange={handleInputChange}
                    value={input.name}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
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
                  "Update Size"
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
