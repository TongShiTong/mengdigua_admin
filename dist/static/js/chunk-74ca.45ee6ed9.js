(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-74ca"],{"79xw":function(n,t,i){"use strict";var s=i("Ax+6");i.n(s).a},"Ax+6":function(n,t,i){},PTVM:function(n,t,i){"use strict";var s=i("w0RY");i.n(s).a},Z4x1:function(n,t,i){"use strict";i.r(t);var s=i("MQ60"),a={name:"DragKanbanDemo",components:{draggable:i.n(s).a},props:{headerText:{type:String,default:"Header"},options:{type:Object,default:function(){return{}}},list:{type:Array,default:function(){return[]}}}},e=(i("PTVM"),i("KHd+")),o=Object(e.a)(a,function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"board-column"},[i("div",{staticClass:"board-column-header"},[n._v("\n    "+n._s(n.headerText)+"\n  ")]),n._v(" "),i("draggable",{staticClass:"board-column-content",attrs:{list:n.list,options:n.options}},n._l(n.list,function(t){return i("div",{key:t.id,staticClass:"board-item"},[n._v("\n      "+n._s(t.name)+" "+n._s(t.id)+"\n    ")])}))],1)},[],!1,null,null,null);o.options.__file="index.vue";var r={name:"DragKanbanDemo",components:{Kanban:o.exports},data:function(){return{options:{group:"mission"},list1:[{name:"Mission",id:1},{name:"Mission",id:2},{name:"Mission",id:3},{name:"Mission",id:4}],list2:[{name:"Mission",id:5},{name:"Mission",id:6},{name:"Mission",id:7}],list3:[{name:"Mission",id:8},{name:"Mission",id:9},{name:"Mission",id:10}]}}},l=(i("79xw"),Object(e.a)(r,function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"components-container board"},[i("Kanban",{key:1,staticClass:"kanban todo",attrs:{list:n.list1,options:n.options,"header-text":"Todo"}}),n._v(" "),i("Kanban",{key:2,staticClass:"kanban working",attrs:{list:n.list2,options:n.options,"header-text":"Working"}}),n._v(" "),i("Kanban",{key:3,staticClass:"kanban done",attrs:{list:n.list3,options:n.options,"header-text":"Done"}})],1)},[],!1,null,null,null));l.options.__file="dragKanban.vue";t.default=l.exports},w0RY:function(n,t,i){}}]);