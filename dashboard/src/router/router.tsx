import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./PublicRouter.tsx";
import privateRouter from "./PrivateRouter.tsx";

// create browser router

const router = createBrowserRouter([...publicRouter, ...privateRouter]);

// export browser router

export default router;
