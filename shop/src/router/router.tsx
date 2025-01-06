import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter.tsx";
import privateRouter from "./privateRouter.tsx";

// create browser router

const router = createBrowserRouter([...publicRouter, ...privateRouter]);

// export browser router

export default router;
