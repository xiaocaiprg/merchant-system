export const ProductStatusEnum = {
  PENDDING: 1,
  PASS: 2,
  REFUSE: 3,
  REMOVE: 4,
};
export const ProductStatus = {
  [ProductStatusEnum.PENDDING]: "待审核",
  [ProductStatusEnum.PASS]: "已通过",
  [ProductStatusEnum.REFUSE]: "驳回",
  [ProductStatusEnum.REMOVE]: "下架",
};
export const OrderStatusEnum = {
  ORDERED: 1, // 已下单，去确认
  CONFIRM: 2, // 已确认,去付款
  HASPAYED: 3, // 已付款
  RECEIVED: 4, // 已确认收款
  DONE: 5, // 已完成
  CANCEL: 6, // 已取消
};
export const OrderStatus = [
  {
    label: "已下单",
    value: OrderStatusEnum.ORDERED,
    type: "danger",
  },
  {
    label: "已确认",
    value: OrderStatusEnum.CONFIRM,
    type: "primary",
  },
  {
    label: "已付款",
    value: OrderStatusEnum.HASPAYED,
    type: "warning",
  },
  { label: "已确认收款", value: OrderStatusEnum.RECEIVED, type: "warning" },
  {
    label: "已完成",
    value: OrderStatusEnum.DONE,
    type: "success",
  },
  {
    label: "取消订单",
    value: OrderStatusEnum.CANCEL,
    type: "info",
  },
];
export const OrderOptsLabel = [
  {
    label: "确认接单",
    value: OrderStatusEnum.ORDERED,
  },
  {
    label: "确认已付款",
    value: OrderStatusEnum.CONFIRM,
  },
];
export const IntegralTypeEnum = {
  TOAGENT: 1, //1:管理员到代理
  ATOUSER: 2, // 2：代理到用户
  MTOUSER: 3, // 3:商家到用户
  COSTED: 4, // 4:用户消费
};
