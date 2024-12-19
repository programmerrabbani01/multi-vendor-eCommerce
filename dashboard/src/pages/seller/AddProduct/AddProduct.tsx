import { Link } from "react-router-dom";
import MetaData from "../../../components/MetaData.tsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { Category } from "../../../types.ts";
import { BsImage } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

export default function AddProduct() {
  const title = "Add Product";

  const [input, setInput] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    brand: "",
    stock: "",
    discount: "",
  });

  const [cateShow, setCatShow] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<{ url: string }[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  // Memoize the categories array to avoid re-initialization on every render
  const categories: Category[] = useMemo(
    () => [
      { id: 1, name: "Electronics" },
      { id: 2, name: "Clothing" },
      { id: 3, name: "Home & Garden" },
      { id: 4, name: "Sports & Outdoors" },
      { id: 5, name: "Beauty & Health" },
      { id: 6, name: "Books & Stationery" },
      { id: 7, name: "Toys & Hobbies" },
      { id: 8, name: "Movies & Music" },
      { id: 9, name: "Business & Finance" },
      { id: 10, name: "Other" },
    ],
    []
  );

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle search category

  const categorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);
    setAllCategory(
      categories.filter((c) => c.name.toLowerCase().includes(search))
    );
  };
  //
  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCatShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle image

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // `files` is FileList | null
    if (files && files.length > 0) {
      const filesArray = Array.from(files); // Convert FileList to an array
      setImages((prev) => [...prev, ...filesArray]);

      const imageURLs = filesArray.map((file) => ({
        url: URL.createObjectURL(file),
      }));
      setImagePreview((prev) => [...prev, ...imageURLs]);
    }
  };

  //  handle remove images
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index)); // Remove the selected image from the `images` array
    setImagePreview((prev) => prev.filter((_, i) => i !== index)); // Remove the corresponding preview
  };

  return (
    <>
      <MetaData title={title} />

      {/* Start */}

      <div className="px-2 py-5 md:px-7">
        <div className="w-full pt-4 pl-4 pr-4 pb-6 bg-[#283046] text-[#d0d2d6] rounded-md ">
          {/* top */}
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-primarySemiBold">Add Product</h1>
            <Link
              to="/seller/allProducts"
              className="px-7 py-2 my-2 text-lg bg-indigo-500 rounded-md hover:shadow-indigo-500/50 hover:shadow-lg font-primaryMedium"
            >
              Products
            </Link>
          </div>
          {/* form */}
          <div className="">
            <form action="">
              {/* product & brand */}
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
                {/* name */}
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Product Name"
                    onChange={handleInputChange}
                    value={input.name}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
                {/* brand */}
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="brand">Product Brand</label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    placeholder="Product brand"
                    onChange={handleInputChange}
                    value={input.brand}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
              </div>
              {/* category & stock */}
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
                {/* category */}
                <div className="flex flex-col gap-1 w-full relative">
                  <label htmlFor="category">Product Category</label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Search or Select Category"
                    onFocus={() => setCatShow(true)} // Show dropdown on focus
                    value={category} // Bind selected category
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                  <div
                    ref={dropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 ${
                      cateShow ? "scale-100" : "scale-0"
                    } `}
                  >
                    <div className="px-4 py-2 flex w-full">
                      <input
                        onChange={categorySearch}
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="search"
                        className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                      />
                    </div>
                    <div className="pt-4"></div>
                    <div className="flex flex-col justify-start items-start h-[150px] overflow-y-scroll sidebar">
                      {Array.isArray(allCategory) &&
                        allCategory.map((c, i) => (
                          <div
                            key={i}
                            className={`px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                              category === c.name && "bg-indigo-500"
                            }`}
                            onClick={() => {
                              setCatShow(false);
                              setCategory(c.name);
                              setSearchValue("");
                              setAllCategory(categories);
                            }}
                          >
                            {c.name}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* stock */}
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="stock">Product Stock</label>
                  <input
                    type="number"
                    min="0"
                    name="stock"
                    id="stock"
                    placeholder="Product stock"
                    onChange={handleInputChange}
                    value={input.stock}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
              </div>
              {/* price & discount */}
              <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
                {/* price */}
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="price">Product Price</label>
                  <input
                    type="number"
                    min="0"
                    name="price"
                    id="price"
                    placeholder="Product Price"
                    onChange={handleInputChange}
                    value={input.price}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
                {/* discount */}
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="discount">Product Discount</label>
                  <input
                    type="number"
                    min="0"
                    name="discount"
                    id="discount"
                    placeholder="Product Discount"
                    onChange={handleInputChange}
                    value={input.discount}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
              </div>
              {/* description */}
              <div className="flex flex-col gap-1 mb-5 w-full">
                <label htmlFor="description">Product Description</label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  placeholder="Product Description"
                  onChange={handleInputChange}
                  value={input.description}
                  className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                ></textarea>
              </div>
              {/* image */}
              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 md:gap-4 sm:gap-4 w-full mb-4">
                {/* image preview */}
                {imagePreview.map((img, i) => {
                  return (
                    <div key={i} className="h-[180px] relative">
                      <img
                        src={img.url}
                        alt="preview"
                        className="object-cover w-full h-full rounded-md"
                      />
                      <div
                        className="absolute top-1 right-1 p-2 z-10 bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 cursor-pointer rounded-full "
                        onClick={() => removeImage(i)}
                      >
                        <IoCloseSharp />
                      </div>
                    </div>
                  );
                })}
                {/* select image */}
                <label
                  className=" flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full "
                  htmlFor="image"
                >
                  <span>
                    <BsImage />
                  </span>
                  <span className="font-primaryMedium">Select Image</span>
                </label>
                <input
                  multiple
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
              {/* button */}
              <button
                type="submit"
                className="w-full py-2 text-lg bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
              >
                Add Product
              </button>
            </form>
          </div>
          {/* form */}
        </div>
      </div>
    </>
  );
}
