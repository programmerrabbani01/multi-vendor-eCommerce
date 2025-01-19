import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../../components/MetaData.tsx";
import { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import useFormFields from "../../../hooks/useFormFields.ts";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryData } from "../../../features/category/categorySlice.ts";
import { getBrandData } from "../../../features/brand/brandSlice.ts";
import {
  getProductData,
  setMessageEmpty,
} from "../../../features/product/productSlice.ts";
import { getAllCategories } from "../../../features/category/categoryApiSlice.ts";
import { getAllBrands } from "../../../features/brand/brandApiSlice.ts";
import { AppDispatch } from "../../../app/store.ts";
import { RiseLoader } from "react-spinners";
import { createToaster } from "../../../utils/tostify.ts";
import { updateProductApi } from "../../../features/product/productApiSlice.ts";
import { Photo } from "../../../types.ts";
import { getColorData } from "../../../features/color/colorSlice.ts";
import { getSizeData } from "../../../features/size/sizeSlice.ts";
import { getAllColors } from "../../../features/color/colorApiSlice.ts";
import { getAllSizes } from "../../../features/size/sizeApiSlice.ts";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface ImageObject {
  url?: string;
  public_id?: string;
}

interface Category {
  _id: string;
}
interface Brand {
  _id: string;
}
interface Color {
  _id: string;
}
interface Size {
  _id: string;
}
interface Product {
  _id: string;
  title: string;
  desc: string;
  photos?: Photo[];
  category?: Category[];
  brand?: Brand[];
  colors?: Color[];
  Sizes?: Size[];
  price: number;
  discount?: number;
  stock: number;
  [key: string]: unknown;
}

