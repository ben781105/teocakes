import api from "../api/axios";

export const getCakes = async () => {
  const response = await api.get("/products/");
  return response.data;
};
