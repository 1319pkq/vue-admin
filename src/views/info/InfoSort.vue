<template>
  <div id="infoSort">
    <el-button type="danger" @click="addFirstClass()">添加一级分类</el-button>
    <hr style="margin-top:30px; margin-bottom:30px" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category" v-for="item in formData" :key="item.id">
              <h4>
                <img src="@/assets/add.png" />
                {{item.category_name}}
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" type="success" round>添加子级</el-button>
                  <el-button size="mini" round @click="deleteCategory(item.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="itemChild in item.children" :key="itemChild.id">
                  {{itemChild.category_name}}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="menu-title">
            <div class="title">一级分类编辑</div>
          </div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="一级分类名称" v-if="form.addFirst">
              <el-input v-model="form.category" :disabled="disabled_1"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-if="form.addSecond">
              <el-input v-model="form.secCategoryName" :disabled="disabled_2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit()" :disabled="disabled_btn">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { AddFirstCategory, GetCategory, DeleteCategory } from "@/api/news";
export default {
  name: "infoSort",
  data() {
    return {
      form: {
        category: "",
        secCategoryName: "",
        addFirst: true,
        addSecond: true
      },
      disabled_1: true,
      disabled_2: true,
      disabled_btn: true,
      formData: []
    };
  },
  methods: {
    submit() {
      // 提前判断文本框内容是否为空,为空就不走接口
      if (!this.form.category) {
        this.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      AddFirstCategory({ categoryName: this.form.category })
        .then(response => {
          let data = response.data;
          if (data.resCode === 0) {
            this.$message({
              message: data.message,
              type: "success"
            });
            // 1,添加成功后,调用获取信息分类数据方法
            // this.getCategory();
            // 2,添加成功后,把添加数据push到formData数组中,这样可以减少浏览器内存消耗
            this.formData.push(data.data);

            this.form.category = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addFirstClass() {
      this.form.addSecond = false;
      this.disabled_1 = false;
      this.disabled_btn = false;
    },
    getCategory() {
      // 获取信息分类
      GetCategory({})
        .then(response => {
          let data = response.data.data.data;
          this.formData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 删除分类
    deleteCategory(categoryID) {
      DeleteCategory({ categoryId: categoryID })
        .then(response => {
          // 过滤
          let newFormData = this.formData.filter(item => item.id !== categoryID)
          this.formData = newFormData;
          
          let data = response.data;
          if (data.resCode === 0) {
            this.$message({
              message: data.message,
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getCategory();
  }
};
</script>

<style lang="scss" scoped>
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  cursor: pointer;
  position: relative;
  line-height: 44px;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    padding-left: 40px;
    position: relative;
    img {
      position: absolute;
      top: 10px;
      left: 12px;
      width: 20px;
      background: #fff;
    }
  }
  .button-group {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  h4,
  li {
    &:hover {
      background-color: #f4f4f4;
      .button-group {
        display: block;
      }
    }
  }
}
.menu-title {
  .title {
    background-color: #f4f4f4;
    line-height: 44px;
    padding-left: 22px;
  }
}
</style>