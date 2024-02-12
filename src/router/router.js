import Vue from "vue";
import Router from "vue-router";

import Integral from "../pages/integrals/index.vue";
import Products from "../pages/products/index.vue";
import Orders from "../pages/orders/index.vue";
import OrderDetail from "../pages/orders/order-detail.vue";
import ProductEdit from "../pages/products/product-edit.vue";
Vue.use(Router);
const routes = [
  { path: "/integrals", component: Integral },
  { path: "/products", component: Products },
  { path: "/orders", component: Orders },
  { path: "/order-detail", component: OrderDetail },
  { path: "/product-edit", component: ProductEdit },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes, // (缩写) 相当于 routes: rosutes
  mode: "history",
  base: "/merchant/",
});

export default router;
