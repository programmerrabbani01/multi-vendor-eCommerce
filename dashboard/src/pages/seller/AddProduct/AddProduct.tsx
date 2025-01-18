import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../../components/MetaData.tsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store.ts";
import { getAllCategories } from "../../../features/category/categoryApiSlice.ts";
import { getCategoryData } from "../../../features/category/categorySlice.ts";
import useFormFields from "../../../hooks/useFormFields.ts";
import { getBrandData } from "../../../features/brand/brandSlice.ts";
import { getAllBrands } from "../../../features/brand/brandApiSlice.ts";
import { getColorData } from "../../../features/color/colorSlice.ts";
import { getAllColors } from "../../../features/color/colorApiSlice.ts";
import { getSizeData } from "../../../features/size/sizeSlice.ts";
import { getAllSizes } from "../../../features/size/sizeApiSlice.ts";
import { BsImage } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import {
  getProductData,
  setMessageEmpty,
} from "../../../features/product/productSlice.ts";
import { createToaster } from "../../../utils/tostify.ts";
import { ScaleLoader } from "react-spinners";
import { createProductAPi } from "../../../features/product/productApiSlice.ts";

export default function AddProduct() {
  const title = "Add Product";

  const { input, handleInputChange, resetForm } = useFormFields({
    title: "",
    price: "",
    desc: "",
    stock: "",
    discount: "",
  });

  const { category } = useSelector(getCategoryData);
  const { brand } = useSelector(getBrandData);
  const { colors } = useSelector(getColorData);
  const { sizes } = useSelector(getSizeData);
  const { error, message, loader } = useSelector(getProductData);

  const [catShow, setCatShow] = useState(false);
  const [brandShow, setBrandShow] = useState(false);
  const [colorShow, setColorShow] = useState(false);
  const [sizeShow, setSizeShow] = useState(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const [filteredCategories, setFilteredCategories] = useState(category);
  const [filteredBrands, setFilteredBrands] = useState(brand);
  const [filteredColors, setFilteredColors] = useState(colors);
  const [filteredSizes, setFilteredSizes] = useState(sizes);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);

  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  const sizeDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);

  const [productPhoto, setProductPhoto] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<{ url: string }[]>([]);

  // Handle category selection for dropdowns
  const handleSelectCategory = (categoryId: string) => {
    if (selectedCategory.includes(categoryId)) {
      // Remove category if already selected
      setSelectedCategory(selectedCategory.filter((id) => id !== categoryId));
    } else {
      // Add category
      setSelectedCategory([...selectedCategory, categoryId]);
    }
  };
  // Handle search category
  const categorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    // Avoid errors if category is undefined or null
    const filtered = (category || []).filter((c) =>
      c.name?.toLowerCase().includes(search)
    );

    setFilteredCategories(filtered);
  };

  // Handle brand selection for dropdowns
  const handleSelectBrand = (brandId: string) => {
    if (selectedBrand.includes(brandId)) {
      // Remove brand if already selected
      setSelectedBrand(selectedBrand.filter((id) => id !== brandId));
    } else {
      // Add brand
      setSelectedBrand([...selectedBrand, brandId]);
    }
  };
  // Handle search brand
  const brandSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    // Avoid errors if brand is undefined or null
    const filtered = (brand || []).filter((b) =>
      b.name?.toLowerCase().includes(search)
    );

    setFilteredBrands(filtered);
  };

  // Handle color selection for dropdowns
  const handleSelectColor = (colorsId: string) => {
    if (selectedColor.includes(colorsId)) {
      // Remove color if already selected
      setSelectedColor(selectedColor.filter((id) => id !== colorsId));
    } else {
      // Add color
      setSelectedColor([...selectedColor, colorsId]);
    }
  };
  // Handle search color
  const colorSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    // Avoid errors if color is undefined or null
    const filtered = (colors || []).filter((b) =>
      b.name?.toLowerCase().includes(search)
    );

    setFilteredColors(filtered);
  };

  // Handle size selection for dropdowns
  const handleSelectSize = (sizesId: string) => {
    if (selectedSize.includes(sizesId)) {
      // Remove size if already selected
      setSelectedSize(selectedSize.filter((id) => id !== sizesId));
    } else {
      // Add size
      setSelectedSize([...selectedSize, sizesId]);
    }
  };
  // Handle search size
  const sizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    // Avoid errors if color is undefined or null
    const filtered = (colors || []).filter((b) =>
      b.name?.toLowerCase().includes(search)
    );

    setFilteredColors(filtered);
  };

  useEffect(() => {
    if (selectedBrand.length > 0) {
      console.log("Selected Brand IDs:", selectedBrand);
    }
    if (selectedCategory.length > 0) {
      console.log("Selected Category IDs:", selectedCategory);
    }
    if (selectedColor.length > 0) {
      console.log("Selected Color IDs:", selectedColor);
    }
    if (selectedSize.length > 0) {
      console.log("Selected Size IDs:", selectedSize);
    }
  }, [selectedBrand, selectedCategory, selectedColor, selectedSize]);

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
      setProductPhoto((prev) => [...prev, ...validFiles]);
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
    setProductPhoto((prev) => prev.filter((_, i) => i !== index)); // Remove the selected image from the `images` array
    setImagePreview((prev) => prev.filter((_, i) => i !== index)); // Remove the corresponding preview
  };

  // create product
  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !input.title ||
      !input.price ||
      !input.stock ||
      !selectedBrand.length ||
      !selectedCategory.length
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "title",
      typeof input.title === "string" ? input.title.trim() : String(input.title)
    );
    formData.append(
      "desc",
      typeof input.desc === "string" ? input.desc.trim() : String(input.desc)
    );
    formData.append(
      "price",
      typeof input.price === "string" ? input.price.trim() : String(input.price)
    );
    formData.append(
      "stock",
      typeof input.stock === "string" ? input.stock.trim() : String(input.stock)
    );
    formData.append(
      "discount",
      typeof input.discount === "string"
        ? input.discount.trim()
        : String(input.discount)
    );

    formData.append("brand", JSON.stringify(selectedBrand));
    formData.append("category", JSON.stringify(selectedCategory));
    formData.append("colors", JSON.stringify(selectedColor));
    formData.append("sizes", JSON.stringify(selectedSize));

    productPhoto.forEach((photo) => formData.append("productPhoto", photo));

    try {
      await dispatch(createProductAPi(formData)).unwrap();
      // Reset the form after successful creation
      resetForm(); // Reset the form using the hook method
      setSelectedCategory([]);
      setSelectedBrand([]);
      setSelectedColor([]);
      setSelectedSize([]);
      setProductPhoto([]);
      setImagePreview([]);
    } catch (error) {
      console.error("Error creating product:", error);
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
      navigate(`/seller/allProducts`);
    }
  }, [dispatch, error, message, navigate]);

  // style for loader

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "24px",
    margin: "0 auto",
  };

  useEffect(() => {
    setFilteredCategories(category);
    setFilteredBrands(brand);
    setFilteredColors(colors);
    setFilteredSizes(sizes);
  }, [category, brand, colors, sizes]);

  // get all category and brand
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    dispatch(getAllColors());
    dispatch(getAllSizes());
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
      if (
        colorDropdownRef.current &&
        !colorDropdownRef.current.contains(e.target as Node)
      ) {
        setColorShow(false);
      }
      if (
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(e.target as Node)
      ) {
        setSizeShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <form onSubmit={handleCreateProduct}>
              {/* product & brand */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                {/* name */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="name" className="font-primarySemiBold">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="name"
                    placeholder="Product title"
                    onChange={handleInputChange}
                    value={input.title}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
                {/* brand */}

                <div className="relative flex flex-col w-full gap-1">
                  {/* Label */}
                  <label htmlFor="brand" className="font-primarySemiBold">
                    Product Brand
                  </label>

                  {/* Input Field */}
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    placeholder="Search or Select Brand"
                    onFocus={() => setBrandShow(true)} // Show the dropdown on focus
                    value={selectedBrand.join(", ")} // Display selected brands as comma-separated values
                    readOnly
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 font-primaryMedium"
                  />

                  {/* Dropdown */}
                  {brandShow && (
                    <div
                      ref={brandDropdownRef}
                      className="absolute top-[101%] bg-slate-800 w-full z-10 rounded-md shadow-lg transition-transform transform scale-100"
                    >
                      {/* Search Input */}
                      <div className="flex w-full px-4 py-2">
                        <input
                          type="text"
                          name="search"
                          value={searchValue}
                          placeholder="Search brands..."
                          onChange={brandSearch}
                          className="w-full px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 font-primaryMedium"
                        />
                      </div>

                      {/* Brand List */}
                      <div className="flex flex-col justify-start items-start h-[150px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent">
                        {filteredBrands?.map((b) => (
                          <div
                            key={b._id}
                            className={`px-4 py-2 text-sm font-primaryRegular w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
                              selectedBrand.includes(b._id)
                                ? "bg-indigo-500 text-white"
                                : ""
                            }`}
                            onClick={() => {
                              handleSelectBrand(b._id);
                              setBrandShow(false); // Close dropdown
                              setSearchValue(""); // Clear search field
                            }}
                          >
                            {b.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* category & stock */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                {/* category */}
                <div className="relative flex flex-col w-full gap-1">
                  {/* Label */}
                  <label htmlFor="category" className="font-primarySemiBold">
                    Product Category
                  </label>

                  {/* Input Field */}
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Search or Select Category"
                    onFocus={() => setCatShow(true)} // Show the dropdown on focus
                    value={selectedCategory.join(", ")} // Display selected brands as comma-separated values
                    readOnly
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 font-primaryMedium"
                  />

                  {/* Dropdown */}
                  {catShow && (
                    <div
                      ref={categoryDropdownRef}
                      className="absolute top-[101%] bg-slate-800 w-full z-10 rounded-md shadow-lg transition-transform transform scale-100"
                    >
                      {/* Search Input */}
                      <div className="flex w-full px-4 py-2">
                        <input
                          type="text"
                          name="search"
                          value={searchValue}
                          placeholder="Search Categories..."
                          onChange={categorySearch}
                          className="w-full px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 font-primaryMedium"
                        />
                      </div>

                      {/* category List */}
                      <div className="flex flex-col justify-start items-start h-[150px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent">
                        {filteredCategories?.map((c) => (
                          <div
                            key={c._id}
                            className={`px-4 py-2 text-sm font-primaryRegular w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
                              selectedCategory.includes(c._id)
                                ? "bg-indigo-500 text-white"
                                : ""
                            }`}
                            onClick={() => {
                              handleSelectCategory(c._id);
                              setCatShow(false); // Close dropdown
                              setSearchValue(""); // Clear search field
                            }}
                          >
                            {c.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
              {/* size and color */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                {/* color */}

                <div className="relative flex flex-col w-full gap-1">
                  <label htmlFor="color" className="font-primarySemiBold">
                    Product Colors
                  </label>
                  <input
                    type="text"
                    id="color"
                    placeholder="Search or Select Colors"
                    onClick={() => setColorShow((prev) => !prev)}
                    readOnly
                    value={selectedColor.join(", ")} // Display selected colors
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                  <div
                    ref={colorDropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 z-10 ${
                      colorShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    {/* Search Input */}
                    <div className="flex w-full px-4 py-2">
                      <input
                        onChange={colorSearch}
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="Search"
                        className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                      />
                    </div>
                    <div className="pt-4"></div>

                    {/* Colors List */}
                    <div className="flex flex-col justify-start items-start h-[150px] overflow-y-scroll sidebar">
                      {filteredColors?.map((color) => (
                        <div
                          key={color._id}
                          className={`flex items-center gap-2 px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                            selectedColor.includes(color._id) && "bg-indigo-500"
                          }`}
                          onClick={() => {
                            handleSelectColor(color._id);
                            setColorShow(false);
                            setSearchValue("");
                          }}
                        >
                          {/* Color Circle */}
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor:
                                typeof color.colorCode === "string"
                                  ? color.colorCode
                                  : undefined,
                            }}
                          ></div>
                          {color.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* size */}
                <div className="relative flex flex-col w-full gap-1">
                  <label htmlFor="size" className="font-primarySemiBold">
                    Product Sizes
                  </label>
                  <input
                    type="text"
                    id="size"
                    placeholder="Search or Select Size"
                    onClick={() => setSizeShow((prev) => !prev)}
                    readOnly
                    value={selectedSize.join(", ")}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                  <div
                    ref={sizeDropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 z-10 ${
                      sizeShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    {/* Search Input */}
                    <div className="flex w-full px-4 py-2">
                      <input
                        onChange={sizeSearch}
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="Search"
                        className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                      />
                    </div>
                    <div className="pt-4"></div>

                    {/* Sizes List */}
                    <div className="flex flex-col justify-start items-start h-[150px] overflow-y-scroll sidebar">
                      {filteredSizes?.map((size) => (
                        <div
                          key={size._id}
                          className={`px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                            selectedSize.includes(size._id) && "bg-indigo-500"
                          }`}
                          onClick={() => {
                            handleSelectSize(size._id);
                            setSearchValue("");
                            setSizeShow(false);
                          }}
                        >
                          {size.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* description */}
              <div className="flex flex-col w-full gap-1 mb-5">
                <label htmlFor="desc" className="font-primarySemiBold">
                  Product Description
                </label>
                <textarea
                  name="desc"
                  id="desc"
                  rows={4}
                  placeholder="Product Description"
                  onChange={handleInputChange}
                  value={input.desc}
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
                        className="object-contain w-full h-full rounded-md"
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
                disabled={loader ? true : false}
                className="w-full py-2 text-lg bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
              >
                {loader ? (
                  <ScaleLoader
                    height={15}
                    width={5}
                    radius={2}
                    margin={2}
                    color="#fff"
                    cssOverride={loaderStyle} // Valid CSS properties
                  />
                ) : (
                  "Add Product"
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
