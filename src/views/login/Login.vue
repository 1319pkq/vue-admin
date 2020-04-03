<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{current: item.current}"
          v-for="item in menuTab"
          :key="item.id"
          @click="changeCurrent(item, 'ruleForm')"
        >{{item.txt}}</li>
      </ul>
      <!-- 表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-from">
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2" class="item-from" v-show="model === 'register'">
          <label for="password2">再次输入密码</label>
          <el-input
            id="password2"
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
            maxlength="20"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input id="code" v-model="ruleForm.code" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
              >{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="item-from">
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block margin-top"
          >{{model === "login" ? "登录" : "注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 加密
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login";
import { stripscript } from "@/utils/validate";
export default {
  name: "login",
  components: {},
  data() {
    // 验证邮箱
    var validateUsername = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.username = stripscript(value);
      value = this.ruleForm.username;

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
      // 过滤后的数据
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;

      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码为6至20 数字+字母!"));
      } else {
        callback();
      }
    };
    // 再次验证密码
    var validatePassword2 = (rule, value, callback) => {
      // 判断是否走验证代码这块
      if (this.model === "login") {
        callback();
      }
      // 过滤后的数据
      this.ruleForm.password2 = stripscript(value);
      value = this.ruleForm.password2;

      if (value === "") {
        callback(new Error("请重复输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确!"));
      } else {
        callback();
      }
    };
    // 验证码
    var validateCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/;
      // 匹配必须包括数字+字母的6位数
      // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6}$/
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式有误!"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      model: "login",
      // 验证码按钮状态
      codeButtonStatus: {
        status: false,
        text: "获取验证码"
      },
      number: 60,
      timer: {},
      // 表单
      ruleForm: {
        username: "111@qq.com",
        password: "",
        password2: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        password2: [{ validator: validatePassword2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  // 定义函数
  methods: {
    /**
     * 登录和注册背景高光切换以及模式的切换
     * 切换时,清空表单内容
     */
    changeCurrent(data, ruleForm) {
      this.menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
      // 切换模式(登录和注册)
      this.model = data.type;
      // 清空表单内容
      this.$refs[ruleForm].resetFields();
      // 判断计时器是否存在,存在就清除
      if (this.codeButtonStatus.status) {
        this.clearTimer();
        this.codeButtonStatus.text = "获取验证码";
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.model === "login") {
            this.login();
          } else {
            this.register();
          }
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 登录
    login() {
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      };
      // 登录接口
      Login(requestData)
        .then(response => {
          console.log("登录结果" + response);
          this.$message({
            message: response.data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 注册
    register() {
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      };
      // 注册接口
      Register(requestData)
        .then(response => {
          console.log(response);
          this.$message({
            message: response.data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取验证码
    getSms() {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      // 进行提示
      if (this.ruleForm.username === "") {
        this.$message.error("邮箱不能为空!!");
        return false;
      }
      if (!reg.test(this.ruleForm.username)) {
        this.$message.error("邮箱格式不对!!");
        return false;
      }
      // 验证码按钮状态改变
      this.codeButtonStatus.status = true;
      this.codeButtonStatus.text = "发送中..";
      // 请求的接口
      GetSms({ username: this.ruleForm.username, module: this.module })
        .then(response => {
          console.log(response);
          // 倒计时
          this.countTimer();
          this.$message({
            message: response.data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
          this.codeButtonStatus.status = false;
          this.codeButtonStatus.text = "获取验证码";
        });
    },
    // 倒计时
    countTimer() {
      let num = this.number;
      this.timer = setInterval(() => {
        num--;
        if (num !== 0) {
          this.codeButtonStatus.text = `倒计时${num}秒`;
        } else {
          this.clearTimer();
          this.codeButtonStatus.text = "再次获取";
        }
      }, 1000);
    },
    // 清除倒计时
    clearTimer() {
      clearInterval(this.timer);
      this.codeButtonStatus.status = false;
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