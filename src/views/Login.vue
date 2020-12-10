<template>
  <div class="login">
    <h2 style="color: orange">User Login</h2>
    <el-form label-width="80px" ref="form" :model="form" :rules="rules">
      <el-form-item label="用户名" prop="userName">
        <el-input clearable v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input clearable type="password" v-model="form.userPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="onReset">Reset</el-button>
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </el-form-item>
    </el-form>
    <router-link class="toReg" to="/register">>>> no account?</router-link>
  </div>
</template>

<script>
import { notify } from "@/utils";
import doReq from "@/network/doReq";

export default {
  name: "Login",
  data() {
    return {
      form: { userName: "", userPwd: "" },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        userPwd: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let { userName, userPwd } = this.form;
          let { data } = await doReq(
            `/user/getUserPwdByName?userName=${this.form.userName}`
          );

          if (userPwd == data) {
            notify("success", "成功", `登录成功，欢迎 ${userName}!`);
            window.sessionStorage.setItem("userName", userName);
            this.$router.push("/");
          } else {
            notify("warning", "警告", "请按照提示输入正确的用户名和密码！");
          }
        } else {
          notify("warning", "警告", "请按照提示输入正确的用户名和密码！");
          return false;
        }
      });
    },
    onReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  width: 500px;
  background-color: antiquewhite;
  margin: 0 auto;
  padding: 60px;
  position: relative;
}

.toReg {
  position: absolute;
  bottom: 10px;
  right: 5px;
}
</style>
