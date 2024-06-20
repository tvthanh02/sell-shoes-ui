import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Default } from "@/layouts";
import { Home, Product, ProductDetail, Cart } from "@/pages";
import Payment from "@/pages/Payment";

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
  {
    path: "/payment",
    element: <Default chidldren={<Payment />} />,
  },
  {
    path: "/services",
    element: (
      <Default
        chidldren={
          <p className="container text-red font-bold tex-[3rem]">
            Coming Soon!
          </p>
        }
      />
    ),
  },
  {
    path: "/contact",
    element: (
      <Default
        chidldren={
          <p className="container text-red font-bold tex-[3rem]">
            Coming Soon!
          </p>
        }
      />
    ),
  },
]);

export default router;