export default function EditProduct() {
  const title = "Edit Product";

  const { id } = useParams<{ id: string }>();

  const { input, handleInputChange, setInput } = useFormFields({
    title: "",
    price: "",
    desc: "",
    stock: "",
    discount: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { category } = useSelector(getCategoryData);
  const { brand } = useSelector(getBrandData);
  const { colors } = useSelector(getColorData);
  const { sizes } = useSelector(getSizeData);
  const { products, error, message, loader } = useSelector(getProductData);

  const [catShow, setCatShow] = useState(false);
  const [brandShow, setBrandShow] = useState(false);
  const [colorShow, setColorShow] = useState(false);
  const [sizeShow, setSizeShow] = useState(false);

  const [filteredCategories, setFilteredCategories] = useState(category);
  const [filteredBrands, setFilteredBrands] = useState(brand);
  const [filteredColors, setFilteredColors] = useState(colors);
  const [filteredSizes, setFilteredSizes] = useState(sizes);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);

  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);

  const sizeDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState<string>("");

  const [productPhoto, setProductPhoto] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<{ url: string }[]>([]);

  const [photosToRemove, setPhotosToRemove] = useState<string[]>([]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Function to handle emoji selection
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    setInput((prevInput) => ({
      ...prevInput,
      desc: prevInput.desc + emoji, // Append emoji to the description
    }));
    setShowEmojiPicker(false); // Close emoji picker after selection
  };

  // Handle category selection for dropdowns
  const handleSelectCategory = (categoryId: string) => {
    if (selectedCategory.includes(categoryId)) {
      // Remove category if already selected
      setSelectedCategory(selectedCategory.filter((id) => id !== categoryId));
    } else {
      // Add category
      setSelectedCategory([...selectedCategory, categoryId]);
    }
    setFilteredCategories(category || []);
    setSearchValue(""); // Clear search field
    setCatShow(false);
  };
  // Handle search category

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    if (search === "") {
      // If the search input is cleared, reset to the full category list
      setFilteredCategories(category || []);
    } else {
      // Filter categories based on the search input
      setFilteredCategories(
        category?.filter((c) => c.name?.toLowerCase().includes(search)) || []
      );
    }
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
    setFilteredBrands(brand || []);
    setSearchValue(""); // Clear search field
    setBrandShow(false);
  };
  // Handle search brand
  const handleBrandSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);

    if (search === "") {
      // If the search input is cleared, reset to the full brand list
      setFilteredBrands(brand || []);
    } else {
      // Filter brands based on the search input
      setFilteredBrands(
        brand?.filter((br) => br.name?.toLowerCase().includes(search)) || []
      );
    }
  };

  // Handle color selection for dropdowns
  const handleSelectColor = (colorId: string) => {
    if (selectedColor.includes(colorId)) {
      // Remove color if already selected
      setSelectedColor(selectedColor.filter((id) => id !== colorId));
    } else {
      // Add color
      setSelectedColor([...selectedColor, colorId]);
    }
    setFilteredColors(colors || []);
    setSearchValue(""); // Clear search field
    setColorShow(false);
  };
  // Handle search color
  const handleColorSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);
    if (search === "") {
      // If the search input is cleared, reset to the full colors list
      setFilteredColors(colors || []);
    } else {
      // Filter colors based on the search input
      setFilteredColors(
        colors?.filter((color) => color.name?.toLowerCase().includes(search)) ||
          []
      );
    }
  };

  // Handle size selection for dropdowns
  const handleSelectSize = (sizeId: string) => {
    if (selectedSize.includes(sizeId)) {
      // Remove size if already selected
      setSelectedSize(selectedSize.filter((id) => id !== sizeId));
    } else {
      // Add size
      setSelectedSize([...selectedSize, sizeId]);
    }
    setFilteredSizes(sizes || []);
    setSearchValue(""); // Clear search field
    setSizeShow(false);
  };
  // Handle search size
  const handleSizeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchValue(search);
    if (search === "") {
      // If the search input is cleared, reset to the full sizes list
      setFilteredSizes(sizes || []);
    } else {
      // Filter sizes based on the search input
      setFilteredSizes(
        sizes?.filter((size) => size.name?.toLowerCase().includes(search)) || []
      );
    }
  };

  // Populate product data for editing
  useEffect(() => {
    if (products) {
      const productToEdit = products.find((p) => p._id === id) as
        | Product
        | undefined;
      if (productToEdit) {
        setInput({
          title: productToEdit.title || "",
          price: productToEdit.price || "",
          desc: productToEdit.desc || "",
          stock: productToEdit.stock || "",
          discount: productToEdit.discount || "",
        });

        // Set existing image previews
        const imagePreview =
          Array.isArray(productToEdit.photos) && productToEdit.photos.length > 0
            ? productToEdit.photos.map((img) => ({
                url: img.url,
                public_id: img.public_id,
              })) // Include public_id
            : [];
        setImagePreview(imagePreview);

        // Set other fields like category and brand
        setSelectedCategory(
          Array.isArray(productToEdit.category)
            ? productToEdit.category.map((cat) => cat._id)
            : []
        );
        setSelectedBrand(
          Array.isArray(productToEdit.brand)
            ? productToEdit.brand.map((br) => br._id)
            : []
        );
        setSelectedColor(
          Array.isArray(productToEdit.colors)
            ? productToEdit.colors.map((cr) => cr._id)
            : []
        );
        setSelectedSize(
          Array.isArray(productToEdit.sizes)
            ? productToEdit.sizes.map((sz) => sz._id)
            : []
        );
      }
    }
  }, [products, id, setInput]);

  useEffect(() => {
    return () => {
      imagePreview.forEach((img) => {
        if (img.url.startsWith("blob:")) {
          URL.revokeObjectURL(img.url);
        }
      });
    };
  }, [imagePreview]);

  //
  useEffect(() => {
    setFilteredCategories(category);
    setFilteredBrands(brand);
    setFilteredColors(colors);
    setFilteredSizes(sizes);
  }, [category, brand, colors, sizes]);

  // get all category , brand , colors and sizes
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

  // Handle image selection
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file), // Generate preview URL
      file,
    }));

    setProductPhoto((prev) => [...prev, ...files]); // Add new images
    setImagePreview((prev) => [...prev, ...newPreviews]); // Add previews
  };

  // Remove selected image (new or existing)
  const removeImage = (index: number, isExisting = false) => {
    const imageObject: ImageObject = imagePreview[index];
    if (!imageObject) {
      console.error(`No image found at index ${index}`);
      return;
    }

    // If the image is an existing Cloudinary image, it should have a public_id
    if (isExisting) {
      const publicId = imageObject.public_id;
      if (publicId) {
        // Handle removal from Cloudinary
        setPhotosToRemove((prev) => [...prev, publicId]);
        setImagePreview((prev) => prev.filter((_, i) => i !== index));
      } else {
        console.error("No public_id found for this Cloudinary image.");
      }
    } else {
      // For new images (local previews), no public_id, just revoke URL if necessary
      const urlToRevoke = imageObject.url;
      if (urlToRevoke?.startsWith("blob:")) {
        // Revoke blob URL for local preview images
        URL.revokeObjectURL(urlToRevoke);
      }
      // Remove from imagePreview and productPhoto
      setImagePreview((prev) => prev.filter((_, i) => i !== index));
      setProductPhoto((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle product update
  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    // Append product fields to FormData
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

    // Append photosToRemove array (if any)
    if (photosToRemove.length > 0) {
      photosToRemove.forEach((photoId) => {
        formData.append("photosToRemove[]", photoId);
      });
    }
    console.log("Photos to Remove:", photosToRemove);

    // Append new product photos
    productPhoto.forEach((photo) => {
      formData.append("productPhoto", photo);
    });

    try {
      // Update product
      await dispatch(
        updateProductApi({ DataId: id as string, formData })
      ).unwrap();
      navigate("/seller/allProducts");
    } catch (error) {
      console.error("Error updating product:", error);
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
    margin: "0 auto",
  };
  return (
    <>
      <MetaData title={title} />

      {/* Start */}

      <div className="px-2 py-5 md:px-7">
        <div className="w-full pt-4 pl-4 pr-4 pb-6 bg-[#283046] text-[#d0d2d6] rounded-md ">
          {/* top */}
          <div className="flex items-center justify-between pb-4">
            <h1 className="text-2xl font-primarySemiBold">Edit Product</h1>
            <Link
              to="/seller/allProducts"
              className="py-2 my-2 text-lg bg-indigo-500 rounded-md px-7 hover:shadow-indigo-500/50 hover:shadow-lg font-primaryMedium"
            >
              Products
            </Link>
          </div>
          {/* form */}
          <div className="">
            <form onSubmit={handleUpdateProduct}>
              {/* product & brand */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                {/* name */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="title" className="font-primarySemiBold">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Product Title"
                    onChange={handleInputChange}
                    value={input.title}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                </div>
                {/* brand */}

                {/* Brand */}
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
                    value={selectedBrand.join(", ")}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                  <div
                    ref={brandDropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 z-20 ${
                      brandShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div className="flex w-full px-4 py-2">
                      <input
                        onChange={handleBrandSearch}
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="Search"
                        className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                      />
                    </div>
                    <div className="pt-4"></div>
                    <div className="flex flex-col justify-start items-start h-[150px] overflow-y-scroll sidebar">
                      {Array.isArray(filteredBrands) &&
                        filteredBrands.map((b) => (
                          <div
                            key={b._id}
                            className={`px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                              selectedBrand.includes(b._id)
                                ? "bg-indigo-500"
                                : ""
                            }`}
                            onClick={() => handleSelectBrand(b._id)}
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
                    name="category"
                    id="category"
                    placeholder="Search or Select Category"
                    onFocus={() => setCatShow(true)}
                    value={selectedCategory.join(", ")}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                  <div
                    ref={categoryDropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 z-20 ${
                      catShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div className="flex w-full px-4 py-2">
                      <input
                        onChange={handleCategorySearch}
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="Search"
                        className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                      />
                    </div>
                    <div className="pt-4"></div>
                    <div className="flex flex-col justify-start items-start h-[150px] overflow-y-scroll sidebar">
                      {Array.isArray(filteredCategories) &&
                        filteredCategories.map((c) => (
                          <div
                            key={c._id}
                            className={`px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                              selectedCategory.includes(c._id)
                                ? "bg-indigo-500"
                                : ""
                            }`}
                            onClick={() => handleSelectCategory(c._id)}
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
              {/* color & size */}
              <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
                {/* color */}
                <div className="relative flex flex-col w-full gap-1">
                  <label htmlFor="colors" className="font-primarySemiBold">
                    Product Colors
                  </label>
                  <input
                    type="text"
                    name="colors"
                    id="colors"
                    placeholder="Search or Select Colors"
                    onFocus={() => setColorShow(true)}
                    value={selectedColor.join(", ")}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                  <div
                    ref={colorDropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 z-20 ${
                      colorShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div className="flex w-full px-4 py-2">
                      <input
                        onChange={handleColorSearch}
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="Search"
                        className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                      />
                    </div>
                    <div className="pt-4"></div>
                    <div className="flex flex-col justify-start items-start h-[150px] overflow-y-scroll sidebar">
                      {Array.isArray(filteredColors) &&
                        filteredColors.map((col) => (
                          <div
                            key={col._id}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                              selectedColor.includes(col._id)
                                ? "bg-indigo-500"
                                : ""
                            }`}
                            onClick={() => handleSelectColor(col._id)}
                          >
                            {/* Color Circle */}
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor:
                                  typeof col.colorCode === "string"
                                    ? col.colorCode
                                    : undefined,
                              }}
                            ></div>
                            {col.name}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                {/* size */}
                <div className="relative flex flex-col w-full gap-1">
                  <label htmlFor="sizes" className="font-primarySemiBold">
                    Product Sizes
                  </label>
                  <input
                    type="text"
                    name="sizes"
                    id="sizes"
                    placeholder="Search or Select Sizes"
                    onFocus={() => setSizeShow(true)}
                    value={selectedSize.join(", ")}
                    className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                  />
                  <div
                    ref={sizeDropdownRef}
                    className={`absolute top-[101%] bg-slate-800 w-full transition-all duration-300 z-20 ${
                      sizeShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div className="flex w-full px-4 py-2">
                      <input
                        onChange={handleSizeSearch}
                        type="text"
                        name="search"
                        value={searchValue}
                        placeholder="Search"
                        className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden font-primaryMedium"
                      />
                    </div>
                    <div className="pt-4"></div>
                    <div className="flex flex-col justify-start items-start h-[150px] overflow-y-scroll sidebar">
                      {Array.isArray(filteredSizes) &&
                        filteredSizes.map((sz) => (
                          <div
                            key={sz._id}
                            className={`px-4 py-2 text-sm font-primaryRegular hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${
                              selectedSize.includes(sz._id)
                                ? "bg-indigo-500"
                                : ""
                            }`}
                            onClick={() => handleSelectSize(sz._id)}
                          >
                            {sz.name}
                          </div>
                        ))}
                    </div>
                  </div>
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
              <div className="relative flex flex-col w-full gap-1 mb-5">
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
                {/* Emoji Picker Toggle Button */}
                <button
                  type="button"
                  className="absolute top-0 left-40 text-gray-500"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                >
                  😀
                </button>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute top-5 left-48 z-50">
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      lazyLoadEmojis
                    />
                  </div>
                )}
              </div>
              {/* image */}
              <div className="grid w-full grid-cols-1 gap-3 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-4 sm:gap-4">
                {imagePreview.map((img, i) => {
                  return (
                    <div key={i} className="h-[180px] relative">
                      <img
                        src={img.url}
                        alt={`Preview ${i + 1}`}
                        className="object-contain w-full h-full rounded-md"
                      />
                      <div
                        className="absolute z-10 p-2 rounded-full cursor-pointer top-1 right-10 bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 "
                        onClick={() => removeImage(i, true)}
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
                className="py-2 text-lg bg-blue-500 rounded-md px-7 hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
              >
                {loader ? (
                  <RiseLoader
                    size={10}
                    color="#fff"
                    cssOverride={loaderStyle}
                  />
                ) : (
                  "Update Product"
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
