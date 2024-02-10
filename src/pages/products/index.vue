<template>
  <div class="products-page">
    <h2>商品管理</h2>
    <div class="product-area">
      <el-button type="primary" @click="onClickAdd">+ 上架新商品</el-button>
    </div>
    <el-table class="table" :data="productsTableData" style="width: 100%">
      <el-table-column type="index" width="30"> </el-table-column>
      <el-table-column
        v-for="(item, index) in productsInfo"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 180"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.productStatus === ProductStatusEnum.PASS"
            @click.native.prevent="
              operate(scope.$index, scope.row, ProductStatusEnum.REMOVE)
            "
            type="danger"
            size="mini"
            plain
          >
            下架
          </el-button>
          <!-- <el-button
            @click.native.prevent="operate(scope.$index, scope.row)"
            type="success"
            size="mini"
            plain
          >
            查看
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next"
      :total="total"
      :page-size.sync="queryData.pageSize"
      :current-page.sync="queryData.pageNum"
      @current-change="getProductsList()"
      class="pagination"
    >
    </el-pagination>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="confirm-wapper" v-if="curProduct">
        <div class="confirm-info">
          <span class="tips">{{ tips }}</span>
          <span class="info-item">商品ID: {{ curProduct.productId }}</span>
          <span class="info-item">商品名称: {{ curProduct.productName }}</span>
          <span class="info-item">商品积分: {{ curProduct.integral }}</span>
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
import API from "@/api/products";
import { ProductStatus, ProductStatusEnum } from "@/lib/config.ts";

export default {
  name: "products-Page",
  data() {
    return {
      productsTableData: [],
      ProductStatusEnum: ProductStatusEnum,
      total: 0,
      curProduct: null,
      dialogVisible: false,
      tips: "",
      queryData: { pageNum: 1, pageSize: 10 },
    };
  },
  computed: {
    productsInfo() {
      return [
        {
          label: "商品ID",
          prop: "productId",
        },
        {
          label: "商品名称",
          prop: "productName",
          width: 100,
        },
        {
          label: "商品标签",
          prop: "labels",
          width: 100,
        },
        {
          label: "积分",
          prop: "integral",
          width: 100,
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: 100,
        },
        {
          label: "更新时间",
          prop: "updateTime",
        },
        {
          label: "提供商家名称",
          prop: "merchantName",
        },
        {
          label: "商品状态",
          prop: "productStatus",
          formatter: (row, column, cellValue) => {
            return ProductStatus[cellValue];
          },
        },
        {
          label: "分佣比例",
          prop: "rate",
          formatter: (row, column, cellValue) => {
            return cellValue ? cellValue : "暂无";
          },
        },
      ];
    },
  },
  mounted() {
    this.getProductsList();
  },
  methods: {
    getProductsList() {
      API.getProductsList(this.queryData).then(res => {
        this.productsTableData = res?.records;
        this.total = res?.total;
      });
    },

    handleClose() {
      this.dialogVisible = false;
    },
    onConfirm() {
      if (this.curProduct.productStatus === ProductStatusEnum.PASS) {
        const params = {
          productId: this.curProduct.productId, //商品id
          productStatus: ProductStatusEnum.REMOVE, //0:待审核 1：已通过 2：驳回 3：下架
        };
        API.updateProductStatus(params).then(res => {
          res
            ? this.$message.success("下架成功")
            : this.$message.error("下架失败，请重试");
          this.dialogVisible = false;
          this.getProductsList();
        });
      }
    },
    operate(index, row, status) {
      this.curProduct = row;
      if (status === ProductStatusEnum.REMOVE) {
        this.tips = "确认下架此商品？";
        this.dialogVisible = true;
      }
    },
    onClickAdd() {
      this.$router.push("/product-edit");
    },
  },
};
</script>

<style lang="less" scoped>
.products-page {
  .product-area {
    margin: 1rem 0;
  }
  .table {
    margin-top: 1rem;
  }
  .pagination {
    margin-top: 0.5rem;
  }
}
</style>
