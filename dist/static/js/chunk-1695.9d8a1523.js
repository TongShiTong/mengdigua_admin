(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1695"],{"9wqt":function(e,n,t){"use strict";var o=t("XjOx");t.n(o).a},WtIA:function(e,n,t){"use strict";t.r(n);var o=t("t3Un"),s={name:"ShopVersion",data:function(){return{version:"",new_version:""}},created:function(){this.getVersion()},methods:{getVersion:function(){var e=this;Object(o.a)({method:"post",url:"/content/content-api/obtain-version-hao",data:{}}).then(function(n){console.log(n),e.version=n.data.data.version_hao}).catch(function(e){console.log(e)})},setVersion:function(){var e=this;e.new_version?Object(o.a)({method:"post",url:"/content/content-api/add-version-hao",data:{version_hao:e.new_version}}).then(function(n){console.log(n),0===n.data.errcode?e.getVersion():e.$message.error(n.data.errmsg)}).catch(function(n){console.log(n),e.$message.error(n)}):e.$message({type:"info",message:"新版本好不能为空!"})}}},i=(t("9wqt"),t("KHd+")),a=Object(i.a)(s,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"shop-version"},[t("el-row",[t("el-col",{attrs:{span:8}},[t("el-card",{attrs:{"body-style":{padding:"0px"}}},[t("div",{staticStyle:{padding:"14px"}},[t("span",[e._v("当前版本号："+e._s(e.version))]),e._v(" "),t("div",{staticClass:"bottom clearfix",staticStyle:{padding:"15px 0"}},[t("el-input",{attrs:{size:"mini",placeholder:"请输入新的版本号"},model:{value:e.new_version,callback:function(n){e.new_version=n},expression:"new_version"}})],1),e._v(" "),t("div",{staticClass:"bottom clearfix"},[t("el-button",{attrs:{size:"mini"},on:{click:function(n){e.setVersion()}}},[e._v("更新版本号")])],1)])])],1)],1)],1)},[],!1,null,null,null);a.options.__file="version.vue";n.default=a.exports},XjOx:function(e,n,t){}}]);