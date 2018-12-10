import Vue from 'vue'
import {
  Input,
  Form,
  FormItem,
  Button,
  RadioGroup,
  RadioButton,
  Loading,
  Message,
  Tooltip,
  Popover,
  MessageBox
} from 'element-ui'

Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tooltip)
Vue.use(Popover)

Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt