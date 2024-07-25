const baseUrlApi = import.meta.env.VITE_BASE_URL_API;

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

export const searchProducts = async (searchKey, page = 0) => {
  const response = await fetch(
    baseUrlApi + "products" + `?q=${searchKey}&page=${page}`
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
  console.log(baseUrlApi);
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

export const addBill = async (bill) => {
  let isSuccess = true;
  try {
    await fetch(baseUrlApi + "bills", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(bill),
    });
  } catch (error) {
    isSuccess = false;
  }
  return isSuccess;
};
