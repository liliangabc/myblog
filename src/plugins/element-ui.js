import Vue from 'vue'
import {
  Input,
  Form,
  FormItem,
  Button,
  RadioGroup,
  RadioButton,
  Loading,
  Message
} from 'element-ui'

Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service