import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { FaUsersSlash } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CgDollar } from "react-icons/cg";
import { CiChat1 } from "react-icons/ci";

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
    title: "Sellers",
    path: "/admin/sellers",
    icon: FiUsers,
    role: "Admin",
  },
  {
    id: 5,
    title: "Payment Requests",
    path: "/admin/paymentRequests",
    icon: CgDollar,
    role: "Admin",
  },
  {
    id: 6,
    title: "Deactivate Sellers",
    path: "/admin/deactivateSellers",
    icon: FaUsersSlash,
    role: "Admin",
  },
  {
    id: 7,
    title: "Sellers Request",
    path: "/admin/sellersRequest",
    icon: BiLoaderCircle,
    role: "Admin",
  },
  {
    id: 8,
    title: "Chat Seller",
    path: "/admin/chatSeller",
    icon: CiChat1,
    role: "Admin",
  },
];
