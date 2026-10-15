import api from "../api/axios";

let postsCache = null;
let cachePromise = null;

export const getTikTokPosts = async () => {
  if (postsCache) return postsCache;
  if (cachePromise) return cachePromise;

  cachePromise = api
    .get("/tiktok/")
    .then((res) => {
      postsCache = res.data;
      cachePromise = null;
      return postsCache;
    })
    .catch((err) => {
      cachePromise = null;
      throw err;
    });

  return cachePromise;
};
