import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../components/MetaData.tsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store.ts";
import useFormFields from "../../../hooks/useFormFields.ts";
import { createToaster } from "../../../utils/tostify.ts";
import {
  getColorData,
  setMessageEmpty,
} from "../../../features/color/colorSlice.ts";
import { updateColor } from "../../../features/color/colorApiSlice.ts";
import axios from "axios";
import { RiseLoader } from "react-spinners";

interface ColorValues {
  name: string; // Name of the color
  colorCode: string; // Color code (e.g., a hex value or similar)
}

export default function EditColor() {
  const title = "Edit Color";

  const { id } = useParams<{ id: string }>();

  const { colors, error, message, loader } = useSelector(getColorData);

  const { input, handleInputChange, setInput } = useFormFields({
    name: "",
    colorCode: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // get previous name and photo
  useEffect(() => {
    if (colors && colors.length > 0) {
      const colorsToEdit = colors.find((c) => c._id === id);

      if (colorsToEdit) {
        setInput({
          name: colorsToEdit.name || "",
          colorCode: (colorsToEdit.colorCode as string | number) || "",
        });
      }
    }
  }, [colors, id, setInput]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) {
      createToaster("Color ID is missing", "error");
      return;
    }

    if (!input.name || !input.colorCode) {
      createToaster("Please fill out all fields", "error");
      return;
    }

    const colorData: ColorValues = {
      name: String(input.name),
      colorCode: String(input.colorCode),
    };

    try {
      await dispatch(updateColor({ id, values: colorData })).unwrap();
      createToaster("Color updated successfully!", "success");
      navigate("/admin/colors"); // Redirect to the colors list
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
      {" "}
      <MetaData title={title} />
      {/* Start */}
      <div className="px-2 py-5 md:px-7">
        <div className="w-full pt-4 pl-4 pr-4 pb-6 bg-[#283046] text-[#d0d2d6] rounded-md ">
          {/* top */}
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-2xl font-primarySemiBold">Edit Color</h1>
            <Link
              to="/admin/colors"
              className="py-2 my-2 text-lg bg-indigo-500 rounded-md px-7 hover:shadow-indigo-500/50 hover:shadow-lg font-primaryMedium"
            >
              Colors
            </Link>
          </div>
          {/* form */}
          <div className="">
            <form onSubmit={handleSubmit}>
              {/* category Name */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="name" className="font-primarySemiBold">
                    Color Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Color Name"
                    onChange={handleInputChange}
                    value={input.name}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="colorCode" className="font-primarySemiBold">
                    Color Code
                  </label>
                  <input
                    type="text"
                    name="colorCode"
                    id="colorCode"
                    placeholder="Color Code"
                    onChange={handleInputChange}
                    value={input.colorCode}
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
                  "Update Color"
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
