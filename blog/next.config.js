const withCss = require("@zeit/next-css");

if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {};
}
const isProdMode = process.env.NODE_ENV === "production";
console.log("isProdMode", isProdMode);

const serverBaseUrl = isProdMode
  ? "http://47.99.240.75:7001/default/"
  : "http://127.0.0.1:7001/default/";
// const serverApiUrl=isProdMode ? 'http://localhost:8080/myserver/api':'http://192.168.100.123:8080/myserver/api'
const nextConfig = {
  serverRuntimeConfig: {
    //这里的配置项只能在服务端获取到，在浏览器端是获取不到的
    //todo server
  },
  publicRuntimeConfig: {
    //这里的配置既可以服务端获取到，也可以在浏览器端获取到
    serverBaseUrl: serverBaseUrl
    // serverApiUrl: serverApiUrl,
  }
};

module.exports = withCss(nextConfig);
