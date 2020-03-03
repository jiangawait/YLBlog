import axios from "axios";
import getConfig from "next/config";
const { serverBaseUrl } = getConfig().publicRuntimeConfig;
console.log("serverBaseUrl=", serverBaseUrl);

// axios.defaults.baseURL=serverBaseUrl;
// const prefix = "http://127.0.0.1:7001/default/";

const request = async (url, { method = "GET", ...params }) => {
  const promise = new Promise(resolve => {
    axios
      .request({
        baseURL: serverBaseUrl,
        url: url,
        method: method,
        params: params
      })
      .then(res => {
        resolve(res.data);
      });
  });

  return await promise;
};
const api = {
  getTypeInfo: () => request("getTypeInfo", {}), //  首页文章列表接口
  getArticleList: () => request("getArticleList", {}), //  首页文章列表接口
  getArticleById: params =>
    request("getArticleById", { ...params, method: "GET" }), // 文章详细页内容接口 ,需要接收参数
  getListById: params => request("getListById", params) // 根据类别ID获得文章列表
};
export default api;
