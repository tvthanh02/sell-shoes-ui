export const setCartToStorage = (value) => {
  localStorage.setItem("cart", JSON.stringify(value));
};

export const getCartFromStorage = () => {
  const value = localStorage.getItem("cart");
  if (!value) {
    return [];
  }

  return JSON.parse(value);
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
