import { lazy, Suspense } from "react";
import MainLayout from "../layout/MainLayout.tsx";
import PrivateGard from "./privateGard.tsx";
import { ClockLoader } from "react-spinners";
import ViewOrder from "../pages/seller/SOrders/ViewOrder.tsx";

const Home = lazy(() => import("../pages/home/Home.tsx"));

// admin routes
const AdminDashboard = lazy(
  () => import("../pages/admin/Dashoard/AdminDashboard.tsx")
);
const Orders = lazy(() => import("../pages/admin/Orders/Orders.tsx"));
const OrderDetails = lazy(
  () => import("../pages/admin/Orders/OrderDetails.tsx")
);
const Categories = lazy(
  () => import("../pages/admin/Categories/Categories.tsx")
);
const EditCategory = lazy(
  () => import("../pages/admin/Categories/EditCategory.tsx")
);
const Brands = lazy(() => import("../pages/admin/Brand/Brands.tsx"));
const EditBrand = lazy(() => import("../pages/admin/Brand/EditBrand.tsx"));
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
const SellerDetails = lazy(() => import("../components/SellerDetails.tsx"));

// seller routes
const SellerDashboard = lazy(
  () => import("../pages/seller/Dashboard/SellerDashboard.tsx")
);
const AddProduct = lazy(
  () => import("../pages/seller/AddProduct/AddProduct.tsx")
);

const AllProducts = lazy(
  () => import("../pages/seller/AllProducts/AllProducts.tsx")
);

const EditProduct = lazy(
  () => import("../pages/seller/AllProducts/EditProduct.tsx")
);

const ViewProduct = lazy(
  () => import("../pages/seller/AllProducts/ViewProduct.tsx")
);

const DiscountProducts = lazy(
  () => import("../pages/seller/DiscountProducts/DiscountProducts.tsx")
);
const SOrders = lazy(() => import("../pages/seller/SOrders/SOrders.tsx"));

const Payments = lazy(() => import("../pages/seller/Payments/Payments.tsx"));

const ChatCustomer = lazy(
  () => import("../pages/seller/ChatCustomer/ChatCustomer.tsx")
);
const ChatSupport = lazy(
  () => import("../pages/seller/ChatSupport/ChatSupport.tsx")
);
const Profile = lazy(() => import("../pages/seller/Profile/Profile.tsx"));

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
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
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
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Orders />
              </Suspense>
            ),
          },
          {
            path: "/admin/orders/orderDetails/:id",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <OrderDetails />
              </Suspense>
            ),
          },
          {
            path: "/admin/categories",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Categories />
              </Suspense>
            ),
          },
          {
            path: "/admin/categories/editCategory/:id",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <EditCategory />
              </Suspense>
            ),
          },
          {
            path: "/admin/brands",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Brands />
              </Suspense>
            ),
          },
          {
            path: "/admin/brands/editBrand/:id",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <EditBrand />
              </Suspense>
            ),
          },
          {
            path: "/admin/sellers",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
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
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
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
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
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
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <SellersRequest />
              </Suspense>
            ),
          },
          {
            path: "/admin/seller/details/:id",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <SellerDetails />
              </Suspense>
            ),
          },
          {
            path: "/admin/ChatSeller",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <ChatSeller />
              </Suspense>
            ),
          },
          // seller start
          {
            path: "/seller/dashboard",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <SellerDashboard />
              </Suspense>
            ),
          },
          {
            path: "/seller/addProduct",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <AddProduct />
              </Suspense>
            ),
          },
          {
            path: "/seller/allProducts",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <AllProducts />
              </Suspense>
            ),
          },
          {
            path: "/seller/allProducts/editProduct/:id",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <EditProduct />
              </Suspense>
            ),
          },
          {
            path: "/seller/allProducts/:id",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <ViewProduct />
              </Suspense>
            ),
          },
          {
            path: "/seller/discountProducts",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <DiscountProducts />
              </Suspense>
            ),
          },
          {
            path: "/seller/orders",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <SOrders />
              </Suspense>
            ),
          },
          {
            path: "/seller/orders/:id",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <ViewOrder />
              </Suspense>
            ),
          },
          {
            path: "/seller/payments",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Payments />
              </Suspense>
            ),
          },
          {
            path: "/seller/chatCustomer",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <ChatCustomer />
              </Suspense>
            ),
          },
          {
            path: "/seller/chatCustomer/:id",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <ChatCustomer />
              </Suspense>
            ),
          },
          {
            path: "/seller/chatSupport",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <ChatSupport />
              </Suspense>
            ),
          },
          {
            path: "/seller/profile",
            element: (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] min-w-screen flex items-center justify-center">
                    <ClockLoader size={100} color="#2EA3DC" />
                  </div>
                }
              >
                <Profile />
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
