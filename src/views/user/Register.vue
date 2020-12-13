<template>
  <div class="login">
    <h2 style="color: orange">User Register</h2>
    <el-form label-width="80px" ref="form" :model="form" :rules="rules">
      <el-form-item label="用户名" prop="userName">
        <el-input clearable v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别" placeholder="请选择" prop="userSex">
        <el-select v-model="form.userSex">
          <el-option label="男" value="男"> </el-option>
          <el-option label="女" value="女"> </el-option>
          <el-option label="密" value="密"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input clearable type="password" v-model="form.userPwd"></el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码" prop="reUserPwd">
        <el-input clearable type="password" v-model="form.reUserPwd"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="warning" @click="onReset">Reset</el-button>
        <el-button type="primary" @click="onSubmit">Register</el-button>
      </el-form-item>
    </el-form>
    <router-link class="toReg" to="/user/login">>>> has account?</router-link>
  </div>
</template>

<script>
import { notify } from "@/utils";
import doReq from "@/network/doReq";

export default {
  name: "UserRegister",
  data() {
    return {
      form: { userName: "", userSex: "", userPwd: "" },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入您想设置的用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        userPwd: [
          { required: true, message: "请输入您想设置的密码", trigger: "blur" },
        ],
        reUserPwd: [
          {
            required: true,
            message: "请再次输入您想设置的密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      let { userName, userSex, userPwd } = this.form;
      let form = { userName, userSex, userPwd };
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let { data } = await doReq(`/user/createUser`, "POST", form);
          
          notify("success", "成功", `注册成功，欢迎 ${userName}!`);
          window.sessionStorage.setItem("userName", userName);
          this.$router.push("/");
        } else {
          notify("warning", "警告", "请按照提示输入正确的信息！");
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
