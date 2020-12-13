<template>
  <div>
    <div v-if="!adminName || adminName.length === 0">
      <el-button type="primary" @click="toLogin">去登录</el-button>
    </div>
    <div v-else>
      <h3>
        Welcome
        <el-button type="warning" @click="dialogVisible = true">{{
          adminName
        }}</el-button>
      </h3>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-button type="primary" @click="add">add</el-button>
        <el-button type="danger" @click="removeAll">removeAll</el-button>
        <el-input
          type="text"
          placeholder="输入关键字搜索"
          style="width: 250px;margin-left: 15px"
          clearable
          v-model="search"
        ></el-input>

        <el-tab-pane label="用户管理" name="first">
          <el-table
            stripe
            :data="
              users.filter(
                (data) =>
                  !search ||
                  data.userName.toLowerCase().includes(search.toLowerCase())
              )
            "
            style="margin-top: 15px"
          >
            <el-table-column sortable prop="userId" label="ID" width="150">
            </el-table-column>
            <el-table-column sortable prop="userName" label="用户名">
              <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.userName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="性别">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.userSex === '男'">{{
                  scope.row.userSex
                }}</el-tag>
                <el-tag type="danger" v-if="scope.row.userSex === '女'">{{
                  scope.row.userSex
                }}</el-tag>
                <el-tag type="warning" v-if="scope.row.userSex === '密'">{{
                  scope.row.userSex
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="userPwd" label="密码"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="doDelete(scope.row)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="电影管理" name="second">
          <el-table
            stripe
            :data="
              movies.filter(
                (data) =>
                  !search ||
                  data.movieName.toLowerCase().includes(search.toLowerCase())
              )
            "
            style="margin-top: 15px"
          >
            <el-table-column sortable prop="movieId" label="ID" width="80">
            </el-table-column>
            <el-table-column sortable prop="movieName" label="名字" width="150">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.movieName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="movieType" label="类型" width="150">
            </el-table-column>
            <el-table-column sortable prop="movieRate" label="评分" width="100">
              <template slot-scope="scope">
                <el-progress
                  type="circle"
                  :width="80"
                  :percentage="scope.row.movieRate | formatRate"
                ></el-progress>
              </template>
            </el-table-column>
            <el-table-column prop="" label="导演" width="180">
              <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.movieDirector }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="movieTime" label="时长" width="120">
            </el-table-column>
            <el-table-column prop="movieDate" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="movieCover" label="电影封面" width="360">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="doDelete(scope.row)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论管理" name="third">
          <el-table
            stripe
            :data="
              comments.filter(
                (data) =>
                  !search ||
                  data.commentUName.toLowerCase().includes(search.toLowerCase()) ||
                  data.commentContent.toLowerCase().includes(search.trim())
              )
            "
            style="margin-top: 15px"
          >
            <el-table-column
              label="ID"
              sortable
              prop="commentId"
              width="80"
            ></el-table-column>
            <el-table-column
              label="电影ID"
              sortable
              prop="commentVId"
              width="120"
            ></el-table-column>
            <el-table-column label="评论者" width="120">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.commentUName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="内容"
              prop="commentContent"
            ></el-table-column>
            <el-table-column
              sortable
              prop="commentTime"
              label="时间"
              width="280"
            >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{
                  scope.row.commentTime
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="doDelete(scope.row)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定要退出当前用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="deleteDialog" width="30%">
      <span>确定要删除该{{ tabTitle }}吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="更新用户信息" :visible.sync="dialogFormUserVisible">
      <el-form :model="userForm">
        <el-form-item v-if="userForm.userId" label="ID" label-width="120px">
          <span>{{ userForm.userId }}</span>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input clearable v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-select clearable="" v-model="userForm.userSex">
            <el-option label="男" value="男"> </el-option>
            <el-option label="女" value="女"> </el-option>
            <el-option label="密" value="密"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input clearable v-model="userForm.userPwd"></el-input>
        </el-form-item>

        <el-button type="warning" @click="cancel">取消</el-button>
        <el-button type="primary" @click="update">确定</el-button>
      </el-form>
    </el-dialog>

    <el-dialog title="更新电影信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item v-if="form.movieId" label="ID" label-width="120px">
          <span>{{ form.movieId }}</span>
        </el-form-item>
        <el-form-item label="名字" label-width="120px" prop="movieName">
          <el-input clearable v-model="form.movieName"></el-input>
        </el-form-item>
        <el-form-item label="导演" label-width="120px" prop="movieDirector">
          <el-input clearable v-model="form.movieDirector"></el-input>
        </el-form-item>
        <el-form-item label="演员" label-width="120px" prop="movieActors">
          <el-input clearable v-model="form.movieActors"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="120px" prop="movieType">
          <el-input clearable v-model="form.movieType"></el-input>
        </el-form-item>
        <el-form-item label="评分" label-width="120px" prop="movieRate">
          <el-input clearable v-model="form.movieRate"></el-input>
        </el-form-item>
        <el-form-item label="时长" label-width="120px" prop="movieTime">
          <el-input clearable v-model="form.movieTime"></el-input>
        </el-form-item>
        <el-form-item label="日期" label-width="120px" prop="movieDate">
          <el-input clearable v-model="form.movieDate"></el-input>
        </el-form-item>
        <el-form-item label="封面" label-width="120px" prop="movieCover">
          <el-input clearable v-model="form.movieCover"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="movieDescription">
          <el-input
            type="textarea"
            clearable
            v-model="form.movieDescription"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button type="warning" @click="cancel">取消</el-button>
      <el-button type="primary" @click="update">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import doReq from "@/network/doReq";
import { notify } from "@/utils";

export default {
  name: "Admin",
  data() {
    return {
      adminName: "",
      search: "",
      mid: -1,
      uid: -1,
      cid: -1,
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormUserVisible: false,
      dialogFormCommentVisible: false,
      deleteDialog: false,
      activeName: "second",
      movies: [],
      users: [],
      comments: [],
      form: {
        movieId: "",
        movieName: "",
        movieType: "",
        movieRate: "",
        movieDirector: "",
        movieDate: "",
        movieTime: "",
        movieActors: "",
        movieDescription: "",
        movieCover: "https://i.loli.net/2020/02/28/2OPSFfaL73QIizV.jpg",
      },
      userForm: {
        userId: "",
        userName: "",
        userSex: "",
        userPwd: "",
      },
      commentForm: {},
      rules: {
        movieName: [
          { required: true, message: "请输入电影名", trigger: "blur" },
        ],
        movieType: [
          {
            required: true,
            message: "请输入电影类型 以空格隔开",
            trigger: "blur",
          },
        ],
        movieRate: [
          { required: true, message: "请输入电影评分", trigger: "blur" },
        ],
        movieDirector: [
          { required: true, message: "请输入电影导演", trigger: "blur" },
        ],
        movieDate: [
          { required: true, message: "请输入电影日期", trigger: "blur" },
        ],
        movieTime: [
          { required: true, message: "请输入电影时长", trigger: "blur" },
        ],
        movieActors: [
          { required: true, message: "请输入电影演员", trigger: "blur" },
        ],
        movieDescription: [
          { required: true, message: "请输入电影描述", trigger: "blur" },
        ],
        movieCover: [
          { required: true, message: "请输入电影封面链接", trigger: "blur" },
        ],
      },
    };
  },
  filters: {
    formatRate(rate) {
      let num = +rate / 5.0;
      return num.toFixed(2) * 100;
    },
  },
  computed: {
    tabTitle() {
      if (this.activeName === "second") {
        return "电影";
      } else if (this.activeName === "first") {
        return "用户";
      } else if (this.activeName === "third") {
        return "评论";
      }
    },
  },
  created() {
    this.adminName = window.sessionStorage.getItem("adminName");
    this.reqAllMovies();
  },
  methods: {
    toLogin() {
      this.$router.push("/admin/login");
    },
    logOut() {
      this.dialogVisible = false;
      this.adminName = "";
      window.sessionStorage.removeItem("adminName");
    },
    async reqAllMovies() {
      let { data } = await doReq("/movie/queryMoviePage");
      this.movies = data;
    },
    async reqAllUsers() {
      let { data } = await doReq("/user/queryUserPage");
      this.users = data;
    },
    async reqAllComments() {
      let { data } = await doReq("/comment/queryCommentPage");
      this.comments = data;
    },
    handleClick() {
      this.search = "";
      if (this.activeName === "first" && this.users.length === 0) {
        this.reqAllUsers();
      } else if (this.activeName === "third" && this.comments.length === 0) {
        this.reqAllComments();
      }
    },
    handleEdit(row) {
      if (this.activeName === "second") {
        this.dialogFormVisible = true;
        // 此处需要使用深拷贝 防止修改后的数据直接影响 movies
        // Object.assign 复制只有一层属性的对象为深拷贝，否则浅拷贝
        this.form = Object.assign({}, row);
        this.mid = row.movieId;
      } else if (this.activeName === "first") {
        this.dialogFormUserVisible = true;
        this.userForm = Object.assign({}, row);
        this.uid = row.userId;
      } else if (this.activeName === "third") {
        console.log("comment");
      }
    },
    async handleDelete() {
      if (this.activeName === "second") {
        let { data } = await doReq(
          `/movie/deleteMovieById?movieId=${this.mid}`
        );

        if (data) {
          notify("success", "成功", `删除电影成功!`);
          this.reqAllMovies();
        } else {
          notify("error", "错误", "删除电影信息失败，请稍候重试！");
        }
      } else if (this.activeName === "first") {
        let { data } = await doReq(`/user/deleteUserById?userId=${this.uid}`);

        if (data) {
          notify("success", "成功", `删除用户成功!`);
          this.reqAllUsers();
        } else {
          notify("error", "错误", "删除用户失败，请稍候重试！");
        }
      } else if (this.activeName === "third") {
        let { data } = await doReq(
          `/comment/deleteCommentById?commentId=${this.cid}`
        );

        if (data) {
          notify("success", "成功", `删除评论成功!`);
          this.reqAllComments();
        } else {
          notify("error", "错误", "删除评论失败，请稍候重试！");
        }
      }

      this.deleteDialog = false;
    },
    add() {
      if (this.activeName === "second") {
        this.dialogFormVisible = true;
      } else if (this.activeName === "first") {
        this.dialogFormUserVisible = true;
      } else if (this.activeName === "third") {
        notify("info", "提示", "正在开发中，请稍后再试！");
      }
    },
    removeAll() {
      notify("info", "提示", "正在开发中，请稍后再试！");
    },
    doDelete(row) {
      if (this.activeName === "second") {
        this.mid = row.movieId;
      } else if (this.activeName === "first") {
        this.uid = row.userId;
      } else if (this.activeName === "third") {
        this.cid = row.commentId;
      }
      this.deleteDialog = true;
    },
    async update() {
      if (this.activeName === "second") {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            let { data } =
              this.mid !== -1
                ? await doReq(`/movie/updateMovieById`, "POST", this.form)
                : await doReq(`/movie/insertMovie`, "POST", this.form);

            if (data) {
              notify("success", "成功", `更新电影信息成功!`);
              this.$refs.ruleForm.resetFields();
              this.reqAllMovies();
            } else {
              notify("error", "错误", "更新电影信息失败，请稍候重试！");
            }
            this.resetForm();
            this.dialogFormVisible = false;
          } else {
            notify("warning", "警告", "请按照提示输入正确的内容！");
            return false;
          }
        });
      } else if (this.activeName === "first") {
        let { data } =
          this.uid !== -1
            ? await doReq(`/user/updateUserById`, "POST", this.userForm)
            : await doReq(`/user/createUser`, "POST", this.userForm);

        if (data) {
          notify("success", "成功", `更新${this.tabTitle}信息成功!`);
          this.reqAllUsers();
        } else {
          notify("error", "错误", `更新${this.tabTitle}信息失败，请稍候重试！`);
        }
        this.resetForm();
        this.dialogFormUserVisible = false;
      } else if (this.activeName === "third") {
        console.log("comment");
      }
    },
    cancel() {
      this.resetForm();
      if (this.activeName === "second") {
        this.$refs.ruleForm.resetFields();
        this.dialogFormVisible = false;
      } else if (this.activeName === "first") {
        this.dialogFormUserVisible = false;
      } else if (this.activeName === "third") {
        this.dialogFormCommentVisible = false;
      }
    },
    resetForm() {
      if (this.activeName === "second") {
        this.form = {
          movieId: "",
          movieName: "",
          movieType: "",
          movieRate: "",
          movieDirector: "",
          movieDate: "",
          movieTime: "",
          movieActors: "",
          movieDescription: "",
          movieCover: "https://i.loli.net/2020/02/28/2OPSFfaL73QIizV.jpg",
        };
        this.mid - 1;
      } else if (this.activeName === "first") {
        this.userForm = {
          userId: "",
          userName: "",
          userSex: "",
          userPwd: "",
        };
        this.uid = -1;
      } else if (this.activeName === "third") {
        this.cid = -1;
        console.log("comment");
      }
    },
  },
};
</script>
