<template>
  <div class="about">
    <code>Welcome to Tadm-Movie-Comment~</code>
    <div>本站数据来源于猫眼电影，请尊重版权，谢谢合作！</div>
    <div>
      &copy;&nbsp;&nbsp;2020&nbsp;<span v-if="year !== 2020"
        >-&nbsp;&nbsp;{{ year }}&nbsp;&nbsp;</span
      >
      <i class="el-icon-success" id="heart"></i>
      &nbsp;&nbsp;Tadm
    </div>
  </div>
</template>

<script>
export default {
  name: "Foot",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
div {
  margin: 10px;
}

@keyframes heartAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}

#heart {
  color: #e6bd36;
  animation: heartAnimate 1s linear infinite;
}

.about {
  margin: 25px 0 0 0;
  padding-bottom: 5px;
}
</style>
