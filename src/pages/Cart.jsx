import { getCartFromStorage, setCartToStorage } from "@/utils/storage";
import {
  faArrowLeft,
  faRemove,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CARTEMPTY from "@/assets/imgs/cart_empty.png";
import { convertNumberToVnd } from "@/utils/convert";
import Swal from "sweetalert2";
import { AppContext } from "@/App";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { dispatcher } = useContext(AppContext);

  const handleRemoveProductFromCart = (code, size) => {
    Swal.fire({
      title: "Xóa Sản Phẩm?",
      text: "Bạn chắc chắn muốn xóa chứ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đúng",
    }).then((result) => {
      if (result.isConfirmed) {
        let updateCart = cart.filter(
          (product) =>
            (product.size !== size && product.code === code) ||
            product.code !== code
        );
        setCartToStorage(updateCart);
        dispatcher({
          type: "UPDATE_QUANTITY",
          payload: getCartFromStorage().length,
        });
        setCart(getCartFromStorage());
        Swal.fire({
          title: "Đã xóa!",
          text: "Đã xóa sản phẩm khỏi giỏ hàng",
          icon: "success",
        });
      }
    });
  };

  const handleDecreaseQuantity = (product) => {
    let { quantity, code, size } = product;
    let newCart;
    if (quantity <= 1) {
      handleRemoveProductFromCart(code, size);
    } else {
      quantity -= 1;
      newCart = cart.map((productInCart) => {
        if (productInCart.code === code && productInCart.size === size) {
          productInCart.quantity = quantity;
        }
        return productInCart;
      });
    }
    newCart && setCartToStorage(newCart);
    setCart(getCartFromStorage());
  };

  const handleIncreaseQuantity = (product) => {
    let { totalQuantity, quantity, code, size } = product;
    let newCart;
    if (quantity === totalQuantity) {
      return;
    } else {
      quantity += 1;
      newCart = cart.map((productInCart) => {
        if (productInCart.code === code && productInCart.size === size) {
          productInCart.quantity = quantity;
        }
        return productInCart;
      });
    }
    newCart && setCartToStorage(newCart);
    setCart(getCartFromStorage());
  };

  const sumQuantityAndPrice = useMemo(() => {
    return Array.from(cart).reduce(
      (obj, currentProduct) => {
        return {
          totalQuantity: obj.totalQuantity + currentProduct.quantity,
          totalPrice:
            obj.totalPrice + currentProduct.quantity * currentProduct.price,
        };
      },
      {
        totalQuantity: 0,
        totalPrice: 0,
      }
    );
  }, [cart]);

  useEffect(() => {
    const cartData = getCartFromStorage();
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  return (
    <div className="container text-black">
      {cart?.length > 0 ? (
        <>
          <div className="hidden md:grid md:grid-cols-2/1x5 lg:grid-cols-4/1x5 gap-3 py-6 text-black">
            <p className="text-base font-bold flex ">Sản Phẩm</p>
            <p className="text-base font-bold flex justify-center">Số Lượng</p>
            <p className="text-base font-bold flex justify-center">Kích cỡ</p>

            <p className="text-base font-bold flex justify-center">Giá Bán</p>
            <p className="text-base font-bold flex justify-center">Tổng Giá</p>
            <p className="text-base font-bold flex justify-center">Hành Động</p>
          </div>
          <hr className="border-t-gray" />
          {cart.map((product) => {
            return (
              <div
                key={[product.code, product.size].join()}
                className="grid grid-cols-1 md:grid-cols-2/1x5 lg:grid-cols-4/1x5 gap-5 md:gap-3 py-3 border-b border-solid border-b-[#f1f1f1] last:border-b-0 last:border-transparent"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-[200px] h-[120px] flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={product.productThumb}
                      alt="PRODUCT"
                    />
                  </div>
                  <div className="md:hidden lg:flex flex-col gap-1 items-start justify-center">
                    <p className="text-[1.5rem] font-bold">
                      {product.productName}
                    </p>
                    <p className="text-[1.4rem] text-red font-bold">
                      SL: {product.totalQuantity}
                    </p>
                  </div>
                </div>
                <p className="text-base font-bold flex items-center md:justify-between lg:justify-center gap-3 text-black">
                  <button
                    className="outline-none py-2 px-3 border border-solid border-black lg:py-2 lg:px-3 lg:border lg:border-solid lg:border-black md:py-0 md:px-0 md:border-none  md:border-transparent"
                    onClick={() => handleDecreaseQuantity(product)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  {product.quantity}
                  <button
                    className="outline-none py-2 px-3 border border-solid border-black lg:py-2 lg:px-3 lg:border lg:border-solid lg:border-black md:py-0 md:px-0 md:border-none  md:border-transparent"
                    onClick={() => handleIncreaseQuantity(product)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </p>
                <p className="hidden text-base font-bold md:flex items-center justify-center text-red">
                  {product.size}
                </p>
                <p className="hidden text-base font-bold md:flex items-center justify-center text-black">
                  {convertNumberToVnd(product.price)}
                </p>
                <p className="hidden text-base font-bold md:flex items-center justify-center text-red">
                  {convertNumberToVnd(product.quantity * product.price)}
                </p>
                <div className="hidden text-base font-bold md:flex items-center justify-center">
                  <div
                    className="w-[40px] h-[40px] flex items-center justify-center border border-solid border-red text-red rounded-full"
                    onClick={() =>
                      handleRemoveProductFromCart(product.code, product.size)
                    }
                  >
                    <FontAwesomeIcon icon={faRemove} />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="w-full flex flex-col md:flex-row items-center justify-end gap-10 mt-8">
            <p className="text-base font-bold flex items-center gap-4 text-black">
              Tổng sản phẩm:{" "}
              <span className="text-red">
                {sumQuantityAndPrice.totalQuantity}
              </span>{" "}
            </p>
            <p className="text-base font-bold flex items-center gap-4 text-black">
              Tổng giá:{" "}
              <span className="text-red">
                {convertNumberToVnd(sumQuantityAndPrice.totalPrice)}
              </span>{" "}
            </p>

            <button
              className="py-2 px-7 bg-primary rounded-xl font-semibold shadow-md text-black"
              onClick={() => navigate("/payment")}
            >
              Mua
            </button>
          </div>
        </>
      ) : (
        <div className="w-full container flex justify-center">
          <img src={CARTEMPTY} alt="CART_EMPTY" />
        </div>
      )}
      <div className="">
        <button
          className="hidden my-8 py-4 px-4 md:flex items-center gap-3  bg-primary rounded-xl font-semibold shadow-md text-black"
          onClick={() => navigate("/product")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back To Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
