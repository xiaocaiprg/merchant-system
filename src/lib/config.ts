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
  DONE: 4, // 已完成
  CANCEL: 5, // 已取消
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
    label: "确认订单",
    value: OrderStatusEnum.ORDERED,
  },
  {
    label: "确认已付款",
    value: OrderStatusEnum.CONFIRM,
  },
];
