import { getCartFromStorage } from "@/utils/storage";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = getCartFromStorage();
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  return (
    <div className="container">
      {cart?.length > 0 &&
        cart.map((cart) => {
          return (
            <div key={cart.productCode} className="flex items-center gap-10">
              <p>{cart.productCode}</p>
              <p>{cart.productName}</p>
              <p>{cart.quantity}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
