const path = require("path");

// function resolve(dir) {
//   return path.join(__dirname, dir);
// }

module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/movie": {
        target: "http://localhost:8080/ssm_project_war_exploded/movie",
        changeOrigin: true,
        pathRewrite: {
          "^/movie": "",
        },
      },
      "/user": {
        target: "http://localhost:8080/ssm_project_war_exploded/user",
        changeOrigin: true,
        pathRewrite: {
          "^/user": "",
        },
      },
      "/admin": {
        target: "http://localhost:8080/ssm_project_war_exploded/admin",
        changeOrigin: true,
        pathRewrite: {
          "^/admin": "",
        },
      },
      "/comment": {
        target: "http://localhost:8080/ssm_project_war_exploded/comment",
        changeOrigin: true,
        pathRewrite: {
          "^/comment": "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    externals: {},
  },
};
