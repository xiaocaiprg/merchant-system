<template>
  <div class="order-page">
    <h3>订单管理</h3>
    <div class="filter-header">
      <div class="filter-item">
        <span class="filter-label">订单状态: </span>
        <el-select
          v-model="queryData.orderStatus"
          placeholder="请选择"
          size="small"
          @change="handleFilterChange"
        >
          <el-option
            v-for="item in orderStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="filter-operation">
        <el-button type="primary" round size="small" @click="getOrderList()"
          >查询</el-button
        >
        <el-button round size="small" @click="reset">重置</el-button>
      </div>
    </div>
    <el-table class="table" :data="orderTableData" style="width: 100%">
      <el-table-column type="index" width="30"> </el-table-column>
      <el-table-column
        v-for="(item, index) in orderInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
        :formatter="item.formatter"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <div class="opt-pannel">
            <div v-for="(opt, index) in orderOptsLabel" :key="index">
              <el-button
                v-if="getOptVisiable(opt, scope.row)"
                @click.native.prevent="operate(scope.$index, scope.row, opt)"
                type="primary"
                size="mini"
                plain
              >
                {{ opt.label }}
              </el-button>
            </div>
            <el-button
              class="check-btn"
              @click.native.prevent="operate(scope.$index, scope.row)"
              type="success"
              size="mini"
              plain
            >
              查看
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="total, prev, pager, next"
      :page-size.sync="queryData.pageSize"
      :total="total"
      :current-page.sync="queryData.pageNum"
      @current-change="getOrderList()"
      class="pagination"
    >
    </el-pagination>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="confirm-wapper" v-if="curOrder">
        <div class="confirm-info">
          <span class="tips">{{ tips }}</span>
          <span class="info-item">订单Id: {{ curOrder.orderId }}</span>
          <span class="info-item">下单用户: {{ curOrder.userName }}</span>
          <span
            class="info-item card-num"
            v-if="curOrder.cardNum && curOrder.categoryId === 3"
            >下单用户账号: {{ curOrder.cardNum }}</span
          >
          <span class="info-item">商品名称: {{ curOrder.productName }}</span>
          <span class="info-item">商品积分: {{ curOrder.price }}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/order";
import { OrderStatus, OrderOptsLabel, OrderStatusEnum } from "@/lib/config.ts";
export default {
  name: "Order-Page",
  data() {
    return {
      orderTableData: [],
      total: 0,
      orderOptsLabel: OrderOptsLabel,
      orderStatus: OrderStatus,
      queryData: {
        orderStatus: "",
        pageNum: 1,
        pageSize: 10,
      },
      dialogVisible: false,
      curOrder: null,
      tips: "",
    };
  },
  computed: {
    orderInfo() {
      return [
        {
          label: "订单ID",
          prop: "orderId",
        },
        {
          label: "商品名称",
          prop: "productName",
        },
        // {
        //   label: "商品ID",
        //   prop: "productId",
        //   width: 100,
        // },
        {
          label: "购买用户",
          prop: "userName",
          width: 100,
        },
        // {
        //   label: "购买用户Id",
        //   prop: "userId",
        //   width: 100,
        // },
        {
          label: "积分",
          prop: "integral",
          width: 100,
        },
        {
          label: "购买数量",
          prop: "orderCount",
          width: 90,
        },
        {
          label: "提货码",
          prop: "cargocode",
          formatter: (row, column, cellValue) => {
            return cellValue.orderStatus === OrderStatusEnum.DONE &&
              cellValue.categoryId === 3
              ? cellValue
              : "本商品无取货码";
          },
        },
        {
          label: "购买时间",
          prop: "createTime",
        },
        {
          label: "订单状态",
          prop: "orderStatus",
          width: 100,
          formatter: (row, column, cellValue) => {
            return OrderStatus.find(item => item.value === cellValue).label;
          },
        },
        {
          label: "用户备注",
          prop: "notes",
          width: 100,
        },
      ];
    },
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      API.getOrderList(this.queryData).then(res => {
        this.orderTableData = res?.records;
        this.total = res?.total;
      });
    },
    handleFilterChange() {
      this.getOrderList();
    },
    reset() {
      this.queryData = {
        pageNum: 1,
        pageSize: 10,
        orderStatus: "",
      };
      this.getOrderList();
    },
    getOptVisiable(opt, row) {
      // 商家确认 且 为实物商品
      if (
        (row.orderStatus === OrderStatusEnum.CONFIRM && row.categoryId === 3) ||
        row.orderStatus === OrderStatusEnum.ORDERED
      ) {
        return opt.value === row.orderStatus;
      }
    },
    operate(index, row, opts) {
      this.curOrder = row;
      if (opts && opts.value === OrderStatusEnum.ORDERED) {
        this.tips = "确定要接此单? 接单后需尽快完成";
        this.dialogVisible = true;
      } else if (opts && opts.value === OrderStatusEnum.CONFIRM) {
        this.tips =
          "确认客户已经收到货款？确认后将生成唯一取货码，此操作需谨慎确认";
        this.dialogVisible = true;
      } else {
        this.$router.push({
          path: "/order-detail",
          query: {
            orderid: row.orderId,
          },
        });
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    onConfirm() {
      if (this.curOrder.orderStatus === OrderStatusEnum.ORDERED) {
        API.toConfirmOrder({ orderId: this.curOrder.orderId }).then(res => {
          res
            ? this.$message.success("已成功确认此订单")
            : this.$message.error("确认失败，请重试");
          this.dialogVisible = false;
          this.getOrderList();
        });
      } else if (this.curOrder.orderStatus === OrderStatusEnum.CONFIRM) {
        API.toConfirmPayOrder({ orderId: this.curOrder.orderId }).then(res => {
          res
            ? this.$message.success("已成功确认给用户付款")
            : this.$message.error("确认失败，请重试");
          this.dialogVisible = false;
          this.getOrderList();
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.order-page {
  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0.5rem 0;
    .filter-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      .filter-label {
        font-size: 0.8rem;
        margin-right: 0.5rem;
      }
    }
  }
  .table {
    margin-top: 1rem;
    .opt-pannel {
      display: flex;
      flex-wrap: wrap;
      .check-btn {
        margin-left: 4px;
      }
    }
  }
  .pagination {
    margin-top: 0.5rem;
  }
}
</style>
