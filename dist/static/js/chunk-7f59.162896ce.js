(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7f59"],{"+jnH":function(e,t,a){"use strict";a.r(t);var n=a("gDS+"),i=a.n(n),r=a("4d7F"),s=a.n(r),o=a("QbLZ"),l=a.n(o),d=a("L2JU"),c=a("IdKY"),u={name:"Settings",data:function(){return{loading:!0,rewardtext:"",TextModel:!1,levelLoading:!1,endLoading:!1,currentRole:"adminDashboard",more:1,choice:"请选择",levelOptions:[{id:1,name:"管理奖",value:1},{id:2,name:"培训奖",value:2},{id:3,name:"咨询奖",value:3}],people:[{name:"vip"},{name:"经理"},{name:"总监"}],changePeople:[],is_multiple:!1,trace_level:1,rights:[],textarea3:""}},computed:l()({},Object(d.b)(["roles"])),created:function(){this.getPushList()},methods:{getPushList:function(){var e=this,t=this;return t.loading=!0,new s.a(function(a,n){Object(c.i)({}).then(function(a){if(0===a.data.errcode){t.people=a.data.data;for(var n=0;n<e.people.length;n++)e.changePeople.push({level:e.people[n].level,commission_rate:""});e.pageGetConfiguration()}else t.loading=!1,t.$message.error(a.data.errmsg)}).catch(function(e){t.loading=!1,n(e)})})},pageGetConfiguration:function(){var e=this,t=this;return new s.a(function(a,n){Object(c.c)({}).then(function(a){if(0===a.data.errcode){if(e.rights=a.data.data.divider_data,e.is_multiple=a.data.data.divider_mode.is_multiple,e.trace_level=a.data.data.divider_mode.trace_level,e.rewardtext=a.data.data.divider_name_list,e.rights){for(var n=0;n<parseInt(t.trace_level);n++)if(t.rights[n].commission_data.length<=t.changePeople.length)for(var r=0;r<t.changePeople.length;r++)if(r<=t.rights[n].commission_data.length-1){var s=r;parseInt(t.rights[n].commission_data[s].level)!==parseInt(t.changePeople[r].level)&&(t.rights[n].commission_data[s]=t.changePeople[r])}else t.rights[n].commission_data.push(JSON.parse(i()(t.changePeople[r])))}else{t.rights=[];for(var o=0;o<parseInt(t.trace_level);o++)t.rights.push({name:"",commission_data:JSON.parse(i()(t.changePeople))})}if(t.rewardtext)if(t.levelOptions=[],-1===t.rewardtext.indexOf(";"))t.levelOptions.push({name:t.rewardtext});else for(var l=e.rewardtext.split(";"),d=0;d<l.length;d++)t.levelOptions.push({name:l[d]})}else t.$message.error(a.data.errmsg);t.loading=!1}).catch(function(e){t.loading=!1,n(e)})})},saveText:function(){var e=this,t=this;return t.TextModel=!0,new s.a(function(a,n){Object(c.n)({divider_name_list:t.rewardtext}).then(function(a){if(0===a.data.errcode)if(t.$message.success("保存成功"),t.levelOptions=[],-1===t.rewardtext.indexOf(";"))t.levelOptions.push({name:t.rewardtext});else for(var n=e.rewardtext.split(";"),i=0;i<n.length;i++)t.levelOptions.push({name:n[i]});else t.$message.error(a.data.errmsg);t.TextModel=!1}).catch(function(e){t.TextModel=!1,n(e)})})},saveLevel:function(){var e=this;return e.is_multiple||(e.trace_level=1),e.levelLoading=!0,new s.a(function(t,a){Object(c.m)({divider_mode:{is_multiple:e.is_multiple,trace_level:e.trace_level}}).then(function(t){if(0===t.data.errcode){if(e.$message.success("保存成功"),e.levelLoading=!1,e.rights.length>parseInt(e.trace_level))return e.rights.splice(e.trace_level,e.rights.length-parseInt(e.trace_level)),!1;if(e.rights.length===parseInt(e.trace_level))return!1;if(e.rights.length<parseInt(e.trace_level))for(var a=parseInt(e.trace_level)-e.rights.length,n=0;n<a;n++)e.rights.push({name:"",commission_data:JSON.parse(i()(e.changePeople))})}else e.$message.error(t.data.errmsg)}).catch(function(t){e.levelLoading=!1,a(t)})})},saveChoice:function(){for(var e=this,t=this,a=0;a<t.rights.length;a++){if(""===t.rights[a].name)return t.$message.error(a+1+"级奖励名称不能为空"),!1;for(var n=0;n<t.rights[a].commission_data.length;n++){if(t.rights[a].commission_data[n].commission_rate<0)return t.$message.error(a+1+"级 "+t.people[n].name+"<0"),!1;if(""===t.rights[a].commission_data[n].commission_rate)return t.$message.error(a+1+"级 "+t.people[n].name+"不能为空"),!1}}return t.endLoading=!1,new s.a(function(a,n){Object(c.o)({divider_data:e.rights}).then(function(e){0===e.data.errcode?t.$message.success("保存成功"):t.$message.error(e.data.errmsg),t.endLoading=!1}).catch(function(e){t.endLoading=!1,n(e)})})}}},v=(a("9BFQ"),a("KHd+")),m=Object(v.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"settings",attrs:{"element-loading-text":"拼命加载中"}},[a("div",{staticClass:"setting-top"},[a("div",{staticClass:"flex-r-s"},[a("div",{staticClass:"label mr20"},[e._v("是否多级分拥：")]),e._v(" "),a("el-radio-group",{staticClass:"mr20",attrs:{size:"mini"},model:{value:e.is_multiple,callback:function(t){e.is_multiple=t},expression:"is_multiple"}},[a("el-radio",{attrs:{label:!0}},[e._v("是")]),e._v(" "),a("el-radio",{attrs:{label:!1}},[e._v("否")])],1),e._v(" "),e.is_multiple?e._e():a("el-button",{attrs:{loading:e.levelLoading,type:"primary",size:"mini"},on:{click:e.saveLevel}},[e._v("保存")])],1),e._v(" "),e.is_multiple?a("div",{staticClass:"flex-r-s mt20"},[a("div",{staticClass:"label mr20"},[e._v("分佣追溯层级：")]),e._v(" "),a("el-input",{staticClass:"input-width mr20",attrs:{type:"number",placeholder:"默认追溯1层关系，填写0则无效",size:"mini"},model:{value:e.trace_level,callback:function(t){e.trace_level=t},expression:"trace_level"}}),e._v(" "),a("el-button",{attrs:{loading:e.levelLoading,type:"primary",size:"mini"},on:{click:e.saveLevel}},[e._v("保存")])],1):e._e()]),e._v(" "),a("div",{staticClass:"customize mt20"},[a("div",{staticClass:"flex-r-s"},[a("div",{staticClass:"label mr20"},[e._v("自定义奖励名称：")]),e._v(" "),a("el-input",{staticClass:"textarea-input mr20",attrs:{autosize:{minRows:4,maxRows:8},type:"textarea",placeholder:"请输入奖励名称，以“;”作为分隔"},model:{value:e.rewardtext,callback:function(t){e.rewardtext=t},expression:"rewardtext"}}),e._v(" "),a("el-button",{attrs:{loading:e.TextModel,type:"primary",size:"mini"},on:{click:e.saveText}},[e._v("保存")])],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0!=e.levelOptions.length,expression:"levelOptions.length!=0"}],staticClass:"rights-setting mt20"},[a("div",{staticClass:"title"},[e._v("权益配置：")]),e._v(" "),a("div",{staticClass:"level-box mt20"},[a("div",{staticClass:"table-one table-title"},[a("div",{staticClass:"each-attr-first"},[e._v(" ")]),e._v(" "),e._l(e.people,function(t,n){return a("div",{key:n,staticClass:"each-attr"},[e._v(e._s(t.name))])}),e._v(" "),a("div",{staticClass:"each-attr"},[e._v("奖励名称")])],2),e._v(" "),e._l(e.rights,function(t,n){return a("div",{key:n,staticClass:"table-one"},[a("div",{staticClass:"each-attr-first attr-level"},[e._v(e._s(n+1)+"级")]),e._v(" "),e._l(t.commission_data,function(t,n){return a("div",{key:n,staticClass:"each-attr"},[a("div",{staticClass:"flex-r-s each-money"},[a("div",[e._v("佣金")]),e._v(" "),a("el-input",{staticClass:"each-number",attrs:{type:"number",size:"mini",min:"0",placeholder:""},model:{value:t.commission_rate,callback:function(a){e.$set(t,"commission_rate",a)},expression:"item1.commission_rate"}}),e._v(" "),a("div",[e._v("%")])],1)])}),e._v(" "),a("div",{staticClass:"each-attr"},[a("div",{staticClass:"each-money"},[a("el-select",{attrs:{size:"mini",placeholder:"请选择"},model:{value:t.name,callback:function(a){e.$set(t,"name",a)},expression:"item.name"}},e._l(e.levelOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.name}})}))],1)])],2)})],2)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.levelOptions.length,expression:"levelOptions.length==0"}],staticClass:"mt20 mb20"},[e._v("请先设置自定义奖励")]),e._v(" "),a("div",{staticClass:"prompt"},[e._v("提示：初次开启邀请奖励，所有商品默认使用平台设定的佣金，单商品需要自行调整")]),e._v(" "),a("el-button",{attrs:{loading:e.endLoading,type:"primary",size:"mini mt20"},on:{click:e.saveChoice}},[e._v("保存")])],1)},[],!1,null,"56afae02",null);m.options.__file="index.vue";t.default=m.exports},"9BFQ":function(e,t,a){"use strict";var n=a("JGUr");a.n(n).a},IdKY:function(e,t,a){"use strict";a.d(t,"i",function(){return i}),a.d(t,"d",function(){return r}),a.d(t,"j",function(){return s}),a.d(t,"b",function(){return o}),a.d(t,"a",function(){return l}),a.d(t,"c",function(){return d}),a.d(t,"m",function(){return c}),a.d(t,"n",function(){return u}),a.d(t,"o",function(){return v}),a.d(t,"f",function(){return m}),a.d(t,"h",function(){return p}),a.d(t,"g",function(){return h}),a.d(t,"p",function(){return f}),a.d(t,"l",function(){return g}),a.d(t,"e",function(){return _}),a.d(t,"k",function(){return b});var n=a("t3Un");function i(e){return Object(n.a)({url:"/handConfig/hand-config-api/index",method:"post",data:e})}function r(e){return Object(n.a)({url:"/handConfig/config-api/commission-config",method:"post",data:e})}function s(e){return Object(n.a)({url:"/handConfig/config-api/set-name-list",method:"post",data:e})}function o(e){return Object(n.a)({url:"/handConfig/config-api/set-mode",method:"post",data:e})}function l(e){return Object(n.a)({url:"/handConfig/config-api/set-data",method:"post",data:e})}function d(e){return Object(n.a)({url:"/handConfig/config-api/divider-config",method:"post",data:e})}function c(e){return Object(n.a)({url:"/handConfig/config-api/set-divider-mode",method:"post",data:e})}function u(e){return Object(n.a)({url:"/handConfig/config-api/set-divider-name-list",method:"post",data:e})}function v(e){return Object(n.a)({url:"/handConfig/config-api/set-divider-data",method:"post",data:e})}function m(e){return Object(n.a)({url:"/handConfig/hand-config-api/create",method:"post",data:e})}function p(e){return Object(n.a)({url:"/handConfig/hand-config-api/update",method:"post",data:e})}function h(e){return Object(n.a)({url:"/handConfig/hand-config-api/delete",method:"post",data:e})}function f(e){return Object(n.a)({url:"/handUpdate/hand-update-level-api/get-update-rules",method:"post",data:e})}function g(e){return Object(n.a)({url:"/handUpdate/hand-update-level-api/save-rule",method:"post",data:e})}function _(e){return Object(n.a)({url:"/handUpdate/hand-update-level-api/get-conf",method:"post",data:e})}function b(e){return Object(n.a)({url:"/handUpdate/hand-update-level-api/save-conf",method:"post",data:e})}},JGUr:function(e,t,a){},"gDS+":function(e,t,a){e.exports={default:a("oh+g"),__esModule:!0}},"oh+g":function(e,t,a){var n=a("WEpk"),i=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}}}]);