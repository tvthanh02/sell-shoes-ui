/* eslint-disable indent */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { NavLink, useLocation } from "react-router-dom";
import { Pagination, FilterGroup } from "@/components";
import {
  getBestSellproducts,
  getNewProducts,
  getSaleProducts,
} from "@/service";

const Product = () => {
  const locations = ["Hà Nội", "TP.Hồ Chí Minh", "Nha Trang", "Đà Nẵng"];
  const brands = ["Nike", "Adidas", "Jordan"];
  const sizes = [37, 38, 39, 40, 40.5, 41, 42, 43, 44, 45];

  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});

  const filterQuery = useMemo(() => {
    const keys = Object.keys(filter);
    const values = Object.values(filter);

    const obj = {};

    for (let index in keys) {
      if (values[index].length > 0) {
        obj[`${keys[index]}`] = values[index].join(",");
      }
    }

    return obj;
  }, [filter]);

  const location = useLocation();

  const handleGetData = async (querys = {}) => {
    switch (location.search) {
      case "?q=bestsell":
        return await getBestSellproducts(querys);
      case "?q=promotion":
        return await getSaleProducts(querys);
      default:
        return await getNewProducts(querys);
    }
  };

  const handleUpdateProductFollowPaging = (products) => {
    setProducts(products);
  };

  useEffect(() => {
    (async () => {
      let data = await handleGetData({ ...filterQuery });
      setData(data);
    })();
  }, [location.search, filterQuery]);

  const handleCheckFilter = (e, query) => {
    setFilter((prev) => {
      if (e.target.checked) {
        return {
          ...prev,
          [query]: prev[query]
            ? [...prev[query], e.target.value]
            : [e.target.value],
        };
      } else {
        return {
          ...prev,
          [query]:
            prev[query]?.filter((value) => value !== e.target.value) || [],
        };
      }
    });
  };

  return (
    <div className="container grid grid-cols-1/4 gap-5">
      <div className="w-full flex flex-col gap-10">
        <p className="text-[1.7rem] font-bold uppercase flex items-center gap-4">
          <FontAwesomeIcon className="text-primary" icon={faFilter} />
          bộ lọc tìm kiếm
        </p>
        <div className="flex flex-col gap-5">
          <FilterGroup
            data={brands}
            label={"Thương Hiệu"}
            query={"brand"}
            onChange={handleCheckFilter}
          />
          <hr className="border-t border-solid border-gray" />
          <FilterGroup
            data={sizes}
            label={"Kích cỡ"}
            query={"size"}
            onChange={handleCheckFilter}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full bg-[#ededed] py-4 px-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="text-[1.5rem] text-textColor">Sắp xếp theo</p>
            <div className="flex items-center gap-4 text-[1.5rem]">
              <NavLink
                to={"/product"}
                className={({ isActive }) =>
                  isActive && location.search === ""
                    ? "py-2 px-3 hover:cursor-pointer rounded-md bg-primary text-textColor "
                    : "py-2 px-3 hover:cursor-pointer rounded-md bg-white text-black"
                }
              >
                Mới nhất
              </NavLink>
              <NavLink
                to={"/product?q=bestsell"}
                className={({ isActive }) =>
                  isActive && location.search === "?q=bestsell"
                    ? "py-2 px-3 hover:cursor-pointer rounded-md bg-primary text-textColor "
                    : "py-2 px-3 hover:cursor-pointer rounded-md bg-white text-black"
                }
              >
                Bán chạy
              </NavLink>
              <NavLink
                to={"/product?q=promotion"}
                className={({ isActive }) =>
                  isActive && location.search === "?q=promotion"
                    ? "py-2 px-3 hover:cursor-pointer rounded-md bg-primary text-textColor "
                    : "py-2 px-3 hover:cursor-pointer rounded-md bg-white text-black"
                }
              >
                Khuyến mãi
              </NavLink>
            </div>
          </div>
          {data?.paging && (
            <div className="flex items-center gap-3 text-textColor">
              <p>
                {data.paging?.page}/{data.paging?.totalPage}
              </p>
              <FontAwesomeIcon
                className="py-2 px-3 border border-solid border-textColor rounded-lg"
                icon={faAngleLeft}
                onClick={async () => {
                  if (data.paging?.page === 1) {
                    return;
                  }
                  let prevPage = data.paging.page - 1;
                  const newData = await handleGetData({
                    page: prevPage - 1,
                    ...filterQuery,
                  });
                  newData && setData(newData);
                }}
              />
              <FontAwesomeIcon
                className="py-2 px-3 border border-solid border-textColor rounded-lg hover:cursor-pointer"
                icon={faAngleRight}
                onClick={async () => {
                  if (data.paging?.page === data.paging?.totalPage) {
                    return;
                  }
                  let nextPage = data.paging.page + 1;
                  const newData = await handleGetData({
                    page: nextPage - 1,
                    ...filterQuery,
                  });
                  newData && setData(newData);
                }}
              />
            </div>
          )}
        </div>
        <div className="w-full grid grid-cols-4 gap-3">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <ProductCard key={product.productCode} product={product} />
              );
            })}
        </div>
        <div className="w-full mt-8 ">
          {data?.paging && (
            <Pagination
              itemsPerPage={12}
              totalPages={data.data?.length}
              limitData={data.data}
              onChangePage={handleUpdateProductFollowPaging}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
