<template>
  <div class="integral-page">
    <el-page-header @back="goBack" content="我的积分"> </el-page-header>
    <el-card
      class="box-card"
      v-if="merchantInfo"
      :body-style="{
        display: 'flex',
        alignItems: 'end',
        flex: 1,
        'justify-content': 'space-between',
      }"
    >
      <div class="card-left">
        <div class="card-item">待使用积分: {{ merchantInfo.integral }}</div>
        <div class="card-item">已使用积分: {{ merchantInfo.usedIntegral }}</div>
        <div class="card-item">总积分: {{ merchantInfo.totalIntegral }}</div>
      </div>
      <div class="card-right">
        <el-button type="primary" @click="onOperateIntegral"
          >去分配积分</el-button
        >
      </div>
    </el-card>
    <div class="integral-list">
      <h5>积分明细表</h5>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabData"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table class="table" :data="integralData" style="width: 100%">
            <el-table-column type="index" width="30"> </el-table-column>
            <el-table-column
              v-for="(item, index) in integralInfo"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width || 180"
              :formatter="item.formatter"
            >
            </el-table-column>
          </el-table>
          <el-pagination
            layout="total, prev, pager, next"
            :page-size.sync="queryData.pageSize"
            :total="total"
            :current-page.sync="queryData.pageNum"
            @current-change="getIntegral()"
            class="pagination"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="提示"
      :visible="showDialog"
      width="30%"
      :before-close="handleClose"
    >
      <div class="add-box">
        <div class="agent-item">
          充值用户账户：
          <el-input
            clearable
            size="small"
            v-model="username"
            :validate-event="true"
            placeholder="请输入充值用户账户"
            @input="onNameInput"
          ></el-input>
        </div>
        <div class="agent-item">
          充值积分：
          <el-input
            clearable
            size="small"
            v-model="intergral"
            :validate-event="true"
            placeholder="请输入充值积分"
            @input="onIntegralInput"
          ></el-input>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixins } from "@/lib/mixin";
import API from "@/api/integral";
import { IntegralTypeEnum } from "@/lib/config.ts";
export default {
  name: "Integral-Page",
  mixins: [mixins],
  data() {
    return {
      integralData: [],
      total: 0,
      merchantInfo: null,
      activeName: String(IntegralTypeEnum.MTOUSER),
      queryData: {
        integralType: IntegralTypeEnum.MTOUSER,
        pageNum: 1,
        pageSize: 10,
      },
      tabData: [
        {
          label: "已分配积分",
          name: String(IntegralTypeEnum.MTOUSER),
        },
        {
          label: "已获取积分",
          name: String(IntegralTypeEnum.COSTED),
        },
      ],
      showDialog: false,
      intergral: "",
      username: "",
    };
  },
  computed: {
    integralInfo() {
      if (this.activeName === String(IntegralTypeEnum.COSTED)) {
        return [
          {
            label: "商品名称",
            prop: "productname",
          },
          {
            label: "获取积分",
            prop: "integral",
          },
          {
            label: "订单ID",
            prop: "orderId",
          },
          {
            label: "时间",
            prop: "createTime",
          },
        ];
      }
      return [
        {
          label: "分配用户名称",
          prop: "username",
        },
        {
          label: "分配积分",
          prop: "integral",
        },
        {
          label: "时间",
          prop: "createTime",
        },
      ];
    },
    isValid() {
      return Boolean(this.username) && /^\d+$/.test(this.intergral);
    },
  },
  created() {
    this.getMerchantInfo().then(res => {
      this.merchantInfo = res;
    });
    this.getIntegral();
  },
  methods: {
    getIntegral() {
      return API.queryIntegral(this.queryData).then(res => {
        this.integralData = res.records;
      });
    },
    goBack() {
      this.$router.back();
    },
    handleClick() {
      this.queryData.integralType = Number(this.activeName);
      this.integralData = [];
      this.getIntegral();
    },
    onOperateIntegral() {
      this.showDialog = true;
    },
    onIntegralInput(value) {
      this.intergral = value;
    },
    onNameInput(value) {
      this.username = value;
    },
    onConfirm() {
      if (this.isValid) {
        const params = {
          username: this.username,
          integral: this.intergral, //积分
          integralType: IntegralTypeEnum.MTOUSER, //1:管理员到代理 2：代理到用户 3:商家到用户
        };
        API.addIntegral(params).then(res => {
          if (res) {
            this.$message.success("充值成功");
            this.showDialog = false;
            this.getIntegral();
          } else {
            this.showDialog = false;
            this.$message.error("充值失败，请联系管理员");
          }
        });
      } else {
        this.$message.error("请检查输入值");
      }
    },
    handleClose() {
      this.showDialog = false;
    },
  },
};
</script>
<style lang="less" scoped>
.box-card {
  display: flex;
  max-width: 20rem;
  margin-top: 2rem;
  font-size: 0.8rem;
  .card-left {
    display: flex;
    flex-direction: column;

    .card-item {
      margin-bottom: 0.5rem;
    }
  }
}
.integral-list {
  margin-top: 1rem;
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
.add-box {
  display: flex;
  flex-direction: column;
  .agent-item {
    display: flex;
    margin-top: 10px;
    white-space: nowrap;
    align-items: center;
  }
}
</style>
