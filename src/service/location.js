const BASE_LOCATION_URL = import.meta.env.VITE_LOCATION_URL_API;

export const getProvinces = async () => {
  try {
    const response = await fetch(BASE_LOCATION_URL + "provinces");
    return response.json();
  } catch (error) {
    return [];
  }
};

export const getDistrictsByProvinceId = async (provinceId) => {
  try {
    const response = await fetch(BASE_LOCATION_URL + "districts/" + provinceId);
    return response.json();
  } catch (error) {
    return [];
  }
};

export const getWardsByDistrictId = async (districtId) => {
  try {
    const response = await fetch(BASE_LOCATION_URL + "villages/" + districtId);
    return response.json();
  } catch (error) {
    return [];
  }
};
