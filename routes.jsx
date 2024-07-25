/* eslint-disable react/no-children-prop */
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Default, Sidebar } from "@/layouts";
import { Home, Product, ProductDetail, Cart, Payment, Search } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default children={<Home />} />,
  },
  {
    path: "/product",
    element: <Default children={<Product />} />,
  },
  {
    path: "/detail/:id",
    element: <Default children={<ProductDetail />} />,
  },
  {
    path: "/cart",
    element: <Default children={<Cart />} />,
  },
  {
    path: "/payment",
    element: <Default children={<Payment />} />,
  },
  {
    path: "/search",
    element: <Sidebar children={<Search />} />,
  },
  {
    path: "/services",
    element: (
      <Default
        children={
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
        children={
          <p className="container text-red font-bold tex-[3rem]">
            Coming Soon!
          </p>
        }
      />
    ),
  },
]);

export default router;
