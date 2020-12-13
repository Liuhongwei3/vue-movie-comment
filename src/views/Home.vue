<template>
  <div class="home">
    <div
      class="items"
      v-for="item in movies"
      :key="item.movieId"
      @click="toDetail(item.movieId)"
    >
      <img class="movie-cover" :src="item.movieCover" />
      <br />
      类型：<el-tag>{{ item.movieType }}</el-tag>
      <h2>{{ item.movieName }}</h2>
      <h4>导演：{{ item.movieDirector }}</h4>
      <h5>时长：{{ item.movieTime }}</h5>
      <h5>上映：{{ item.movieDate }}</h5>
      <el-rate
        disabled
        show-score
        :max="5"
        :value="+item.movieRate"
        text-color="#ff9900"
        score-template="{value}"
      >
      </el-rate>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import doReq from "@/network/doReq";

export default {
  name: "Home",
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.reqSth();
  },
  methods: {
    async reqSth() {
      let { data } = await doReq("/movie/queryMoviePage");
      this.movies = data;
    },
    toDetail(vid) {
      this.$router.push({
        path: "/showMovie",
        query: { vid },
      });
    },
  },
};
</script>

<style scoped>
h2,
h4 {
  width: 280px;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 50px;
}

.items {
  border: 1px solid rgb(189, 204, 50);
  width: 300px;
  border-radius: 5%;
  margin: 10px;
}

.items:hover {
  color: white;
  cursor: pointer;
}

.movie-cover {
  width: 300px;
  height: 350px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
