import api from "../api/axios";

let cakesCache = null;
let cachePromise = null;

export const getCategories = async () => {
  if (cakesCache) return cakesCache;
  if (cachePromise) return cachePromise;

  cachePromise = api
    .get("/categories/")
    .then((res) => {
      cakesCache = res.data;
      cachePromise = null;
      return cakesCache;
    })
    .catch((err) => {
      cachePromise = null;
      throw err;
    });

  return cachePromise;
};
