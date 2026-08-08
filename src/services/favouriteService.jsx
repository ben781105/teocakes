import api from "../api/axios"

export const getFavourites = async () => {
  const response = await api.get("/favourites/");
  console.log("fetched favourites", response.data);
  return response.data;
};