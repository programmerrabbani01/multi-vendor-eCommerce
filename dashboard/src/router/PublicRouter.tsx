import { lazy, Suspense } from "react";
import PublicGard from "./PublicGard.tsx";
import { ClockLoader } from "react-spinners";
// Use React.lazy for code splitting
const Login = lazy(() => import("../pages/auth/Login.tsx"));
const Register = lazy(() => import("../pages/auth/Register.tsx"));
const AdminLogIn = lazy(() => import("../pages/auth/AdminLogIn.tsx"));

// create public router

const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense
            fallback={
              <div className="min-h-screen min-w-screen bg-[#161d31] flex items-center justify-center">
                <ClockLoader size={100} color="#2EA3DC" />
              </div>
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense
            fallback={
              <div className="min-h-screen min-w-screen bg-[#161d31] flex items-center justify-center">
                <ClockLoader size={100} color="#2EA3DC" />
              </div>
            }
          >
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/admin/login",
        element: (
          <Suspense
            fallback={
              <div className="min-h-screen min-w-screen bg-[#161d31] flex items-center justify-center">
                <ClockLoader size={100} color="#2EA3DC" />
              </div>
            }
          >
            <AdminLogIn />
          </Suspense>
        ),
      },
    ],
  },
];

// export public router

export default publicRouter;
