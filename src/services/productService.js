import api from "../api/axios"

export const getCakes = async () => {
  const response = await api.get("/products/");
  console.log("fetched cakes", response.data);
  return response.data;
  
};