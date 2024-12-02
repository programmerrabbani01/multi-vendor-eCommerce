import { lazy, Suspense } from "react";
// Use React.lazy for code splitting
const Login = lazy(() => import("../pages/auth/Login.tsx"));
const Register = lazy(() => import("../pages/auth/Register.tsx"));
const AdminLogIn = lazy(() => import("../pages/auth/AdminLogIn.tsx"));

// create public router
// const publicRouter = [
//   {
//     element: <PublicGard />,
//     children: [
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/register",
//         element: <Register />,
//       },
//     ],
//   },
// ];
const publicRouter = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLogIn />
      </Suspense>
    ),
  },
];

// export public router

export default publicRouter;
