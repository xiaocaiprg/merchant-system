<template>
  <div>
    <div class="header-wrapper">
      <i class="el-icon-back" @click="back"></i>
      <span style="margin-left: 1rem">订单信息</span>
    </div>
    <div v-if="orderDetail" class="order-detail">
      <div class="order-item">
        <span class="order-title">订单状态: </span>
        <el-button :type="orderStatusType" round size="small">{{
          orderStatusLabel
        }}</el-button>
      </div>
      <div class="order-item">
        <span class="order-title">订单ID: </span>
        <div class="order-content">{{ orderDetail.orderId }}</div>
      </div>
      <div class="order-item">
        <span class="order-title">商品名称: </span>
        <div class="order-content">{{ orderDetail.productName }}</div>
      </div>
      <div class="order-item" v-if="orderDetail.cargocode">
        <span class="order-title">取货码: </span>
        <div class="order-content">{{ orderDetail.cargocode }}</div>
      </div>
      <div class="order-item">
        <span class="order-title">所需积分: </span>
        <div class="order-content">{{ orderDetail.price }}</div>
      </div>
      <div class="order-item">
        <span class="order-title">购买用户: </span>
        <div class="order-content">{{ orderDetail.userName }}</div>
      </div>
      <div class="order-item" v-if="orderDetail.cardNum">
        <span class="order-title">购买用户账户: </span>
        <div class="order-content">{{ orderDetail.cardNum }}</div>
      </div>

      <div class="order-item">
        <span class="order-title">购买数量: </span>
        <div class="order-content">{{ orderDetail.orderCount }}</div>
      </div>
      <div class="order-item">
        <span class="order-title">创建时间: </span>
        <div class="order-content">{{ orderDetail.createTime }}</div>
      </div>
      <div class="order-item">
        <span class="order-title">更新时间: </span>
        <div class="order-content">{{ orderDetail.updateTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/order";
import { OrderStatus } from "@/lib/config.ts";
export default {
  name: "Order-Detail",
  data() {
    return {
      orderDetail: null,
      orderid: "",
    };
  },
  created() {
    this.orderid = this.$route.query.orderid;
    this.getOrderDetail(this.orderid);
  },
  computed: {
    orderStatusLabel() {
      return OrderStatus.find(
        item => item.value == this.orderDetail.orderStatus
      ).label;
    },
    orderStatusIcon() {
      return OrderStatus.find(
        item => item.value == this.orderDetail.orderStatus
      ).icon;
    },
    orderStatusType() {
      return OrderStatus.find(
        item => item.value == this.orderDetail.orderStatus
      ).type;
    },
  },
  methods: {
    getOrderDetail(id) {
      API.getOrderDetail(id).then(res => {
        this.orderDetail = res;
      });
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.header-wrapper {
  display: flex;
  align-items: center;
}
.order-detail {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  .order-item {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    .order-title {
      margin-right: 0.5rem;
    }
    .order-content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
