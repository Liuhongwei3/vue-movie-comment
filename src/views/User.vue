<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h2>User Center</h2>
    <div class="user">
      <el-tooltip effect="dark" content="用户名" placement="left">
        <el-tag
          class="user-info"
          type="primary"
          effect="dark"
          @click="dialogVisible = true"
          >{{ userInfo.userName }}</el-tag
        >
      </el-tooltip>
      <el-tooltip effect="dark" content="性别" placement="right">
        <el-tag class="user-info" type="danger">{{ userInfo.userSex }}</el-tag>
      </el-tooltip>
    </div>
    <el-divider></el-divider>

    <div v-if="comments.length === 0">
      <el-tag type="warning">暂无评论 -__-</el-tag>
    </div>

    <div class="comment">
      <div class="comment-item" v-for="item in comments" :key="item.commentId">
        <el-tag type="danger" effect="dark" color="transparent">{{
          item.commentUName
        }}</el-tag>
        <span class="comm-time"> --- {{ item.commentTime }} --- </span>
        <i
          class="el-icon-circle-close delete"
          @click="doDelete(item.commentId)"
        ></i>
        <h4>{{ item.commentContent }}</h4>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定要退出当前用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="commDialogVisible" width="30%">
      <span>确定要删除该评论？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commDialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="deleteComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import doReq from "@/network/doReq";
import { notify } from "@/utils";

export default {
  name: "User",
  data() {
    return {
      userId: 0,
      userName: "",
      userInfo: {},
      cid: 0,
      loading: false,
      dialogVisible: false,
      commDialogVisible: false,
      comments: [],
    };
  },
  async created() {
    await this.reqSth();

    if (this.userId === 0) {
      notify("warning", "警告", "您还未登录，请先登录！");
      this.$router.push("/login");
    }
  },
  methods: {
    async reqSth() {
      this.userName = window.sessionStorage.getItem("userName");

      if (this.userName) {
        this.loading = true;
        let { data: data1 } = await doReq(
          `/user/selectUserByName?userName=${this.userName}`
        );

        if (data1.length) {
          this.userId = data1[0].userId;
          this.userInfo = data1[0];
        }

        let { data: data2 } = await doReq(
          `/comment/selectCommentPageByUName?commentUName=${this.userName}`
        );

        this.comments = data2;
        this.loading = false;
      }
    },
    logOut() {
      this.dialogVisible = false;
      this.userId = 0;
      this.userInfo = {};
      window.sessionStorage.removeItem("userName");

      this.$router.push("/");
    },
    doDelete(cid) {
      this.commDialogVisible = true;
      this.cid = cid;
    },
    async deleteComment() {
      this.loading = true;
      let { data } = await doReq(
        `/comment/deleteCommentById?commentId=${this.cid}`
      );
      if (data) {
        notify("success", "成功", `删除评论成功!`);
        this.reqSth();
      } else {
        notify("error", "错误", "删除评论失败，请稍候重试！");
      }
      this.commDialogVisible = false;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.user {
  width: 70vw;
  background-color: #b2a392;
  border-radius: 5px;
  margin: 20px auto;
  padding: 30px;
}

.user-info {
  display: inline-block;
  margin: 0 10px;
}

.user-info:hover {
  cursor: pointer;
}

.comment {
  text-align: left;
  margin: 0 50px;
}

.el-tag:hover {
  cursor: pointer;
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

.delete {
  font-size: 20px;
  color: #5cb6ff;
}

.delete:hover {
  transform: scale(1.4);
}
</style>
