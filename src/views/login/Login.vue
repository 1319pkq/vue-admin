<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{current: item.current}"
          v-for="item in menuTab"
          :key="item.id"
          @click="changeCurrent(item)"
        >{{item.txt}}</li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-from">
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="item-from">
          <el-button type="danger" @click="submitForm('ruleForm')" class="block margin-top">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    // 验证邮箱
    var validateUsername = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("邮箱格式有误!"));
      } else {
        callback();
      }
    };
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码为6至20 数字+字母!"));
      } else {
        callback();
      }
    };
    // 验证码
    var validateCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式有误!"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true },
        { txt: "注册", current: false }
      ],
      // 表单
      ruleForm: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  // 定义函数
  methods: {
    // 登录注册背景的高光切换
    changeCurrent(data) {
      this.menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
    },
    // 表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  // 创建完成时
  created() {},
  // 挂载完成时
  mounted() {}
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #344a5f;
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
// 表单
.login-from {
  margin-top: 29px;
  label {
    font-size: 14px;
    color: #ffffff;
    display: block;
    margin-bottom: 3px;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .margin-top {
    margin-top: 19px;
  }
}
</style>