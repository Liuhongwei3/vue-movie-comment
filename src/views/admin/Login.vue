<template>
  <div class="login">
    <h2 style="color: orange">Admin Login</h2>
    <el-form label-width="80px" ref="form" :model="form" :rules="rules">
      <el-form-item label="用户名" prop="adminName">
        <el-input clearable v-model="form.adminName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="adminPwd">
        <el-input clearable type="password" v-model="form.adminPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="onReset">Reset</el-button>
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { notify } from "@/utils";
import doReq from "@/network/doReq";

export default {
  name: "Login",
  data() {
    return {
      form: { adminName: "", adminPwd: "" },
      rules: {
        adminName: [
          { required: true, message: "请输入管理员名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        adminPwd: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let { adminName, adminPwd } = this.form;
          let { data } = await doReq(
            `/admin/selectAdminByName?adminName=${adminName}`
          );

          if (adminPwd == data[0].adminPwd) {
            notify("success", "成功", `登录成功，欢迎 ${adminName}!`);
            window.sessionStorage.setItem("adminName", adminName);
            this.$router.push("/admin");
          } else {
            notify("warning", "警告", "请按照提示输入正确的管理员名和密码！");
          }
        } else {
          notify("warning", "警告", "请按照提示输入正确的管理员名和密码！");
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
</style>
