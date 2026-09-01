import api from "../api/axios";

export const getFavourites = async () => {
  const response = await api.get("/favourites/");
  return response.data;
};
