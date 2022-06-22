import request from "@/utils/request";

export const getSearchSuggestions = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

export const getSearchResults = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params,
  });
};
