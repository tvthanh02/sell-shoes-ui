const baseUrlApi = "http://localhost:3000/";

export const getProduct = async (id) => {
  const response = await fetch(baseUrlApi + "product/" + id);
  return response.json();
};

export const getBestSellproducts = async (querys = {}) => {
  const response = await fetch(
    baseUrlApi +
      "products" +
      "?q=bestsell&" +
      new URLSearchParams({
        ...querys,
      })
  );
  return response.json();
};

export const getProductByBrand = async (brand) => {
  const response = await fetch(baseUrlApi + "products" + "?brand=" + brand);
  return response.json();
};

export const getSaleProducts = async (querys = {}) => {
  const response = await fetch(
    baseUrlApi +
      "products" +
      "?q=promotion&" +
      new URLSearchParams({
        ...querys,
      })
  );
  return response.json();
};

export const getNewProducts = async (querys = {}) => {
  const response = await fetch(
    baseUrlApi +
      "products" +
      "?" +
      new URLSearchParams({
        ...querys,
      })
  );
  return response.json();
};
