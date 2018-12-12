(function(e){function t(t){for(var r,s,i=t[0],l=t[1],c=t[2],f=0,p=[];f<i.length;f++)s=i[f],n[s]&&p.push(n[s][0]),n[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],r=!0,i=1;i<a.length;i++){var l=a[i];0!==n[l]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=a[0]))}return e}var r={},n={app:0},o=[];function s(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=r,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(a,r,function(t){return e[t]}.bind(null,r));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},1348:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-user-register"},[a("el-form",{ref:"form",attrs:{"label-width":"70px","hide-required-asterisk":"",model:e.formData,rules:e.rules}},[a("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[a("el-input",{attrs:{maxlength:"15",placeholder:"请输入你的昵称"},model:{value:e.formData.userName,callback:function(t){e.$set(e.formData,"userName","string"===typeof t?t.trim():t)},expression:"formData.userName"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{type:"email",placeholder:"请输入你的邮箱地址"},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email","string"===typeof t?t.trim():t)},expression:"formData.email"}})],1),a("el-form-item",{attrs:{label:"密 码",prop:"password"}},[a("el-input",{attrs:{type:"password",maxlength:"18",placeholder:"请输入6-18位密码"},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}})],1),a("el-form-item",{attrs:{label:"确认密码",prop:"confirmPwd"}},[a("el-input",{attrs:{type:"password",maxlength:"18",placeholder:"请再次输入密码"},model:{value:e.formData.confirmPwd,callback:function(t){e.$set(e.formData,"confirmPwd",t)},expression:"formData.confirmPwd"}})],1),a("el-form-item",{attrs:{label:"验证码",prop:"captcha"}},[a("el-input",{attrs:{maxlength:"4",placeholder:"请输入验证码"},model:{value:e.formData.captcha,callback:function(t){e.$set(e.formData,"captcha",t)},expression:"formData.captcha"}}),a("img",{ref:"captcha",staticClass:"pic-captcha",attrs:{title:"点击刷新"},on:{click:e.handleGetCapcha}})],1),a("el-button",{staticClass:"btn-submit",attrs:{type:"success",loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.loading?"请稍后...":"注 册"))])],1)],1)},n=[],o=(a("a481"),{data:function(){var e=this,t=function(t,a,r){a&&a===e.formData.password?r():r(new Error)};return{formData:{},loading:!1,rules:{userName:[{required:!0,message:"请输入2-15位用户名",min:2,max:15,trigger:["blur","change"]}],email:[{required:!0,message:"请输入正确的邮箱地址",type:"email",trigger:["blur","change"]}],password:[{required:!0,message:"请输入6-18位密码",min:6,max:18,trigger:["blur","change"]}],confirmPwd:[{validator:t,message:"确认密码不能为空，且必须和密码一致",trigger:["blur","change"]}],captcha:[{required:!0,message:"请输入验证码"}]}}},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate().then(function(){e.loading=!0,e.$http.post("user/register",e.formData).then(function(t){e.$alert(t.info,"提示",{callback:function(){e.$router.replace({name:"login"})}})}).catch(function(t){e.formData.captcha="",e.handleGetCapcha(),e.$message.error(t.message),e.loading=!1})})},handleGetCapcha:function(){this.$refs.captcha.src="/api/captcha?t=".concat(Date.now())}},mounted:function(){this.handleGetCapcha()}}),s=o,i=a("2877"),l=Object(i["a"])(s,r,n,!1,null,null,null);l.options.__file="Register.vue";t["default"]=l.exports},"20bd":function(e,t,a){},2368:function(e,t,a){},"506b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-user-resetpwd"},[a("el-form",{ref:"form",attrs:{"label-width":"70px","hide-required-asterisk":"",model:e.formData,rules:e.rules}},[a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{type:"email",required:"",placeholder:"请输入你注册的邮箱地址"},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email",t)},expression:"formData.email"}})],1),a("el-form-item",{attrs:{label:"验证码",prop:"captcha"}},[a("el-input",{attrs:{placeholder:"请输入收到的验证码",maxlength:"4"},model:{value:e.formData.captcha,callback:function(t){e.$set(e.formData,"captcha",t)},expression:"formData.captcha"}}),e.num?a("el-button",{staticClass:"btn-send-validcode",attrs:{type:"primary",disabled:""}},[e._v(e._s(e.num)+"s后重试")]):a("el-button",{staticClass:"btn-send-validcode",attrs:{type:"primary"},on:{click:e.handleSendCaptcha}},[e._v("发送验证码")])],1),a("el-form-item",{attrs:{label:"新密码",prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入6-18位新密码",maxlength:"18"},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}})],1),a("el-form-item",{attrs:{label:"确认密码",prop:"confirmPwd"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入确认密码",maxlength:"18"},model:{value:e.formData.confirmPwd,callback:function(t){e.$set(e.formData,"confirmPwd",t)},expression:"formData.confirmPwd"}})],1),a("el-button",{staticClass:"btn-submit",attrs:{type:"warning",loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.loading?"请稍后...":"重置密码"))]),a("div",{staticClass:"back-to-login"},[a("router-link",{attrs:{to:"login"}},[a("i",{staticClass:"el-icon-back"}),e._v(" 返回登录注册")])],1)],1)],1)},n=[],o=(a("a481"),{data:function(){var e=this,t=function(t,a,r){a&&a===e.formData.password?r():r(new Error)};return{num:0,loading:!1,formData:{},rules:{email:[{required:!0,message:"请输入正确的邮箱地址",type:"email",trigger:["blur","change"]}],password:[{required:!0,message:"请输入6-18位密码",min:6,max:18,trigger:["blur","change"]}],confirmPwd:[{validator:t,message:"确认密码不能为空，且必须和密码一致",trigger:["blur","change"]}],captcha:[{required:!0,message:"请输入验证码"}]}}},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate().then(function(){e.loading=!0,e.$http.post("/user/reset_pwd",e.formData).then(function(t){e.loading=!1,e.$message.success(t.info),e.$router.replace({name:"login"})}).catch(function(t){e.loading=!1,e.$message.error(t.message)})})},handleSendCaptcha:function(){var e=this;this.startTid(),this.$http.post("/user/email_captcha",{email:this.formData.email}).then(function(t){e.$message.success(t.info)}).catch(function(t){e.$message.error(t.message)})},startTid:function(){var e=this;this.num=60,this.tid=setInterval(function(){e.num>0?e.num--:clearInterval(e.tid)},1e3)}},beforeDestroy:function(){clearInterval(this.tid)}}),s=o,i=a("2877"),l=Object(i["a"])(s,r,n,!1,null,null,null);l.options.__file="ResetPwd.vue";t["default"]=l.exports},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("097d");var r=a("2b0e"),n=a("bc3a"),o=a.n(n);o.a.defaults.baseURL="/api",o.a.interceptors.response.use(function(e){return Promise.resolve(e.data)},function(e){return Promise.reject(new Error(e.response.data))});var s=o.a,i=(a("0fae"),a("5c96"));r["default"].use(i["Input"]),r["default"].use(i["Form"]),r["default"].use(i["FormItem"]),r["default"].use(i["Button"]),r["default"].use(i["RadioGroup"]),r["default"].use(i["RadioButton"]),r["default"].use(i["Tooltip"]),r["default"].use(i["Popover"]),r["default"].use(i["Loading"].directive),r["default"].prototype.$message=i["Message"],r["default"].prototype.$loading=i["Loading"].service,r["default"].prototype.$msgbox=i["MessageBox"],r["default"].prototype.$alert=i["MessageBox"].alert,r["default"].prototype.$confirm=i["MessageBox"].confirm,r["default"].prototype.$prompt=i["MessageBox"].prompt;a("20bd");var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("com-header"),a("router-view")],1)},c=[],u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"com-header"})},f=[],p={},d=p,m=(a("a901"),a("2877")),h=Object(m["a"])(d,u,f,!1,null,null,null);h.options.__file="Header.vue";var g=h.exports,v={components:{ComHeader:g}},b=v,w=(a("7c55"),Object(m["a"])(b,l,c,!1,null,null,null));w.options.__file="App.vue";var D=w.exports,_=a("8c4f"),y=function(e){return a("feca")("./".concat(e,".vue")).default};r["default"].use(_["a"]);var x=new _["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:y("Home")},{path:"/entry",component:y("user/Index"),children:[{path:"",redirect:"login"},{path:"login",name:"login",component:y("user/Login")},{path:"register",name:"register",component:y("user/Register")},{path:"resetpwd",name:"resetpwd",component:y("user/ResetPwd")}]}]}),$=a("2f62");r["default"].use($["a"]);var k=new $["a"].Store({state:{},mutations:{},actions:{}}),C=a("9483");Object(C["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["default"].config.productionTip=!1,r["default"].prototype.$http=s,new r["default"]({router:x,store:k,render:function(e){return e(D)}}).$mount("#app")},"5c48":function(e,t,a){},"7c55":function(e,t,a){"use strict";var r=a("5c48"),n=a.n(r);n.a},a004:function(e,t,a){"use strict";var r=a("d2a9"),n=a.n(r);n.a},a901:function(e,t,a){"use strict";var r=a("2368"),n=a.n(r);n.a},ac2a:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-user-login"},[a("el-form",{ref:"form",attrs:{"label-width":"70px","hide-required-asterisk":"",model:e.formData,rules:e.rules}},[a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入你的邮箱地址"},model:{value:e.formData.email,callback:function(t){e.$set(e.formData,"email","string"===typeof t?t.trim():t)},expression:"formData.email"}})],1),a("el-form-item",{attrs:{label:"密 码",prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password","string"===typeof t?t.trim():t)},expression:"formData.password"}})],1),a("el-form-item",{attrs:{label:"验证码",prop:"captcha"}},[a("el-input",{attrs:{maxlength:"4",placeholder:"请输入验证码"},model:{value:e.formData.captcha,callback:function(t){e.$set(e.formData,"captcha",t)},expression:"formData.captcha"}}),a("img",{ref:"captcha",staticClass:"pic-captcha",attrs:{title:"点击刷新"},on:{click:e.handleGetCapcha}})],1),a("div",{staticClass:"forget-pwd"},[a("router-link",{attrs:{to:"resetpwd"}},[e._v("忘记密码?")])],1),a("el-button",{staticClass:"btn-submit",attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v(e._s(e.loading?"请稍后...":"登 录"))])],1)],1)},n=[],o={data:function(){return{loading:!1,formData:{},rules:{email:[{required:!0,type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],password:[{required:!0,message:"请输入你的密码",trigger:["blur","change"]}],captcha:[{required:!0,message:"请输入验证码"}]}}},methods:{handleSubmit:function(){var e=this;this.$refs.form.validate().then(function(){e.loading=!0,e.$http.post("user/login",e.formData).then(function(t){e.loading=!1,401===t.code?(e.handleGetCapcha(),e.$confirm(t.info,"提示",{confirmButtonText:"我要激活",cancelButtonText:"取消",type:"warning",closeOnClickModal:!1}).then(e.sendActivateMail)):location.href="/"}).catch(function(t){e.loading=!1,e.handleGetCapcha(),e.$message.error(t.message)})})},handleGetCapcha:function(){this.$refs.captcha.src="/api/captcha?t=".concat(Date.now())},sendActivateMail:function(){var e=this,t=this.$loading({lock:!0,text:"邮件发送中...",spinner:"el-icon-loading"});this.$http.post("user/send_activate_mail",{email:this.formData.email}).then(function(a){t.close(),e.$alert(a.info,"提示")}).catch(function(a){t.close(),e.$message.error(a.message)})}},mounted:function(){this.handleGetCapcha()}},s=o,i=a("2877"),l=Object(i["a"])(s,r,n,!1,null,null,null);l.options.__file="Login.vue";t["default"]=l.exports},bb51:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[e._v("\r\n  Hello World\r\n")])},n=[],o=a("2877"),s={},i=Object(o["a"])(s,r,n,!1,null,null,null);i.options.__file="Home.vue";t["default"]=i.exports},d2a9:function(e,t,a){},dab6:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-user-entry"},[a("div",{staticClass:"entry-wrapper"},[e.isResetPage?a("h3",{staticClass:"title"},[e._v("用邮箱重置你的密码")]):a("div",{staticClass:"tabs"},[a("router-link",{attrs:{to:"login"}},[e._v("登录")]),a("b",{staticClass:"dot"}),a("router-link",{attrs:{to:"register"}},[e._v("注册")])],1),a("router-view")],1)])},n=[],o=(a("7f7f"),{computed:{isResetPage:function(){return"resetpwd"===this.$route.name}}}),s=o,i=(a("a004"),a("2877")),l=Object(i["a"])(s,r,n,!1,null,null,null);l.options.__file="Index.vue";t["default"]=l.exports},feca:function(e,t,a){var r={"./Home.vue":"bb51","./user/Index.vue":"dab6","./user/Login.vue":"ac2a","./user/Register.vue":"1348","./user/ResetPwd.vue":"506b"};function n(e){var t=o(e);return a(t)}function o(e){var t=r[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}n.keys=function(){return Object.keys(r)},n.resolve=o,e.exports=n,n.id="feca"}});
//# sourceMappingURL=app.3191d966.js.map