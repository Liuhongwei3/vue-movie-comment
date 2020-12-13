<template>
  <div id="app">
    <div id="nav">
      <h2>Tadm-Movie-Comment</h2>
      <div class="head-link">
        <router-link to="/">Home</router-link> |
        <router-link to="/user">User</router-link> |
        <router-link to="/admin">Admin</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <el-divider></el-divider>

    <router-view />

    <el-divider></el-divider>
    <foot />
  </div>
</template>

<script>
import Foot from "@/views/Foot";

export default {
  name: "App",
  components: { Foot },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cfcfcf;
  background-color: rgb(111, 111, 111);
  height: 100%;
}

#nav {
  padding: 10px;
  display: flex;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.head-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
}

.el-tabs__nav {
  margin-left: 6px;
}

.el-tabs__item {
  color: #fff !important;
}
</style>
