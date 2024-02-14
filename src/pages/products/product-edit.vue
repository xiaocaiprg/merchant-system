<template>
  <div>
    <div class="header-wrapper">
      <i class="el-icon-back" @click="back"></i>
      <span style="margin-left: 1rem">上架新商品</span>
    </div>
    <div class="edit-product">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
      >
        <el-form-item label="商品名称:" prop="productName">
          <el-input
            style="width: 15rem"
            v-model="ruleForm.productName"
          ></el-input>
        </el-form-item>
        <el-form-item label="积分:" prop="integral">
          <el-input
            style="width: 15rem"
            v-model.number="ruleForm.integral"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品标签:" prop="labels">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            style="margin-right: 3px"
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputTag"
            ref="saveTagInput"
            style="width: 5rem"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ 添加商品标签</el-button
          >
        </el-form-item>
        <el-form-item label="商品一级分类:" prop="categoryId">
          <el-select
            v-model="ruleForm.categoryId"
            placeholder="请选择"
            clearable
            @change="onChangeCate"
          >
            <el-option
              v-for="item in categoryIds"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品子分类:" prop="subcategoryId">
          <el-select
            v-model="ruleForm.subcategoryId"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in subcategoryIds"
              :key="item.subcategoryId"
              :label="item.subcategoryName"
              :value="item.subcategoryId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片:" prop="pics">
          <el-upload
            action="http://www.enjoyclub.shop/haiyang/base/uploadImg"
            list-type="picture-card"
            name="image"
            :headers="uploadHeaders"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            multiple
            :limit="10"
            ref="upload"
            :file-list="uploadPics"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且文件命名不能出现特殊字符
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述:" prop="descrips">
          <el-input type="textarea" v-model="ruleForm.descrips"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/products";
export default {
  name: "Product-Edit",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      inputVisible: false,
      inputTag: "",
      dynamicTags: [],
      uploadPics: [],
      categoryIds: [],
      ruleForm: {
        productName: "",
        integral: "",
        labels: "",
        categoryId: "",
        subcategoryId: "",
        descrips: "",
        pics: "",
      },
      rules: {
        productName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        integral: [
          {
            required: true,
            type: "number",
            message: "请输入商品售卖积分，必须为数字值",
          },
        ],
        labels: [{ required: true, message: "请为商品添加至少一个标签" }],
        categoryId: [{ required: true, message: "请选择一个分类" }],
        subcategoryId: [{ required: true, message: "请选择一个分类" }],
        pics: [{ required: true, message: "请为商品添加1-10张图片" }],
      },
    };
  },
  computed: {
    uploadHeaders() {
      return {
        authorization: window.localStorage.getItem("m-authorization") || "",
      };
    },
    subcategoryIds() {
      const selected = this.categoryIds.find(
        item => item.categoryId == this.ruleForm.categoryId
      );
      return selected && selected.subcategorys;
    },
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      return API.getCategoryList().then(res => {
        this.categoryIds = res;
      });
    },

    onChangeCate() {
      this.ruleForm.subcategoryId = "";
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.ruleForm.labels = this.dynamicTags.join(",");
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputTag;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        this.ruleForm.labels = this.dynamicTags.join(",");
      }
      this.inputVisible = false;
      this.inputTag = "";
    },
    handleRemove() {},
    handleSuccess(response) {
      if (response.code == 200) {
        this.uploadPics.push({ url: response.result });
        this.ruleForm.pics = this.uploadPics.map(item => item.url).join(",");
      } else {
        this.$message.error("上传图片失败，请重试");
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async handleUpload() {
      this.$refs.upload.submit();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          API.addProduct(this.ruleForm).then(res => {
            if (res) {
              this.$message({
                message: "添加成功",
                type: "success",
                duration: 1000,
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            } else {
              this.$message.error("添加失败，请重试");
            }
          });
        } else {
          this.$message.error("新建商品失败，请检查必填项");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dynamicTags = [];
      this.uploadPics = [];
      this.$refs[formName].resetFields();
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
.edit-product {
  margin-top: 2rem;
}
</style>
