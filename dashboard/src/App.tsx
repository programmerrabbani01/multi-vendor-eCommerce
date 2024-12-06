import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loggedInUser } from "./features/auth/authApiSlice.ts";
import { AppDispatch } from "./app/store.ts";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  // httpOnly true thakle react theke cookie access kora jabe na

  // console.log(Cookie.get("accessToken"));

  // for catch who logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedInUser());
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
