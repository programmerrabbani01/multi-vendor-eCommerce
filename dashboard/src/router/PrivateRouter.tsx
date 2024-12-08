import { lazy, Suspense } from "react";
import MainLayout from "../layout/MainLayout.tsx";
import PrivateGard from "./privateGard.tsx";
import { ClockLoader } from "react-spinners";
const Home = lazy(() => import("../pages/home/Home.tsx"));

// admin routes
const AdminDashboard = lazy(
  () => import("../pages/admin/Dashoard/AdminDashboard.tsx")
);
const Orders = lazy(() => import("../pages/admin/Orders/Orders.tsx"));
const Categories = lazy(
  () => import("../pages/admin/Categories/Categories.tsx")
);
const Sellers = lazy(() => import("../pages/admin/Sellers/Sellers.tsx"));
const PaymentRequests = lazy(
  () => import("../pages/admin/PaymentRequests/PaymentRequests.tsx")
);
const DeactivateSellers = lazy(
  () => import("../pages/admin/DeactivateSellers/DeactivateSellers.tsx")
);
const SellersRequest = lazy(
  () => import("../pages/admin/SellersRequest/SellersRequest.tsx")
);
const ChatSeller = lazy(
  () => import("../pages/admin/ChatWithSeller/ChatWithSeller.tsx")
);

// seller routes
const SellerDashboard = lazy(
  () => import("../pages/seller/SellerDashboard.tsx")
);

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
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/admin/dashboard",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "/admin/orders",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Orders />
              </Suspense>
            ),
          },
          {
            path: "/admin/categories",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Categories />
              </Suspense>
            ),
          },
          {
            path: "/admin/sellers",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Sellers />
              </Suspense>
            ),
          },
          {
            path: "/admin/paymentRequests",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <PaymentRequests />
              </Suspense>
            ),
          },
          {
            path: "/admin/deactivateSellers",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <DeactivateSellers />
              </Suspense>
            ),
          },
          {
            path: "/admin/sellersRequest",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <SellersRequest />
              </Suspense>
            ),
          },
          {
            path: "/admin/ChatSeller",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <ChatSeller />
              </Suspense>
            ),
          },

          {
            path: "/seller/dashboard",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[50vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <SellerDashboard />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

// export public router

export default privateRouter;
