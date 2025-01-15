import { Link } from "react-router-dom";
import MetaData from "../../../components/MetaData.tsx";
import { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getBrandData } from "../../../features/brand/brandSlice.ts";
import { getCategoryData } from "../../../features/category/categorySlice.ts";
// import { getProductData } from "../../../features/product/productSlice.ts";

import { Brand, Category } from "../../../types.ts";
import { AppDispatch, RootState } from "../../../app/store.ts";
import { getAllBrands } from "../../../features/brand/brandApiSlice.ts";
import { getAllCategories } from "../../../features/category/categoryApiSlice.ts";

export default function AddProduct() {
  const title = "Add Product";

  const [input, setInput] = useState({
    title: "",
    category: "",
    brand: "",
    price: "",
    description: "",
    stock: "",
    discount: "",
  });

  const { brand } = useSelector((state: RootState) => getBrandData(state)) || {
    brand: [],
  };
  const { category } = useSelector((state: RootState) =>
    getCategoryData(state)
  ) || { category: [] };
  // const { products, error, message, loader } = useSelector(getProductData);

  const [cateShow, setCatShow] = useState(false);
  const [brandShow, setBrandShow] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<{ url: string }[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]); // Typed state
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]); // Typed state
  const dispatch = useDispatch<AppDispatch>();
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  // Update the selection logic for categories
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(
      (prev) =>
        prev.includes(categoryName)
          ? prev.filter((c) => c !== categoryName) // Remove if already selected
          : [...prev, categoryName] // Add to the list
    );
  };

  // Update the selection logic for brands
  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(
      (prev) =>
        prev.includes(brandName)
          ? prev.filter((b) => b !== brandName) // Remove if already selected
          : [...prev, brandName] // Add to the list
    );
  };

  // handle Input Change

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle search category
  const categorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    // Map categories to ensure they have the right type and fallback id if missing
    const filteredCategories = (category || [])
      .map((c) => ({
        id: c.id || "defaultId", // Ensure id is either string or number
        name: c.name,
      }))
      .filter((c) => c.name.toLowerCase().includes(search));

    // Ensure filteredCategories is typed correctly as Category[].
    setFilteredCategories(filteredCategories as Category[]); // Type assertion
  };

  // Handle search brand
  const brandSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    // Map brands to ensure they have the right type and fallback id if missing
    const filteredBrands = (brand || [])
      .map((b) => ({
        id: b.id || "defaultId", // Ensure id is either string or number
        name: b.name,
      }))
      .filter((b) => b.name.toLowerCase().includes(search));

    // Ensure filteredBrands is typed correctly as Brand[].
    setFilteredBrands(filteredBrands as Brand[]); // Type assertion
  };

  useEffect(() => {
    if (category !== null) {
      // Assuming category objects don't have id, we can map over them and ensure the proper shape
      const fixedCategories = category.map((cat) => ({
        ...cat,
        id: cat.id || "defaultId", // Add a default id if missing
      }));
      setFilteredCategories(fixedCategories as Category[]);
    } else {
      setFilteredCategories([]); // Fallback if category is null
    }
    if (brand !== null) {
      // Assuming category objects don't have id, we can map over them and ensure the proper shape
      const fixedBrands = brand.map((brand) => ({
        ...brand,
        id: brand.id || "defaultId", // Add a default id if missing
      }));
      setFilteredBrands(fixedBrands as Brand[]);
    } else {
      setFilteredBrands([]); // Fallback if category is null
    }
  }, [category, brand]);

  // get all category and brand
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
  }, [dispatch]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target as Node)
      ) {
        setCatShow(false);
      }
      if (
        brandDropdownRef.current &&
        !brandDropdownRef.current.contains(e.target as Node)
      ) {
        setBrandShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle image

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = Array.from(files).filter(
      (file) => allowedTypes.includes(file.type) && file.size <= maxSize
    );

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
      const imageURLs = validFiles.map((file) => ({
        url: URL.createObjectURL(file),
      }));
      setImagePreview((prev) => [...prev, ...imageURLs]);
    } else {
      alert("Only JPG/PNG images under 5MB are allowed.");
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
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-2xl font-primarySemiBold">Add Product</h1>
            <Link
              to="/seller/allProducts"
              className="py-2 my-2 text-lg bg-indigo-500 rounded-md px-7 hover:shadow-indigo-500/50 hover:shadow-lg font-primaryMedium"
            >
              Products
            </Link>
          </div>
          {/* form */}
          <div className="">
            <form action="">
              {/* product & brand */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                {/* name */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="name" className="font-primarySemiBold">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Product Name"
                    onChange={handleInputChange}
                    value={input.title}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
                {/* brand */}
                <div className="relative flex flex-col w-full gap-1">
                  <label htmlFor="brand" className="font-primarySemiBold">
                    Product Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    placeholder="Search or Select Brand"
                    onFocus={() => setBrandShow(true)}
                    value={selectedBrand.join(", ")} // Use the selectedBrand state here
                    readOnly
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />

                  <div
                    ref={brandDropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 ${
                      brandShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div className="flex w-full px-4 py-2">
                      <input
                        onChange={brandSearch}
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="search"
                        className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                      />
                    </div>
                    <div className="pt-4"></div>
                    <div className="flex flex-col justify-start items-start h-[150px] overflow-y-scroll sidebar">
                      {Array.isArray(filteredBrands) &&
                        filteredBrands.map((b, i) => (
                          <div
                            key={i}
                            className={`px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                              selectedBrand.includes(b.name) && "bg-indigo-500"
                            }`}
                            onClick={() => {
                              setBrandShow(false);
                              handleBrandSelect(b.name); // Update selected brand
                              setSearchValue("");
                            }}
                          >
                            {b.name}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* category & stock */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                {/* category */}
                <div className="relative flex flex-col w-full gap-1">
                  <label htmlFor="category" className="font-primarySemiBold">
                    Product Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    placeholder="Search or Select Category"
                    onFocus={() => setCatShow(true)}
                    readOnly
                    value={selectedCategory.join(", ")} // Display selected categories
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                  <div
                    ref={categoryDropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 ${
                      cateShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div className="flex w-full px-4 py-2">
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
                      {Array.isArray(filteredCategories) &&
                        filteredCategories.map((c, i) => (
                          <div
                            key={i}
                            className={`px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                              selectedCategory.includes(c.name) &&
                              "bg-indigo-500"
                            }`}
                            onClick={() => {
                              setCatShow(false);
                              handleCategorySelect(c.name);
                              setSearchValue("");
                            }}
                          >
                            {c.name}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* stock */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="stock" className="font-primarySemiBold">
                    Product Stock
                  </label>
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
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                {/* price */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="price" className="font-primarySemiBold">
                    Product Price
                  </label>
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
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="discount" className="font-primarySemiBold">
                    Product Discount
                  </label>
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
              <div className="flex flex-col w-full gap-1 mb-5">
                <label htmlFor="description" className="font-primarySemiBold">
                  Product Description
                </label>
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
              <div className="grid w-full grid-cols-1 gap-3 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-4 sm:gap-4">
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
                        className="absolute z-10 p-2 rounded-full cursor-pointer top-1 right-1 bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 "
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
