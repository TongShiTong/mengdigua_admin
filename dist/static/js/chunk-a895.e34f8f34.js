(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-a895"],{"0m1b":function(e,s,t){"use strict";var i=t("ylkE");t.n(i).a},jujd:function(e,s,t){"use strict";var i={computed:{roles:function(){return this.$store.getters.roles},switchRoles:{get:function(){return this.roles[0]},set:function(e){var s=this;this.$store.dispatch("ChangeRoles",e).then(function(){s.$emit("change")})}}}},n=t("KHd+"),a=Object(n.a)(i,function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[t("div",{staticStyle:{"margin-bottom":"15px"}},[e._v(e._s(e.$t("permission.roles"))+"： "+e._s(e.roles))]),e._v("\n  "+e._s(e.$t("permission.switchRoles"))+"：\n  "),t("el-radio-group",{model:{value:e.switchRoles,callback:function(s){e.switchRoles=s},expression:"switchRoles"}},[t("el-radio-button",{attrs:{label:"editor"}}),e._v(" "),t("el-radio-button",{attrs:{label:"admin"}})],1)],1)},[],!1,null,null,null);a.options.__file="SwitchRoles.vue";s.a=a.exports},qZ8X:function(e,s,t){"use strict";t.r(s);var i=t("Q2AE"),n={inserted:function(e,s,t){var n=s.value,a=i.a.getters&&i.a.getters.roles;if(!(n&&n instanceof Array&&n.length>0))throw new Error("need roles! Like v-permission=\"['admin','editor']\"");var r=n;a.some(function(e){return r.includes(e)})||e.parentNode&&e.parentNode.removeChild(e)}},a=function(e){e.directive("permission",n)};window.Vue&&(window.permission=n,Vue.use(a)),n.install=a;var r=n;var o={name:"DirectivePermission",components:{SwitchRoles:t("jujd").a},directives:{permission:r},data:function(){return{key:1}},methods:{checkPermission:function(e){if(e&&e instanceof Array&&e.length>0){var s=e;return!!(i.a.getters&&i.a.getters.roles).some(function(e){return s.includes(e)})}return console.error("need roles! Like v-permission=\"['admin','editor']\""),!1},handleRolesChange:function(){this.key++}}},l=(t("0m1b"),t("KHd+")),c=Object(l.a)(o,function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"app-container"},[t("switch-roles",{on:{change:e.handleRolesChange}}),e._v(" "),t("div",{key:e.key,staticStyle:{"margin-top":"30px"}},[t("span",{directives:[{name:"permission",rawName:"v-permission",value:["admin"],expression:"['admin']"}],staticClass:"permission-alert"},[e._v("\n      Only\n      "),t("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("admin")]),e._v(" can see this\n    ")],1),e._v(" "),t("span",{directives:[{name:"permission",rawName:"v-permission",value:["editor"],expression:"['editor']"}],staticClass:"permission-alert"},[e._v("\n      Only\n      "),t("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("editor")]),e._v(" can see this\n    ")],1),e._v(" "),t("span",{directives:[{name:"permission",rawName:"v-permission",value:["admin","editor"],expression:"['admin','editor']"}],staticClass:"permission-alert"},[e._v("\n      Both\n      "),t("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("admin")]),e._v(" and\n      "),t("el-tag",{staticClass:"permission-tag",attrs:{size:"small"}},[e._v("editor")]),e._v(" can see this\n    ")],1)]),e._v(" "),t("div",{key:"checkPermission"+e.key,staticStyle:{"margin-top":"30px"}},[e._m(0),e._v(" "),t("el-tabs",{staticStyle:{width:"500px"},attrs:{type:"border-card"}},[e.checkPermission(["admin"])?t("el-tab-pane",{attrs:{label:"Admin"}},[e._v("Admin can see this")]):e._e(),e._v(" "),e.checkPermission(["editor"])?t("el-tab-pane",{attrs:{label:"Editor"}},[e._v("Editor can see this")]):e._e(),e._v(" "),e.checkPermission(["admin","editor"])?t("el-tab-pane",{attrs:{label:"Admin-OR-Editor"}},[e._v("Both admin or editor can see this")]):e._e()],1)],1)],1)},[function(){var e=this.$createElement,s=this._self._c||e;return s("code",[this._v("In some cases it is not suitable to use v-permission, such as element Tab component  which can only be achieved by manually setting the v-if.\n      "),s("br"),this._v(" e.g.\n    ")])}],!1,null,"4409fe1d",null);c.options.__file="directive.vue";s.default=c.exports},ylkE:function(e,s,t){}}]);