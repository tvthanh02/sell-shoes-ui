/* eslint-disable indent */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState, startTransition } from "react";
import ProductCard from "@/components/ProductCard";
import { NavLink, useLocation } from "react-router-dom";
import { Pagination, FilterGroup } from "@/components";
import {
  getBestSellproducts,
  getNewProducts,
  getSaleProducts,
} from "@/service";
import SkeletonLoadCard from "@/components/SkeletonLoadCard";

const Product = () => {
  const brands = ["Nike", "Adidas", "Jordan"];
  const sizes = [37, 38, 39, 40, 40.5, 41, 42, 43, 44, 45];

  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      startTransition(async () => {
        try {
          let data = await handleGetData({ ...filterQuery });
          setIsLoading(false);
          setData(data);
        } catch (error) {
          alert(
            "Đã có lỗi xảy ra phía server, không thể truy cập vào lúc này..."
          );
        }
      });
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
    <div className="container grid grid-cols-1 md:grid-cols-1/4 gap-5">
      <div className="w-full flex flex-col gap-10">
        <div className="text-[1.7rem] font-bold uppercase flex items-center gap-4">
          <FontAwesomeIcon className="text-primary" icon={faFilter} />
          <p className="hidden lg:inline-block">bộ lọc tìm kiếm</p>
          <p className="lg:hidden">bộ lọc</p>
        </div>
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
        <div className="w-full bg-[#ededed] py-4 px-3 flex items-end md:items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="hidden md:block text-[1.5rem] text-textColor">
              Sắp xếp theo
            </p>
            <div className="flex w-[60%] md:w-auto flex-wrap items-center gap-4 text-[1.5rem]">
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
          {!isLoading && data?.paging && (
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
                  setIsLoading(true);
                  startTransition(async () => {
                    const newData = await handleGetData({
                      page: prevPage - 1,
                      ...filterQuery,
                    });
                    if (newData) {
                      setIsLoading(false);
                      setData(newData);
                    }
                  });
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
                  setIsLoading(true);
                  startTransition(async () => {
                    const newData = await handleGetData({
                      page: nextPage - 1,
                      ...filterQuery,
                    });
                    if (newData) {
                      setIsLoading(false);
                      setData(newData);
                    }
                  });
                }}
              />
            </div>
          )}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {!isLoading
            ? products.length > 0 &&
              products.map((product) => {
                return (
                  <ProductCard key={product.productCode} product={product} />
                );
              })
            : Array(12)
                .fill(1)
                .map((item, index) => <SkeletonLoadCard key={index} />)}
        </div>
        <div className="w-full mt-8 ">
          {!isLoading && data?.paging && (
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
