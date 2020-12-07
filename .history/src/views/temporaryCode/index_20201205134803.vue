<template>
  <div class="app-container">
    <!-- 搜索控件-->
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="PatternCreate"
      >
        添加持码人
      </el-button>
    </div>

    <!-- 数据显示表格区域  -->
    <el-table :data="patternList" fit highlight-current-row style="width: 200%">
      <el-table-column label="小程序码" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <img :src="row.code_img" :alt="row.name" style="width:80px;height:80px;">
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="code码" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行卡号" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.bank_card }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="支付宝号"
        align="center"
        min-width="150px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <span>{{ row.ali_code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <a class='download' :href='row.code_img' :download="row.name">下载</a>
        </template>
      </el-table-column>
    </el-table>
    <div
      style="
        margin: 10px 0;
        display: flex;
        justify-content: flex-end;
        padding: 0 10px;
      "
    >
      <el-pagination
        :page-size="10"
        :total="all_total"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加模式对话框-->
    <el-dialog
      title="添加持卡人"
      :visible.sync="addPatternlogVisible"
      width="500px"
    >
      <el-form
        ref="Pattern"
        :model="Pattern"
        :rules="addPatterRules"
        status-icon
        label-position="left"
        label-width="80px"
        style="width: 300px; margin-left: 30px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="Pattern.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="Pattern.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="code码" prop="code">
          <el-input v-model="Pattern.code" placeholder="请输入code码" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_card">
          <el-input v-model="Pattern.bank_card" placeholder="请输入银行卡号" />
        </el-form-item>
        <el-form-item label="支付宝号" prop="ali_code">
          <el-input v-model="Pattern.ali_code" placeholder="请输入支付宝号" />
        </el-form-item>
        <!-- <el-form-item label="模式周期" prop="timeRange">
          <el-date-picker
                @change="findPatternCycle"
                v-model="timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
        </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addPatternlogVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="addPattern('Pattern')"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      addPatternlogVisible: false,
      patternList: [],
      total: 0,
      all_start: 0, // 起始页
      all_total: null, // 全部页面

      Pattern: {
        phone: "",
        name: "",
        code: "",
        ali_code: "",
        bank_card: "",
      },

      /*添加模式表单验证*/
      addPatterRules: {
        name: [
          {
            required: true,
            message: "请输入姓名！",
            trigger: "blur",
          },
          {
            min: 2,
            max: 50,
            message: "用户名长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号!",
            trigger: "blur",
          },
        ],

        code: [
          {
            required: true,
            message: "请输入code码！",
            trigger: "blur",
          },
        ],
        bank_card: [
          {
            required: true,
            message: "请输入银行卡号！",
            trigger: "blur",
          },
        ],
        ali_code: [
          {
            required: true,
            message: "请输入支付宝号！",
            trigger: "blur",
          },
        ],
      },
    };
  },

  //Vue生命周期函数
  created() {
      this.getAllCode()
  },

  //事件处理函数
  methods: {
    // 获取列表
    getAllCode() {
      const self = this;
      request({
        method: "post",
        url: "/item/temporary-api/index",
        data: {
          page: self.all_start,
          size: 10,
        },
      })
        .then(function (res) {
          console.log(111, res);
          self.all_total = parseInt(res.data.data.total)
          self.patternList = res.data.data.data

          // setTimeout(function() {
          //   self.markItem()
          // }, 150)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    handleCurrentChange(val) {
        console.log(val)
      const self = this;
      self.all_start = val - 1;
      self.getAllCode();
    },

    // 提交信息
    addPattern(formName) {
        const self = this
         this.$refs[formName].validate((valid) => {
          if (valid) {
            request({
                method: 'post',
                url: '/item/temporary-api/create',
                data: self.Pattern
            }).then(function(res) {
                console.log(111122,res)
                if(res.data.errcode === 0) {
                    self.$message({
                        message: '添加成功！',
                        type: 'success'
                    })
                    // this.all_start = 0;
                    // this.getAllCode();
                    this.addPatternlogVisible = false;
                }else {
                    self.$message({
                        type: 'info',
                        message: res.data.errmsg
                    })
                }
               
            }).catch(function(error) {
                console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // 提交成功后
        // this.all_start = 0;
        // this.getAllCode();
        // this.addPatternlogVisible = false;
    },

    saveTplInfo() {
      const self = this
 
    //   if (!self.tplInfo.content) {
    //     self.$message({
    //       type: 'info',
    //       message: '数据不能为空，会刷新页面重试!'
    //     })
    //     return
    //   }
      request({
        method: 'post',
        url: '/item/item-details-activity-list/save-activity-list',
        data: {
          id: self.id,
        }
      }).then(function(res) {
        if(res.data.errcode==0){
          self.$message({
            message: '保存成功！',
            type: 'success'
          })
          self.$router.push('/shop_tpl_activeList')
        }else {
          self.$message({
            message: res.data.errmsg,
            type: 'warning'
          });
        }
      }).catch(function(error) {
        console.log(error)
      })
    },

    /* 创建模式选择对话框*/
    PatternCreate() {
      // this.resetPattern()
      // this.resetForm('addPatternForm')
      // this.dialogStatus = 'create'
     this.Pattern={
        phone: "",
        name: "",
        code: "",
        ali_code: "",
        bank_card: ""
      };
      this.addPatternlogVisible = true;
    },
  },
};
</script>
