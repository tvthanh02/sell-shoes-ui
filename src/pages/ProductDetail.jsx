/* eslint-disable indent */
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMinus,
  faPlus,
  faStar,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import { ProductCard, Slider } from "@/components";
import { useContext, useEffect, useState, startTransition } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { getProduct, getProductByBrand } from "@/service";
import { getCartFromStorage, setCartToStorage } from "@/utils/storage";
import Swal from "sweetalert2";
import { convertNumberToVnd } from "@/utils/convert";
import { AppContext } from "@/App";
import SkeletonLoad from "@/components/SkeletonLoad";
import SkeletonLoadCard from "@/components/SkeletonLoadCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [relevants, setRelevants] = useState([]);
  const [activeThumb, setActiveThumb] = useState("");
  const [crumbs, setCrumbs] = useState([]);
  const [countQuantity, setCountQuantity] = useState(1);
  const [maxQuantityProduct, setMaxQuantityProduct] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const { dispatcher } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      startTransition(async () => {
        const product = await getProduct(id);

        const relevantProducts = await getProductByBrand(product.brand);

        setIsLoading(false);

        setMaxQuantityProduct(product.quantity);
        setProductDetail(product);
        setActiveThumb(product.thumbs[4]);
        setRelevants(relevantProducts);
        setCrumbs([
          {
            label: "Trang Chủ",
            path: "/",
            icon: <FontAwesomeIcon icon={faHome} />,
          },
          { label: "Sản Phẩm", path: "/product" },
          {
            label: product.nameProduct,
          },
        ]);
      });
    })();
  }, [id]);

  const checkMaxQuantity = (value) => value === maxQuantityProduct;

  const increaseCount = () => {
    if (checkMaxQuantity(countQuantity)) {
      return;
    }
    setCountQuantity((prev) => prev + 1);
  };

  const decreaseCount = () => {
    if (countQuantity === 1) {
      return;
    }

    setCountQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if ((productDetail, selectedSize)) {
      const productData = {
        code: productDetail.productCode,
        productName: productDetail.nameProduct,
        productThumb: productDetail.thumbs[4],
        size: selectedSize,
        totalQuantity: productDetail.quantity,
        price: productDetail.newPrice,
        quantity: countQuantity,
      };

      let cart = getCartFromStorage();

      cart =
        cart.length > 0
          ? cart.some(
              (product) =>
                product.code === productData.code &&
                product.size === productData.size
            )
            ? [
                ...cart.map((product) => {
                  if (
                    product.code === productData.code &&
                    product.size === productData.size
                  ) {
                    product.quantity += productData.quantity;
                  }
                  return product;
                }),
              ]
            : [...cart, productData]
          : [productData];

      setCartToStorage(cart);
      dispatcher({
        type: "UPDATE_QUANTITY",
        payload: getCartFromStorage().length,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thêm thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bạn chưa chọn kích cỡ giày!",
      });
    }
  };

  return (
    <>
      <div className="hidden md:block container w-full h-[35px]">
        {!isLoading ? (
          crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />
        ) : (
          <SkeletonLoad className="w-[35%] h-full" />
        )}
      </div>
      <div className="container-cus my-10 grid grid-cols-1 md:grid-cols-2 gap-[6rem]">
        <div className="grid grid-cols-1/4 gap-5">
          <div className="flex flex-col gap-10">
            <div className="px-2 w-full flex flex-col gap-5 ">
              {!isLoading
                ? productDetail?.thumbs?.length > 0 &&
                  productDetail.thumbs.map((thumb, index) => {
                    if (index !== 4 && index < 6) {
                      return (
                        <div
                          key={index}
                          className={
                            "w-full border border-solid border-textColor"
                          }
                          onClick={() => setActiveThumb(thumb)}
                        >
                          <img
                            className="w-full aspect-square object-cover"
                            src={thumb}
                            alt="PRODUCT-THUMB-SMALL"
                          />
                        </div>
                      );
                    }
                  })
                : Array(5)
                    .fill(1)
                    .map((item, index) => (
                      <SkeletonLoad
                        key={index}
                        className={"w-full h-[60px]"}
                      ></SkeletonLoad>
                    ))}
            </div>
          </div>
          {!isLoading ? (
            <div className="w-full">
              <img
                className="w-full aspect-square object-cover"
                src={activeThumb && activeThumb}
                alt="PRODUCT-THUMB"
              />
            </div>
          ) : (
            <SkeletonLoad className="w-full h-[280px]" />
          )}
        </div>
        {!isLoading ? (
          <div className="flex flex-col justify-start gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                {productDetail?.rate &&
                  Array(productDetail.rate)
                    .fill(1)
                    .map((item, index) => {
                      return (
                        <span key={index}>
                          <FontAwesomeIcon
                            className="text-yellow"
                            icon={faStar}
                          />
                        </span>
                      );
                    })}
              </div>
              <p className="text-[3rem] leading-[3.8rem] font-bold uppercase text-textColor">
                {productDetail?.nameProduct && productDetail.nameProduct}
              </p>
              <p className="text-2xl text-red font-bold">
                {productDetail?.newPrice &&
                  convertNumberToVnd(productDetail.newPrice)}
              </p>
            </div>
            <hr className="border-t border-solid border-[#f1f1f1]" />
            <div className="w-full flex items-center gap-5 flex-wrap">
              {productDetail?.size &&
                productDetail.size.map((size, index) => {
                  return (
                    <div
                      key={index}
                      className={`p-3  hover:cursor-pointer ${
                        selectedSize !== undefined && size === selectedSize
                          ? "bg-primary border border-solid border-transparent"
                          : "bg-transparent border border-solid border-textColor"
                      }`}
                      onClick={() =>
                        setSelectedSize((prev) => {
                          if (prev !== size) {
                            return size;
                          } else {
                            return undefined;
                          }
                        })
                      }
                    >
                      {size}
                    </div>
                  );
                })}
            </div>
            <hr className="border-t border-solid border-[#f1f1f1]" />

            <div className="flex items-center">
              <button
                className="outline-none py-3 px-3 border border-solid border-black"
                onClick={decreaseCount}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <p className="px-7">{countQuantity}</p>
              <button
                className="outline-none py-3 px-3 border border-solid border-black"
                onClick={increaseCount}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <hr className="border-t border-solid border-[#f1f1f1]" />

            <div className="w-full">
              <button
                className="w-full md:w-auto py-3 px-5 bg-primary text-black rounded-3xl"
                onClick={handleAddToCart}
              >
                <FontAwesomeIcon icon={faCartPlus} /> Thêm vào giỏ
              </button>
            </div>
            <div>
              Hoặc đặt mua:{" "}
              <span className="text-xl text-red"> 0909300746</span> ( Tư vấn
              Miễn phí )
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-start gap-5">
            <div className="flex flex-col gap-5">
              <SkeletonLoad className="w-[30%] h-[2.4rem]" />

              <SkeletonLoad className="w-full h-[3.8rem]" />

              <SkeletonLoad className="w-[40%] h-[2.4rem]" />
            </div>
            <hr className="border-t border-solid border-[#f1f1f1]" />
            <div className="w-full flex items-center gap-5 flex-wrap">
              {Array(4)
                .fill(1)
                .map((size, index) => {
                  return (
                    <SkeletonLoad key={index} className="w-[6rem] h-[5rem]" />
                  );
                })}
            </div>
            <hr className="border-t border-solid border-[#f1f1f1]" />

            <SkeletonLoad className="w-[30%] h-[5rem]" />

            <hr className="border-t border-solid border-[#f1f1f1]" />

            <SkeletonLoad className="w-[40%] h-[5rem]" />
            <SkeletonLoad className="w-[70%] h-[2.4rem]" />
          </div>
        )}
      </div>
      <section className="container flex flex-col gap-5 mt-15">
        <div className="w-full flex items-center justify-between">
          <div className="uppercase text-2xl font-bold">sản phẩm liên quan</div>
        </div>
        <div className="w-full">
          <Slider
            settings={{
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 4,
              swipeToSlide: true,
              slidesToScroll: 1,
              nextArrow: <></>,
              prevArrow: <></>,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ],
            }}
          >
            {!isLoading
              ? relevants?.data?.length > 0 &&
                relevants.data.map((product) => {
                  return (
                    <div
                      key={product.productCode}
                      className="w-[260px] md:px-3"
                    >
                      <ProductCard product={product} />
                    </div>
                  );
                })
              : Array(4)
                  .fill(1)
                  .map((item, index) => <SkeletonLoadCard key={index} />)}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
