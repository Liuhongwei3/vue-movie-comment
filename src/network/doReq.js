import { request } from "./index";
import { to, notify } from "@/utils";

const doReq = async (url, method = "GET", datas = {}) => {
  // notify("info", "信息提示", "加载数据中！");
  
  let [err, data] = await to(request({ url, method, data: datas }));
  if (err) {
    notify("error", "加载错误", err.response.statusText);
    return false;
  } else {
    return data;
  }
};

export default doReq;
