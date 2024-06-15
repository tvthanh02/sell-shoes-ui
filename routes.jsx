import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Default } from "@/layouts";
import { Home, Product } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default chidldren={<Home />} />,
  },
  {
    path: "/product",
    element: <Default chidldren={<Product />} />,
  },
]);

export default router;
