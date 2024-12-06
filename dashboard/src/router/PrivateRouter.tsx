import MainLayout from "../layout/MainLayout.tsx";
import AdminDashboard from "../pages/admin/Dashoard/AdminDashboard.tsx";
import Orders from "../pages/admin/Orders/Orders.tsx";
import Home from "../pages/home/Home.tsx";
import SellerDashboard from "../pages/seller/SellerDashboard.tsx";
import PrivateGard from "./privateGard.tsx";

// create public router
const privateRouter = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/admin/dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/orders",
            element: <Orders />,
          },
          {
            path: "/seller/dashboard",
            element: <SellerDashboard />,
          },
        ],
      },
    ],
  },
];

// export public router

export default privateRouter;
