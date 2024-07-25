import { useState, useContext, useEffect, startTransition } from "react";
import { AppContext } from "@/App";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "@/service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { ProductCard, SkeletonLoadCard, Pagination } from "@/components";

const Search = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearchProducts = async (searchKey) => {
    try {
      const data = await searchProducts(searchKey);
      if (data) {
        setData(data);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateProductFollowPaging = (products) => {
    setProducts(products);
  };

  useEffect(() => {
    if (!state.searchKey) {
      navigate("/");
      return;
    }
    try {
      setIsLoading(true);
      startTransition(() => {
        handleSearchProducts(state.searchKey.toUpperCase());
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [state.searchKey]);

  return (
    <>
      <p className="text-lg font-semibold">
        Bạn tìm kiếm:{" "}
        <span className="text-red text-2xl">
          {" "}
          {`"${decodeURIComponent(state.searchKey)}"`}
        </span>
      </p>
      <div className="py-12">
        Kết quả tìm kiếm{" "}
        <span className="text-red font-bold">{data?.data?.length}</span> sản
        phẩm
      </div>
      {data?.data?.length > 0 && (
        <div className="w-full flex flex-col gap-5">
          <div className="w-full bg-[#ededed] py-4 px-3 flex items-end md:items-center justify-end">
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
                      const newData = await searchProducts(
                        state.searchKey,
                        prevPage
                      );
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
                      startTransition(async () => {
                        const newData = await searchProducts(
                          state.searchKey,
                          nextPage
                        );
                        if (newData) {
                          setIsLoading(false);
                          setData(newData);
                        }
                      });
                    });
                  }}
                />
              </div>
            )}
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {!isLoading
              ? products?.length > 0 &&
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
      )}
    </>
  );
};

export default Search;
