import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Default } from "@/layouts";
import { Home, Product, ProductDetail, Cart } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default chidldren={<Home />} />,
  },
  {
    path: "/product",
    element: <Default chidldren={<Product />} />,
  },
  {
    path: "/detail/:id",
    element: <Default chidldren={<ProductDetail />} />,
  },
  {
    path: "/cart",
    element: <Default chidldren={<Cart />} />,
  },
]);

export default router;
