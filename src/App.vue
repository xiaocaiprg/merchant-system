<template>
  <div id="app">
    <div v-if="!isLogin" class="not-login">
      <div class="header-logo">海洋国际商家管理后台</div>
      <h2>请登录</h2>
      <div class="login-card">
        <div class="login-item">
          用户名：
          <el-input
            placeholder="请输入用户名"
            v-model="merchantName"
            clearable
          ></el-input>
        </div>
        <div class="login-item">
          密码：
          <el-input
            placeholder="请输入密码"
            v-model="passWord"
            show-password
            clearable
          ></el-input>
        </div>
      </div>
      <el-button type="primary" round class="login-btn" @click="onLogin"
        >登录</el-button
      >
    </div>
    <div v-else style="height: 100%">
      <div class="header">
        <div class="header-logo">海洋国际商家管理后台</div>
        <div class="heade-user">
          <div class="user">用户名:{{ merchantName }}</div>
          <!-- <el-button round size="small" @click="onLoginOut">退出登录</el-button> -->
        </div>
      </div>
      <div class="container">
        <div class="siderbar-aside">
          <i class="el-icon-s-fold" @click="onSelectMenu"></i>
          <el-menu
            :default-active="activeIndex"
            class="menu-vertical"
            router
            :collapse="collapse"
          >
            <el-menu-item
              :index="menu.path"
              v-for="(menu, key) in menuList"
              :key="key"
            >
              <i :class="menu.icon"></i>
              <span slot="title">{{ menu.name }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 右侧内容区域 -->
        <div class="siderbar-main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/merchant";
import { mixins } from "./lib/mixin";

export default {
  name: "App",
  mixins: [mixins],
  data() {
    return {
      isLogin: true,
      passWord: "",
      activeIndex: "/products",
      merchantName: "",
      menuList: [
        {
          name: "商品管理",
          path: "/products",
          icon: "el-icon-goods",
        },
        {
          name: "订单管理",
          path: "/orders",
          icon: "el-icon-document",
        },
        {
          name: "我的积分",
          path: "/integrals",
          icon: "el-icon-user",
        },
      ],
      collapse: false,
    };
  },
  created() {
    this.getMerchantInfo().then(res => {
      if (res) {
        this.merchantName = res.merchantname;
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  },
  methods: {
    onLogin() {
      if (this.merchantName === "" || this.passWord === "")
        return this.$message.warning("请先登录");
      API.merchantLogin({
        merchantname: this.merchantName,
        password: this.passWord,
      }).then(res => {
        if (res) {
          this.$message.success("登录成功");
          this.isLogin = true;
          this.merchantName = res.merchantname;
        } else {
          this.$message.error("登录失败");
        }
      });
    },
    onLoginOut() {},
    onSelectMenu() {
      this.collapse = !this.collapse;
    },
  },
};
</script>
<style lang="less" scoped>
.header-logo {
  font-weight: 700;
  font-family: DINAlternate-Bold;
  font-size: 1.5rem;
  color: #221e6a;
}

.not-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  margin-top: 2rem;
  .login-card {
    font-size: 1rem;
    .login-item {
      margin-top: 1rem;
    }
  }
  .login-btn {
    margin-top: 1rem;
    width: 10rem;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 6px 0 rgba(182, 195, 217, 0.26);
  height: 8%;
  .heade-user {
    display: flex;
    align-items: center;
    .user {
      margin-right: 0.5rem;
    }
  }
}
.container {
  display: flex;
  margin-top: 4px;
  height: 92%;
  .siderbar-aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .el-icon-s-fold {
      padding-top: 20px;
      padding-right: 20px;
    }
  }
  .menu-vertical {
    height: 100%;
  }
  .siderbar-main {
    width: 100%;
    height: 100%;
    padding: 1rem;
    overflow: scroll;
  }
}
</style>
