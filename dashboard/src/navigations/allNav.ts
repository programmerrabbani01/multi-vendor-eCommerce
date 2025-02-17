import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { FaUsersSlash, FaPlus } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CgDollar, CgProfile, CgSize } from "react-icons/cg";
import { CiChat1 } from "react-icons/ci";
import { RiProductHuntLine, RiDiscountPercentLine } from "react-icons/ri";
import { BsChat } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { BiSolidColor } from "react-icons/bi";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: AiFillDashboard,
    role: "Admin",
  },
  {
    id: 2,
    title: "Orders",
    path: "/admin/orders",
    icon: IoCartOutline,
    role: "Admin",
  },
  {
    id: 3,
    title: "Categories",
    path: "/admin/categories",
    icon: BiCategory,
    role: "Admin",
  },
  {
    id: 4,
    title: "Brands",
    path: "/admin/brands",
    icon: SiBrandfolder,
    role: "Admin",
  },
  {
    id: 5,
    title: "Colors",
    path: "/admin/colors",
    icon: BiSolidColor,
    role: "Admin",
  },
  {
    id: 6,
    title: "Sizes",
    path: "/admin/sizes",
    icon: CgSize,
    role: "Admin",
  },
  {
    id: 7,
    title: "Sellers",
    path: "/admin/sellers",
    icon: FiUsers,
    role: "Admin",
  },
  {
    id: 8,
    title: "Payment Requests",
    path: "/admin/paymentRequests",
    icon: CgDollar,
    role: "Admin",
  },
  {
    id: 9,
    title: "Deactivate Sellers",
    path: "/admin/deactivateSellers",
    icon: FaUsersSlash,
    role: "Admin",
  },
  {
    id: 10,
    title: "Sellers Request",
    path: "/admin/sellersRequest",
    icon: BiLoaderCircle,
    role: "Admin",
  },
  {
    id: 11,
    title: "Chat Seller",
    path: "/admin/chatSeller",
    icon: CiChat1,
    role: "Admin",
  },
  // seller start
  {
    id: 12,
    title: "Dashboard",
    path: "/seller/dashboard",
    icon: AiFillDashboard,
    role: "Seller",
  },
  {
    id: 13,
    title: "Add Product",
    path: "/seller/addProduct",
    icon: FaPlus,
    role: "Seller",
  },
  {
    id: 14,
    title: "All Products",
    path: "/seller/allProducts",
    icon: RiProductHuntLine,
    role: "Seller",
  },
  {
    id: 15,
    title: "Discount Products",
    path: "/seller/discountProducts",
    icon: RiDiscountPercentLine,
    role: "Seller",
  },
  {
    id: 16,
    title: "Orders",
    path: "/seller/orders",
    icon: IoCartOutline,
    role: "Seller",
  },
  {
    id: 17,
    title: "Payments",
    path: "/seller/payments",
    icon: CgDollar,
    role: "Seller",
  },
  {
    id: 18,
    title: "Chat Customer",
    path: "/seller/chatCustomer",
    icon: BsChat,
    role: "Seller",
  },
  {
    id: 19,
    title: "Chat Support",
    path: "/seller/chatSupport",
    icon: CiChat1,
    role: "Seller",
  },
  {
    id: 20,
    title: "Profile",
    path: "/seller/profile",
    icon: CgProfile,
    role: "Seller",
  },
];
