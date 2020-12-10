<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h2>电影信息</h2>
    <div class="detail">
      <div class="left">
        <img
          width="300"
          height="350"
          :src="detailInfo.movieCover"
          alt=""
          v-viewer
        />
      </div>

      <div class="right">
        <h2>{{ detailInfo.movieName }}</h2>
        <h3>{{ detailInfo.movieType }}</h3>
        <h3>{{ detailInfo.movieTime }}</h3>
        <h3>{{ detailInfo.movieDate }}</h3>
        <h3>{{ detailInfo.movieDirector }}</h3>
        <h3>{{ detailInfo.movieActors }}</h3>
        <h3>{{ detailInfo.movieRate }} 分</h3>
        <h4>{{ detailInfo.movieDescription }}</h4>
      </div>
    </div>
    <el-divider></el-divider>

    <h2>用户评论</h2>
    <el-tag @click="writeComment">写短评</el-tag>

    <div class="no-comm" v-if="comments.length === 0">
      <el-tag type="warning">暂无评论 -__-</el-tag>
    </div>

    <div class="comment">
      <div class="comment-item" v-for="item in comments" :key="item.commentId">
        <el-tag type="danger" effect="dark" color="transparent">{{
          item.commentUName
        }}</el-tag>
        <span class="comm-time"> --- {{ item.commentTime }}</span>
        <span v-if="item.commentUName === userName">
          ---
          <i
            class="el-icon-circle-close delete"
            @click="doDelete(item.commentId)"
          ></i>
        </span>
        <h4>{{ item.commentContent }}</h4>
      </div>
    </div>

    <el-dialog title="写评论" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="时间" label-width="120px" prop="commentTime">
          <el-date-picker
            v-model="form.commentTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容" label-width="120px" prop="commentContent">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.commentContent"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="publish">发 布</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定要删除该评论？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="deleteComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import doReq from "@/network/doReq";
import { notify } from "@/utils";

export default {
  name: "MovieDetail",
  data() {
    return {
      cid: -1,
      userName: "",
      detailInfo: {},
      loading: false,
      comments: [],
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        commentTime: "",
        commentContent: "",
      },
      rules: {
        commentTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期时间",
            trigger: "change",
          },
        ],
        commentContent: [
          { required: true, message: "请输入评论内容", trigger: "blur" },
          {
            min: 3,
            max: 500,
            message: "长度在 3 到 500 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.userName = window.sessionStorage.getItem("userName");
  },
  mounted() {
    this.reqSth(this.$route.query.vid);
  },
  methods: {
    async reqSth(vid) {
      this.loading = true;

      let { data: data1 } = await doReq(
        `/movie/selectMoviePageById?movieId=${vid}`
      );
      this.detailInfo = data1.length !== 0 ? data1[0] : {};

      let { data: data2 } = await doReq(
        `/comment/selectCommentPageByVId?commentVId=${vid}`
      );
      this.comments = data2;

      this.loading = false;
    },
    writeComment() {
      if (this.userName) {
        this.dialogFormVisible = true;
      } else {
        notify(
          "warning",
          "警告",
          "您还未登录，请先登录！(2s 后跳转至登录界面)"
        );
        setTimeout(() => this.$router.push("/login"), 2000);
      }
    },
    publish() {
      let { commentTime, commentContent } = this.form;
      let vid = this.$route.query.vid;

      let form = {
        commentVId: vid,
        commentUName: this.userName,
        commentTime,
        commentContent,
      };

      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let { data } = await doReq(`/comment/createComment`, "POST", form);

          if (data) {
            notify("success", "成功", `发布评论成功!`);
            this.$refs.ruleForm.resetFields();
            this.reqSth(this.$route.query.vid);
          } else {
            notify("error", "错误", "发布评论失败，请稍候重试！");
          }
          this.dialogFormVisible = false;
        } else {
          notify("warning", "警告", "请按照提示输入正确的内容！");
          return false;
        }
      });
    },
    cancel() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
    },
    doDelete(cid) {
      this.dialogVisible = true;
      this.cid = cid;
    },
    async deleteComment() {
      let { data } = await doReq(
        `/comment/deleteCommentById?commentId=${this.cid}`
      );
      if (data) {
        notify("success", "成功", `删除评论成功!`);
        this.reqSth(this.$route.query.vid);
      } else {
        notify("error", "错误", "删除评论失败，请稍候重试！");
      }
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
h4 {
  line-height: 24px;
}

.detail {
  display: flex;
  margin: 0 100px;
}

.right {
  margin-left: 50px;
  text-align: left;
}

.comment {
  text-align: left;
  margin: 0 50px;
  padding-bottom: 50px;
}

.comment-item {
  border: 1px solid rgba(64, 172, 118, 0.554);
  border-radius: 5px;
  margin: 10px 0;
  padding: 20px;
}

.comment-item:hover{
  cursor: pointer;
}

.comm-time{
  font-size: 14px;
  color: #bad774;
}

.no-comm {
  margin-top: 15px;
}

.delete {
  font-size: 20px;
  color: #5cb6ff;
}

.delete:hover {
  transform: scale(1.4);
  cursor: pointer;
}
</style>
