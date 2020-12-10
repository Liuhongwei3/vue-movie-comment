import Vue from "vue";
import {
  Pagination,
  Input,
  Checkbox,
  Select,
  Option,
  Button,
  Tooltip,
  Tag,
  Tabs,
  TabPane,
  Link,
  Divider,
  Loading,
  Dialog,
  Message,
  Notification,
  Switch,
  MessageBox,
  Rate,
  Form,
  FormItem,
  DatePicker,
  TimePicker,
} from "element-ui";

Vue.use(Pagination);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Tag);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Dialog);
Vue.use(Switch);
Vue.use(Rate);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(TimePicker);

Vue.use(Loading.directive);

// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
