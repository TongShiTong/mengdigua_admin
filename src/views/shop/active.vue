<template>
  <div class="index-tpl2">
    <div class="tpl-column1">
      <draggable
        :list="content.list"
        :options="options"
        :on-update="updateList"
        class="tpl-column-content">
        <div v-for="(item,index) in content.list" :key="index" class="tpl-item">
         
          <div style="margin:20px">
            <el-popover
              v-model="item.active"
              placement="right"
              width="100%"
              trigger="manual">
             
              <div class="edit-panel1">

                <div class="one-row1">
                    <div class="one-roe-title">新增banner</div>
                    <div class="row-col">
                        <div style="display:inline-block;width:200px;">
                        <span style="color:red">*</span> 上传图片
                        </div>
                        <div class="img-box" @click="setIndex1(index)">
                        <el-upload
                            :data="{index:index}"
                            :show-file-list="false"
                            :on-success="handleBgurlSuccess"
                            :before-upload="beforeAvatarUpload"
                            :action="base_api+'/material/index/upload'"
                            class="avatar-uploader">
                            <div v-if="item.bgurl" :style="{backgroundImage: 'url('+ item.bgurl +')'}" class="avatar"/>
                            <i v-else class="el-icon-plus avatar-uploader-icon"/>
                        </el-upload>
                        </div>
                    </div>
                    <div style="margin: 10px 0">
                        <span style="display:inline-block;width:200px;"><span style="color:red">*</span> 活动名称</span>
                        <el-input v-model="item.title" style="width:600px;" size="mini" placeholder="活动名称"/>
                    </div>
                    <div style="margin: 10px 0">
                        <span style="display:inline-block;width:200px;vertical-align: top;"><span style="color:red">*</span> 活动备注</span>
                        <el-input v-model="item.remarks" type="textarea" autosize style="width:600px;" size="mini" placeholder="活动备注"/>
                    </div>
                    <div style="margin: 10px 0">
                        <span style="display:inline-block;width:200px;"><span style="color:red">*</span> 是否显示</span>
                        <el-select v-model="item.isShow" style="width:600px;" size="mini" placeholder="请选择">
                            <el-option :key="0" :label="'否'" :value="0"/>
                            <el-option :key="1" :label="'是'" :value="1"/>
                        </el-select>
                    </div>
                    
                  <!-- <div v-if="item.bgurl||item.bgcolor" style="flex:none;position: absolute;top: 40px;left: 200px;">
                    <el-button type="info" size="mini" plain @click="clearBgImg1(index)">取消背景色（图）</el-button>
                  </div> -->
 
                </div>
                <!-- <div class="one-row">
                  
                </div> -->

                <div style="max-height: 610px;overflow-y: auto;">
                  <!-- 店铺列表第二部分 -->

                    <div v-for="(item3,index3) in item.moduleList" :key="index3+'i'">
                      
                        <div v-for="(item2,index2) in item3.image_data" :key="index2+'a'" class="two-row-item">
                          <div class="item-content">
                            <div class="data-box">
                              
                              <el-row style="margin: 10px 0">
                                <span style="display:inline-block;width:200px;"><span style="color:red">*</span> 跳转方式</span>
                                <el-select v-model="item2.type" style="width:600px;" size="mini" placeholder="跳转方式" @change="changeItem(index,index3,index2)">
                                  <el-option label="无" :value="0" :key="0"/>
                                  <!-- <el-option label="商品" value="1"/> -->
                                 
                                  <el-option label="装修页" :value="9" :key="9"/>
                                
                                  <el-option label="外链" :value="8" :key="8"/>
                                  <!-- <el-option v-if="tplInfo.shop_id==0" label="分类商品列表" value="2"/> -->
                                  <!-- <el-option label="店铺" value="3"/> -->
                                </el-select>

                              </el-row>
                              <el-row v-if="item2.type==1||item2.type==15" style="margin: 20px 0">
                                <span style="display:inline-block;width:200px">商品名字</span>
                                <span style="display:inline-block;width:600px;">{{ item2.good_info.title }}</span>
                              </el-row>
                              <el-row style="margin: 20px 0">
                                <span style="display:inline-block;width:200px;"><span style="color:red">*</span> 跳转参数</span>
                                <el-input v-model="item2.param" :disabled="item2.type==1||item2.type==2||item2.type==3" style="width:600px;" size="mini" class="input-with-select">
                                  <el-button slot="append" size="mini" icon="el-icon-search" @click="selectItem1(item2.type,index,index3,index2)"/>
                                </el-input>
                                <!-- <span v-if="item2.type==0" style="color:red;">(不必填)</span> -->
                                <span v-if="item2.type==1" style="color:red;">(商品id)</span>
                                <span v-if="item2.type==3" style="color:red;">(店铺id)</span>
                                <span v-if="item2.type==8" style="color:red;">(外链链接)</span>
                                <span v-if="item2.type==9" style="color:red;">(装修页id)</span>
                              </el-row>
                            </div>
                          </div>
                        </div>
                    
                     
                  </div>
                  <div style="margin: 10px 0">
                      <span style="display:inline-block;width:200px;"><span style="color:red">*</span> 排序</span>
                      <el-input v-model="item.sort" style="width:600px;" size="mini"/>
                  </div>
                </div>
                <!-- 自定义商品选择 -->
                <div class="two-row">
                   <!-- 配置自定义商品的蓝色按钮 ↓ v-if="item.floor_data.length<11"-->
                  <div style="margin: 10px 0">
                    <span style="display:inline-block;width:200px;"><span style="color:red">*</span> 活动商品</span>
                    <el-button type="primary" size="mini" icon="el-icon-plus" @click="addImg(index,item.type)">添加商品</el-button>
                  </div>
                  <div>          
                    <div v-for="(item2,index2) in item.goods_list" :key="index2" class="two-row-item">
                      <el-row style="line-height:40px;display:flex;">
                        <span style="padding-right:4px;">商品id：{{ item2 }}</span>
                      </el-row>
                      <div class="item-btns">
                        <el-row>
                          <!-- <el-button style="margin-bottom:5px;" icon="el-icon-arrow-down" size="mini" circle @click="downImg(index,index2)"/>
                          <el-button style="margin-bottom:5px;" icon="el-icon-arrow-up" size="mini" circle @click="upImg(index,index2)"/> -->
                          <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="delImg(index,index2)"/>
                        </el-row>
                      </div>
                      <!-- <div class="item-content">
                        <div class="img-box">
                          <div v-if="item2.good_info.img_url" :style="{backgroundImage: 'url('+ item2.good_info.img_url +')'}" class="avatar"/>
                        </div>
                        <div class="data-box">
                          <el-row style="line-height:32px;display:flex;">
                            <span style="padding-right:4px;">商品名称：{{ item2.good_info.title }}</span>
                          </el-row>
                          <el-row style="line-height:32px;display:flex;">
                            <span style="padding-right:4px;">商品id：{{ item2.good_info.item_id }}</span>
                          </el-row>
                          <el-row style="line-height:32px;display:flex;">
                            <span style="padding-right:4px;">商品价格：￥{{ item2.good_info.price }}</span>
                          </el-row>
                        </div>
                      </div> -->
                    </div>
                  </div>
                  <div class="tool-item">
                    <el-button type="success" style="width:100px;" size="mini" @click="saveTplInfo()">创建</el-button>
                  </div>
                </div>

              </div>
            </el-popover>
          </div>

        </div>
      </draggable>
    </div>
    

    <el-dialog :width="'700px'" :visible.sync="dialogTableVisible" :title="activeFlag?'选择活动商品':'选择普通商品'">
      <!-- <el-button type="primary" plain  @click="activeFlag=!activeFlag">{{activeFlag?'切换普通商品':'切换活动商品'}}</el-button> -->
      <!-- 后台不支持普通商品VIP商品一起请求，暂时废弃 -->
      <el-row>
        <el-col v-show="!activeFlag" :span="5">
          <el-menu
            style="min-height: 400px;"
            default-active="0"
            class="el-menu-vertical-demo"
          >
            <el-menu-item v-for="(item,index) in class1" :index="index+''" :key="index" style="padding:0 5px;height: 42px;line-height: 42px;" @click="selectClass1(item)">
              <i class="el-icon-caret-right"/>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col v-show="!activeFlag" :span="5" style="min-height:100px">
          <div v-if="class2.length>0" >
            <el-menu
              style="min-height: 400px;"
              default-active="0"
              class="el-menu-vertical-demo"
            >
              <el-menu-item v-for="(item1,index1) in class2" :index="index1+''" :key="index1" style="padding:0 5px;height: 42px;line-height: 42px;" @click="selectClass2(item1)">
                <i class="el-icon-circle-check-outline"/>
                <span slot="title">{{ item1.name }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col v-if="select_type==1" v-show="!activeFlag" :span="14">
          <div style="padding:5px 10px;">
            <el-input v-model="key_word1" placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getGoods()"/>
            </el-input>
          </div>
          <el-table
            :data="goods"
            style="width: 100%">
            <el-table-column
              label="商品名称"
              prop="title"/>
            <el-table-column
              label="备注"
              prop="remark"/>
            <el-table-column
              align="right"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="sureSelect(scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-size="6"
            :total="total_pages1"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange1"/>
        </el-col>

        <el-table
          v-show="activeFlag"
          :data="gifts"
          style="width: 100%">
          <el-table-column
            label="礼包名称"
            prop="title"/>
          <el-table-column
            label="备注"
            prop="remark"/>
          <el-table-column
            align="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="sureSelectGift2(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="activeFlag"
          :page-size="6"
          :total="total_pages3"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange3"/>

      </el-row>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>

    <el-dialog :width="'700px'" :visible.sync="dialogTable1Visible" title="选择店铺">
      <div style="padding:5px 10px;">
        <el-input v-model="key_word2" placeholder="请输入店铺名称" prefix-icon="el-icon-search" size="mini" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getShops()"/>
        </el-input>
      </div>
      <el-table
        :data="shops"
        style="width: 100%">
        <el-table-column
          label="店铺名称"
          prop="name"/>
        <el-table-column
          label="备注"
          prop="remark"/>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="sureSelectShop(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="6"
        :total="total_pages2"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange2"/>
    </el-dialog>

    <el-dialog :width="'700px'" :visible.sync="dialogTableVisible2" title="选择礼包">
      <!-- <div style="padding:5px 10px;">
        <el-input v-model="key_word2" placeholder="请输入店铺名称" prefix-icon="el-icon-search" size="mini" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getShops()"/>
        </el-input>
      </div> -->
      <el-table
        :data="gifts"
        style="width: 100%">
        <el-table-column
          label="礼包名称"
          prop="title"/>
        <el-table-column
          label="备注"
          prop="remark"/>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="sureSelectGift(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="6"
        :total="total_pages3"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange3"/>
    </el-dialog>

    <el-dialog :width="'700px'" :visible.sync="dialogTableVisible3" title="选择装修页">
      <el-table
        :data="floors"
        style="width: 100%">
        <el-table-column
          label="装修名称"
          prop="name"/>
        <el-table-column
          label="装修id"
          prop="position_code"/>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="sureSelectfloor(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        :page-size="6"
        :total="total_pages3"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange3"/> -->
    </el-dialog>

    <el-dialog :width="'700px'" :visible.sync="dialogTableVisible4" title="选择商品">
      <div style="display:flex;margin:10px 0;">
        <div style="width:150px">
          <el-input
            v-model="inpItemId"
            placeholder="请输入商品id"/>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div style="width:150px">
          <el-input
            v-model="all_keyWord"
            placeholder="请输入商品名称"/>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div style="width:150px">
          <el-select v-model="inpclass1" placeholder="一级分类" @change="allSelectOne">
            <el-option
              v-for="item in class1"
              :key="item.mcid"
              :label="item.name"
              :value="item.mcid"/>
          </el-select>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div style="width:150px">
          <el-select v-model="all_mcid" placeholder="二级级分类" @change="allSelectTwo">
            <el-option
              v-for="item in Allclass2"
              :key="item.mcid"
              :label="item.name"
              :value="item.mcid"/>
          </el-select>
        </div>
        &nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="primary"
          @click="AllResat()"
        >复位</el-button>
        &nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          type="primary"
          @click="AllSearch()"
        >搜索</el-button>

      </div>
      <el-table
        :data="all_showList"
        style="width: 100%">
        <el-table-column
          label="商品id"
          width="70"
          prop="item_id"/>
        <el-table-column
          label="首图"
          align="left"
          width="100"
        >
          <template slot-scope="scope">
            <img :src="scope.row.img_url" width="60" height="60">
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          prop="title"/>
        <el-table-column
          align="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.select!=1"
              size="mini"
              type="primary"
              @click="AllsureSelect(scope.row)">选择</el-button>
            <el-button
              v-if="scope.row.select==1"
              size="mini"
              type="success"
              @click="AllsureDelete(scope.row)">已选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin:10px 0;display:flex;justifyContent:space-between;padding:0 10px;">
        <el-pagination
          :page-size="5"
          :total="all_total"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange4"/>
        <el-button
          size="mini"
          type="warning"
          @click="SaveAllGoods()"
        >保存</el-button>
      </div>

    </el-dialog>

  </div>
</template>
<script>
import request from '@/utils/request'
import { getBaseApi } from '@/utils'
import draggable from 'vuedraggable'
export default {
  name: 'TplEdit',
  components: {
    draggable
  },
  data() {
    return {
      floors: [], // 装修模板
      activeFlag: false, // 在普通商品选择框中切换至礼包
      gifts: [],
      id:'',
      total_pages3: 0,
      start_page3: 0,
      loading: false,
      total_pages1: 0,
      total_pages2: 0,
      start_page1: 0,
      start_page2: 0,
      key_word1: '',
      key_word2: '',
      iscoryShow: false,//选择分类弹框
      cory_index:'',//选择分类下标
      cory_index1:'',
      dialogTableVisible: false,
      dialogTable1Visible: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      classList: [],//一级分类列表
      class2List:[],//二级分类
      class_name:'',
      class1: [],
      class1_act: '',
      class2: [],
      class2_act: '',
      select_type: 1,
      select_index: 0,
      select_index1: 0,
      select_index2: '',
      select_sptype: 1,
      select_spindex: 0,
      select_spindex1: 0,
      select_spindex2: '',
      goods: [],
      shops: [],
      base_api: getBaseApi(),
      active_index1: '',
      active_index2: '',
      bgurl_index: '',//背景图
      ggImage_url:'',
      image_url_index:'',//公告上传图片下标
      ggImage_url_index: '',
      isSetBg: false,//是否设置背景
      floor_id: '',
      headerText: '首页装修', // 模板名称
      tplInfo: {
        shop_id: '',
        title: '',
        abstract: '',
        content: '',
        floor_id: ''
      },
      options: {// 拖动配置
        group: 'mission'
      },
      content: {
        // bg_img: '', // 背景图片
        // bg_color: '#ffffff',//背景色
        list: [

        ]
      },
      tj_shops: [],
      hot_goods: [],
      tj_goods: [],
      hot_goods_num: 0,
      tj_goods_num: 0,
      tj_shop_num: 0,
      // ·················以下数据专供自定义商品使用
      all_start: 0, // 起始页  以下数据专供自定义商品选择页面233333
      theIndex: '', // 属于楼层位置顺位
      theIndex1: '',
      all_total: null, // 全部页面
      all_mcid: '', // 品类id
      all_keyWord: '', // 搜索关键字
      all_showList: [], // 展示用列表
      all_dataList: [], // 选中的数据列表
      all_idList: [], // 选中的id列表
      inpItemId: '',
      inpclass1: '',
      Allclass2: [], // 选中一级分类后二级分类数据
      inpclass2: ''
      // ························以上数据专供自定义商品使用
    }
  },
  created() {
    this.floor_id = this.$route.query.floor_id
    this.tplInfo.shop_id = this.$route.query.shop_id
    this.id = this.$route.query.id
    // this.getTplInfo()
    this.getClass1() 
    this.getActive()
    // this.getHots()
    // this.getNews()
    // this.getTJShops()
    this.addTpl(10)
  },
  methods: {
    xianshiC(in1, in2, d) {
      // self.content.list[index].floor_data[index1].type = newDate
      if (d == 2) {
        this.content.list[in1].floor_data[in2].type = 17
      } else if (d == 1) {
        this.content.list[in1].floor_data[in2].type = ''
      }
    },
    // 公告栏选择模块
    chooseMukuai(index,type) {
      const dataList = [
        {
            type:2,
            typeN:2,
            title: '',
            content: '',
            isBlock: 0,
            isprogress: true,//是否显示设置进度条
            hasprogress: 1,//是否有进度条
            hasfloor_data: true,//是否有商品信息
            goods_list:[],
            floor_data: [
              
            ],
            hasimage_data: false,//是否上传图片
            image_data:[]
          },
          {
            type:3,
            typeN:3,
            title: '',
            content: '',
            isBlock: 0,
            isprogress: false,//是否显示设置进度条
            hasprogress: 0,//是否有进度条
            hasfloor_data: true,//是否有商品信息
            goods_list:[],
            floor_data: [
              
            ],
            hasimage_data: false,//是否上传图片
            image_data:[]
          },
          {
            type:4,
            typeN:4,
            title: '',
            content: '',
            isBlock: 0,
            isprogress: false,//是否显示设置进度条
            hasprogress: 0,//是否有进度条
            hasfloor_data: false,//是否有商品信息
            goods_list:[],
            floor_data: [
              
            ],
            hasimage_data: true,//是否上传图片
            image_data:[
              {
                img_url:'',
                type:'',
                param:'',
                img_width: 0, // 显示宽度
                img_height: 0, // 显示高度
                good_info:{
                  title:'',
                }
              }
            ]   
          },
          {
            type:5,
            typeN:5,
            title: '',
            content: '',
            isBlock: 1,
            isprogress: false,//是否显示设置进度条
            hasprogress: 0,//是否有进度条
            hasfloor_data: false,//是否有商品信息
            goods_list:[],
            floor_data: [
              
            ],
            hasimage_data: true,//是否上传图片
            image_data:[
              {
                img_url:'',
                type:'',
                param:'',
                img_width: 0, // 显示宽度
                img_height: 0, // 显示高度
                good_info:{
                  title:'',
                }
              }
            ]   
          },{
            type:6,
            typeN:3,
            title: '',
            content: '',
            isBlock: 1,
            isprogress: false,//是否显示设置进度条
            hasprogress: 0,//是否有进度条
            hasfloor_data: true,//是否有商品信息
            goods_list:[],
            floor_data: [
              
            ],
            hasimage_data: false,//是否上传图片
            image_data:[]
            
          },{
            type:7,
            typeN:4,
            title: '',
            content: '',
            isBlock: 1,
            isprogress: false,//是否显示设置进度条
            hasprogress: 0,//是否有进度条
            hasfloor_data: false,//是否有商品信息
            goods_list:[],
            floor_data: [
              
            ],
            hasimage_data: true,//是否上传图片
            image_data:[
              {
                img_url:'',
                type:'',
                param:'',
                img_width: 0, // 显示宽度
                img_height: 0, // 显示高度
                good_info:{
                  title:'',
                }
              }
            ]   
            
          }
      ]
      for(let i=0;i<dataList.length;i++) {
        if(dataList[i].type==type) {
          this.content.list[index].moduleList.push(dataList[i])
        }
      }
      this.content.list[index].listNums = ''
    },
    chooseMukuai1(index,type) {
      console.log(index,type)
      const dataList = [
        {
            type:1,
            // isBlock: 0,//是否分块
            // imgPosition: 1,//0是左，1是右
            goods_list:[],
            image_data:[
              {
                img_url:'',
                type:'',
                param:'',
                img_width: 0, // 显示宽度
                img_height: 0, // 显示高度
                good_info:{
                  title:'',
                }
              }
            ],//店铺信息
            floor_data: [],//商品信息
          },
          {
            type:2,
            // isBlock: 0,//是否分块
            // imgPosition: 0,//0是左，1是右
            goods_list:[],
            image_data:[
              {
                img_url:'',
                type:'',
                param:'',
                img_width: 0, // 显示宽度
                img_height: 0, // 显示高度
                good_info:{
                  title:'',
                }
              }
            ],//店铺信息
            floor_data: [],//商品信息
          },
          {
            type:3,
            // title: '',
            // isBlock: 1,//是否分块
            // imgPosition: 0,//0是左，1是右
            goods_list:[],
            image_data:[
              {
                img_url:'',
                type:'',
                param:'',
                img_width: 0, // 显示宽度
                img_height: 0, // 显示高度
                good_info:{
                  title:'',
                }
              }
            ],//店铺信息
            floor_data: [],//商品信息
          },
      ]
      for(let i=0;i<dataList.length;i++) {
        if(dataList[i].type==type) {
          this.content.list[index].moduleList.push(dataList[i])
        }
      }
      this.content.list[index].listNums = ''
    },
    chooseMukuaifl(index) {
      const dataList = {
        title: '',
        param: ''
      }
      this.content.list[index].moduleList.push(dataList)
    },
    // 公告删除所选模块
    deletaMokuia(index,index1) {
      // console.log(index,index1)
      this.content.list[index].moduleList.splice(index1, 1)
    },
    // 添加通用商品列表tab栏
    addTab(index) {
      const tyTab = {
        title:'',
        content:'',
        floor_data: [],
        goods_list:[]
      }
      this.content.list[index].moduleList.push(tyTab)
    },
    closePanel(item) {
      item.active = false
    },
    closePanel1() {
      this.isSetBg = false
    },
    setNums(index, type) {
    
    },
    getHots() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-api/index',
        data: {
          start_page: 0,
          pages: 20,
          item_type: 0,
          is_hot: 1
        }
      }).then(function(res) {
        self.hot_goods = res.data.data.list
        if (res.data.data.list && res.data.data.list.length > 0) {
          self.hot_goods_num = res.data.data.list.length
        }
      })
    },
    getNews() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-api/index',
        data: {
          start_page: 0,
          pages: 20,
          item_type: 0,
          is_new: 1
        }
      }).then(function(res) {
        self.tj_goods = res.data.data.list
        if (res.data.data.list && res.data.data.list.length > 0) {
          self.tj_goods_num = res.data.data.list.length
        }
      })
    },
    // 获取活动详情
    getActive() {
      const self = this
      request({
        method: 'post',
        url: '/item/item-details-activity-list/get-one-activity-list',
        data: {
          id:self.id
        }
      }).then(function(res) {
        console.log(111,res)
        if(res.data.errcode==0) {
          if(res.data.data.activity_goods){
            let goods = res.data.data.activity_goods.split(',')
            self.content.list[0].goods_list=goods
          }else {
            self.content.list[0].goods_list=res.data.data.activity_goods
          }
          
          self.content.list[0].bgurl=res.data.data.banner_img
          self.content.list[0].title=res.data.data.activity_name
          self.content.list[0].remarks=res.data.data.activity_remark
          
          self.content.list[0].moduleList[0].image_data[0].type=res.data.data.jump_type
          self.content.list[0].moduleList[0].image_data[0].param=res.data.data.jump_value
          self.content.list[0].isShow=res.data.data.is_show
          self.content.list[0].sort=res.data.data.sort
        }
        
      })
    },
    getTJShops() {
      const self = this
      request({
        method: 'post',
        url: '/shop/shop-api/index',
        data: {
          start_page: 0,
          pages: 20,
          is_recommend: 1
        }
      }).then(function(res) {
        self.tj_shops = res.data.data.list
        if (res.data.data.list && res.data.data.list.length > 0) {
          self.tj_shop_num = res.data.data.list.length
        }
      })
    },
    updateList(d) {
      console.log(d)
    },
    selectItem(type, index, index1) {
      console.log(147,type, index, index1)
      if (type === '1' || type === '2') { // 打开商品选择页面
        this.select_type = type
        this.select_index = index
        this.select_index1 = index1
        this.dialogTableVisible = true
        this.getGift()
      } else if (type === '3') {
        this.select_type = type
        this.select_index = index
        this.select_index1 = index1
        this.dialogTable1Visible = true
        this.getShops()
      } else if (type === '15') { // 打开礼包选择页面
        this.select_type = type
        this.select_index = index
        this.select_index1 = index1
        this.dialogTableVisible2 = true
        this.getGift()
      } else if (type === '9') { // 打开楼层装修页
        this.select_type = type
        this.select_index = index
        this.select_index1 = index1
        this.dialogTableVisible3 = true
        this.getfloor()
      } else if (type === '无') { // 打开选择商品页面 本来无是111
        this.select_type = type
        this.select_index = index
        this.select_index1 = index1
        this.dialogTableVisible4 = true
        this.getfloor()
      }
    },
    // 公告栏里选择图片打开页面
    selectItem1(type, index, index1, index2) {
      console.log(type, index, index1, index2)
      if (type === '1' || type === '2') { // 打开商品选择页面
        this.select_type = type
        this.select_index = index
        this.select_index1 = index1
        this.select_index2 = index2
        this.dialogTableVisible = true
        this.getGift()
      } else if (type === '3') {
        this.select_type = type
        this.select_index = index
        this.select_index1 = index1
        this.select_index2 = index2
        this.dialogTable1Visible = true
        this.getShops()
      }  else if (type == 9) { // 打开楼层装修页
        this.select_type = type
        this.select_index = index
        this.select_index1 = index1
        this.select_index2 = index2
        this.dialogTableVisible3 = true
        this.getfloor()
      } 
    },
    // 公告栏里选择商品打开页面
    selectItem2(type, index, index1, index2) {
      console.log(147,type, index, index1, index2)
      if (type === '1' || type === '2') { // 打开商品选择页面
        this.select_type = type
        this.select_spindex = index
        this.select_spindex1 = index1
        this.select_spindex2 = index2
        this.dialogTableVisible = true
        this.getGift()
      } else if (type === '3') {
        this.select_type = type
        this.select_spindex = index
        this.select_spindex1 = index1
        this.select_spindex2 = index2
        this.dialogTable1Visible = true
        this.getShops()
      }  else if (type === '9') { // 打开楼层装修页
        this.select_type = type
        this.select_spindex = index
        this.select_spindex1 = index1
        this.select_spindex2 = index2
        this.dialogTableVisible3 = true
        this.getfloor()
      } 
    },
    changeItem(index, index1, index2) {
      this.content.list[index].moduleList[index1].image_data[index2].param = ''
      this.content.list[index].moduleList[index1].image_data[index2].title = ''
      this.content.list[index].moduleList[index1].image_data[index2].good_info = {title:''}
      // this.content.list[index].moduleList[index1].goods_list = [] 
      
    },
     changeItem1(index, index1) {
      console.log(index, index1)
      this.content.list[index].floor_data[index1].param = ''
      this.content.list[index].floor_data[index1].good_info = {title:''}
      this.content.list[index].floor_data[index1].title = ''  
      this.content.list[index].goods_list = []  
    },
    goBack() {
      this.$router.go(-1)
    },
    /**
     * set上传图片对于数组索引
     * params：index(1层位置索引)，index2(2层位置索引)
    */
    setIndex(index, index2) {
      // console.log(index,index2)
      const self = this
      self.active_index1 = index
      self.active_index2 = index2
    },
    setIndex1(index) {
      // console.log(index)
      const self = this
      self.bgurl_index = index
    },
    setIndex2(index,index1,index2) {
      // console.log(index,index1,index2)
      const self = this
      self.ggImage_url = index
      self.image_url_index = index1
      self.ggImage_url_index = index2
    },

    /**
     * 图片上传成功
     * res(返回值)，file(返回文件)
    */
    handleAvatarSuccess(res, file) {
      const self = this
      var image = new Image()
      image.src = res.data.url
      image.onload = function() {
        self.content.list[self.active_index1].floor_data[self.active_index2].img_width = image.width
        self.content.list[self.active_index1].floor_data[self.active_index2].img_height = image.height
      }
      self.content.list[self.active_index1].floor_data[self.active_index2].img_url = res.data.url
    },

    // 背景图上传
    handleBgurlSuccess(res, file) {
      const self = this
      var image = new Image()
      image.src = res.data.url
      image.onload = function() {
        self.content.list[self.bgurl_index].img_width = image.width
        self.content.list[self.bgurl_index].img_height = image.height
      }
      self.content.list[self.bgurl_index].bgurl = res.data.url
    }, 

    // 公告栏图片上传
    handleGgSuccess(res, file) {
      const self = this
      var image = new Image()
      image.src = res.data.url
      image.onload = function() {
        self.content.list[self.ggImage_url].moduleList[self.image_url_index].image_data[self.ggImage_url_index].img_width = image.width
        self.content.list[self.ggImage_url].moduleList[self.image_url_index].image_data[self.ggImage_url_index].img_height = image.height
      }
      self.content.list[self.ggImage_url].moduleList[self.image_url_index].image_data[self.ggImage_url_index].img_url = res.data.url
    }, 
    handleGgtpSuccess(res, file) {
      const self = this
      var image = new Image()
      image.src = res.data.url
      image.onload = function() {
        self.content.list[self.ggImage_url].moduleList[self.image_url_index].floor_data[self.ggImage_url_index].img_width = image.width
        self.content.list[self.ggImage_url].moduleList[self.image_url_index].floor_data[self.ggImage_url_index].img_height = image.height
      }
      self.content.list[self.ggImage_url].moduleList[self.image_url_index].floor_data[self.ggImage_url_index].img_url = res.data.url
    }, 
    handleAvatarSuccessBg(res, file) {
      const self = this
      self.content.bg_img = res.data.url
    },
    clearBgImg() {
      const self = this
      self.content.bg_img = ''
    },
     clearBgImg1(index) {
       console.log(index)
      // const self = this
      // self.content.bg_img = ''
      this.content.list[index].bgcolor= ''
      this.content.list[index].bgurl=''
    },
    /**
     * 图片上传前验证
     * file(文件)
    */
    beforeAvatarUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 3
      const isWEBP = file.type === 'image/webp'
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
      }
      if (isWEBP) {
        this.$message.error('上传图片不能是webp格式!')
      }
      return isLt3M && !isWEBP
    },
    /**
     * 选中打开楼层编辑
     * params：index(楼层位置索引)
    */
    openThisFloor(index) {
      const self = this
      for (let i = 0; i < self.content.list.length; i++) {
        self.content.list[i].active = false
      }
      self.content.list[index].active = true
    },
    /**
     * 选中打开楼层编辑
     * params：type(楼层类型)
    */
   setBgcolor() {
     const self = this
     for (let i = 0; i < self.content.list.length; i++) {
        self.content.list[i].active = false
      }
     this.isSetBg = true
   },
    addTpl(type) {
      const self = this
      this.isSetBg = false
      for (let i = 0; i < self.content.list.length; i++) {
        self.content.list[i].active = false
      }
      const tpl_obj = {
        title: '',
        active: false, // 是否选中当前楼层（后台配置时使用，前端显示接口不使用）
        type: '', // 搜索栏：1，--  banner：2，--  公告：3，--  分类导航（一层5个）：4，--  图层（一层可1-4张）：5。（公告和搜索栏，这里只控制是否显示，展示功能前端自行实现，banner图样式自行实现）
        remarks: '',//活动备注
        sort: '',//排序
        isShow: 0,
        shops_list: [], // 推荐店铺列表
        bgurl:'',//背景图
        img_width: 0, // 显示宽度
        img_height: 0, // 显示高度
        goods_list:[],
        floor_data: [// 每层显示张数
          {
            good_info: {
              title:'',
            }, // 商品信息
            title: '设置标题', // 分类导航需要标题时使用（占不使用）
            img_url: '', // 显示图片
            img_width: 0, // 显示宽度
            img_height: 0, // 显示高度
            type: '', // 点击效果类型 ——  商品：1，-- 分类对应列表：2，-- 店铺：3，-- 热门商品列表：4，-- 新品推荐列表：5，-- 推荐店铺列表：6，-- 富文本：7，-- 外链：8，
            param: '', // 点击效果对应参数(热门商品列表：4，新品推荐列表：5，推荐店铺列表：6；没有参数)
            imgtit: ''
          }
        ]
      }
     if (type === 10) {
        // 四图
        tpl_obj.type = '10'
     
        tpl_obj.floor_data = [
         
        ];
         tpl_obj.moduleList = [
            {
              type:1,
              goods_list:[],
              image_data:[
                {
                  img_url:'',
                  type:'',
                  param:'',
                  img_width: 0, // 显示宽度
                  img_height: 0, // 显示高度
                  good_info:{
                    title:'',
                  }
                }
              ],//店铺信息
              floor_data: []
            }
          ]
      }
      
      self.content.list.push(tpl_obj)
      setTimeout(function() {
        self.content.list[self.content.list.length - 1].active = true
        const h = document.body.scrollHeight - 1400
        window.scrollTo(0, h)
      }, 300)
      
    },
    /**
     * 删除楼层
     * index(楼层索引)
    */
    delTpl(index) {
      const self = this
      // console.log(index)
      self.content.list.splice(index, 1)
    },
    /**
     * 删除图片
     * index(楼层索引)
    */
    delImg(index, index1) {
      const self = this
      self.content.list[index].goods_list.splice(index1, 1)
      // self.content.list[index].goods_list = []
      // for (let i = 0; i < self.content.list[index].floor_data.length; i++) {
      //   self.content.list[index].goods_list.push(self.content.list[index].floor_data[i].good_info.item_id)
      // }
    },
    delImg1(index, index1,index2) {
      const self = this
      self.content.list[index].moduleList[index1].floor_data.splice(index2, 1)

      self.content.list[index].moduleList[index1].goods_list = []
      for (let i = 0; i < self.content.list[index].moduleList[index1].floor_data.length; i++) {
        self.content.list[index].moduleList[index1].goods_list.push(self.content.list[index].moduleList[index1].floor_data[i].good_info.item_id)
      }
    },
    delImg2(index, index1,index2) {
      const self = this
      self.content.list[index].moduleList[index1].image_data.splice(index2, 1)

      self.content.list[index].moduleList[index1].goods_list = []
      for (let i = 0; i < self.content.list[index].moduleList[index1].image_data.length; i++) {
        self.content.list[index].moduleList[index1].goods_list.push(self.content.list[index].moduleList[index1].image_data[i].good_info.item_id)
      }
    },
    /**
     * 添加图片
     * index(楼层索引)
    */
    addImg(index, t) {
      // console.log(index,t)
      if (t != 10 && t != 17 && t != 19) {
        const self = this
        const obj = {
          good_info: {
            title:''
          }, // 商品信息
          title: '设置标题', // 分类导航需要标题时使用
          img_url: '', // 显示图片
          img_width: 0, // 显示宽度
          img_height: 0, // 显示高度
          type: '', // 点击效果类型 ——  商品：1，分类对应列表：2，店铺：3，热门商品列表：4，新品推荐列表：5，推荐店铺列表：6，富文本：7，外链：8，
          param: '' // 点击效果对应参数
        }
        self.content.list[index].floor_data.push(obj)
      } else { // 这是自定义商品
        this.theIndex = index
        this.theIndex1 = ''
        this.dialogTableVisible4 = true
        this.getAllGoods()
      }
    },
    addImg1(index,index1, t) {
      // console.log(index,index1,t)
      if (t != 3&&t != 19&&t !=22) {
        const self = this
        const obj = {
          good_info: {
            title:''
          }, // 商品信息
          title: '设置标题', // 分类导航需要标题时使用
          img_url: '', // 显示图片
          img_width: 0, // 显示宽度
          img_height: 0, // 显示高度
          type: '', // 点击效果类型 ——  商品：1，分类对应列表：2，店铺：3，热门商品列表：4，新品推荐列表：5，推荐店铺列表：6，富文本：7，外链：8，
          param: '' // 点击效果对应参数
        }
        self.content.list[index].moduleList[index1].floor_data.push(obj)
      } else { // 这是自定义商品
        this.theIndex = index
        this.theIndex1 = index1 // 公告里面的选中的商品
        // console.log(this.theIndex1)
        this.dialogTableVisible4 = true
        this.getAllGoods()
      }
    },

    addImg2(index,index1, t) {
      // console.log(index,index1,t)
      
      const self = this
      const obj = {
        good_info: {
          title:'',
        }, // 商品信息
        img_url: '', // 显示图片
        img_width: 0, // 显示宽度
        img_height: 0, // 显示高度
        type: '', // 点击效果类型 ——  商品：1，分类对应列表：2，店铺：3，热门商品列表：4，新品推荐列表：5，推荐店铺列表：6，富文本：7，外链：8，
        param: '' // 点击效果对应参数
      }
      self.content.list[index].moduleList[index1].image_data.push(obj)
     
    },

    allSelectOne(d) { // 一级分类选择
      console.log(d) // Allclass2
      this.Allclass2 = []
      this.inpclass2 = ''
      this.all_mcid = ''
      const self = this
      request({
        method: 'post',
        url: '/item/me-category-api/get-category-list',
        data: {
          shop_id: self.tplInfo.shop_id,
          pid: d
        }
      }).then(function(res) {
        self.Allclass2 = res.data.data
      }).catch(function(error) {
        console.log(error)
      })
    },
    // allSelectOne1(index) {
    //   console.log(111,index)
    //   console.log(122,this.class_name)

    //   const self = this
    //   self.class2List=[]
    //   request({
    //     method: 'post',
    //     url: '/item/me-category-api/get-category-list',
    //     data: {
    //       shop_id: self.tplInfo.shop_id,
    //       pid: self.class_name
    //     }
    //   }).then(function(res) {
    //     console.log(res)
    //     self.class2List = res.data.data
    //   }).catch(function(error) {
    //     console.log(error)
    //   })

    //   for(let i=0;i<this.classList.length;i++) {
    //     if(this.classList[i].mcid==this.class_name){
    //       this.content.list[index].moduleList.push(this.classList[i])
    //     }
    //   }
    //   this.class_name = ''
    //   console.log(this.content.list[index].moduleList)
    // },
    // 选择分类
    addCory(index,index1) {
      this.cory_index = index
      this.cory_index1 = index1
      this.iscoryShow = true
      this.select_type = '2'
      this.dialogTableVisible = true
    },
    // 删除分类
    delClassItem(index,index1) {
      // console.log(index,index1)
      this.content.list[index].moduleList.splice(index1,1)
      // console.log(this.content.list[index].moduleList)
    },

    allSelectTwo(d) { // 二级分类选择
      console.log(d)
      this.inpMcid = d
    },
    AllResat() {
      this.all_keyWord = ''
      this.inpclass1 = ''
      this.inpclass2 = ''
      this.all_mcid = ''
      this.inpItemId = ''
    },
    AllSearch() { // 搜索
      const self = this
      console.log(this.inpItemId)// 商品id
      console.log(this.all_keyWord)// 商品名字
      console.log(this.all_mcid)// 分类mcid
      // 清空一切数据，干干净净再来请求一次
      self.all_start = 0
      self.all_total = null
      self.all_showList = []
      // self.all_dataList=[];
      // self.all_idList=[];
      self.getAllGoods()
    },
    // 获取全部商品列表
    getAllGoods() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-api/index',
        data: {
          start_page: self.all_start,
          pages: 5,
          shop_id: self.tplInfo.shop_id == 0 ? '' : self.tplInfo.shop_id,
          key_word: self.all_keyWord,
          mcid: self.all_mcid,
          item_ids: (self.inpItemId * 1) ? [self.inpItemId] : ''
        }
      }).then(function(res) {
        // console.log(111,res)
        self.all_total = parseInt(res.data.data.total_pages)
        self.all_showList = res.data.data.list




        setTimeout(function() {
          self.markItem()
        }, 150)
      }).catch(function(error) {
        console.log(error)
      })
    },
    handleCurrentChange4(val) {
      const self = this
      self.all_start = (val - 1)
      self.getAllGoods()
    },
    AllsureSelect(item) {
      // console.log(item)
      this.all_dataList.push(item)
      this.all_idList.push(item.item_id)
      this.markItem()
      // console.log('已经选中的数据', this.all_dataList)
    },
    AllsureDelete(item) {
      // console.log(item)
      const self = this
      // 从我创建的目前选中的临时data中删除
      this.all_showList.forEach(function(v, i, a) {
        if (item.item_id == v.item_id) {
          self.$set(self.all_showList[i], 'select', 0)
        }
      })
      const newArr1 = []
      const newArr2 = []
      this.all_idList.forEach(function(v, i, a) {
        if (v != item.item_id) {
          newArr1.push(v)
        }
      })
      this.all_dataList.forEach(function(v, i, a) {
        if (v.item_id != item.item_id) {
          newArr2.push(v)
        }
      })
      this.all_idList = newArr1
      this.all_dataList = newArr2
      // console.log('已经选中的数据', this.all_dataList)

      // 从已经被保存好的以前的data中删除  因为不存在连续数据，用splice没事
      if(self.theIndex1==="") {
        self.content.list[self.theIndex].floor_data.forEach(function(v, i, a) {
          if (v.param == item.item_id) {
            self.content.list[self.theIndex].floor_data.splice(i, 1)
          }
        })
      }else {
        self.content.list[self.theIndex].moduleList[self.theIndex1].floor_data.forEach(function(v, i, a) {
          if (v.param == item.item_id) {
            self.content.list[self.theIndex].moduleList[self.theIndex1].floor_data.splice(i, 1)
          }
        })
      }
      
      this.markItem() // 完美
    },
    markItem() { // 根据all_idList给被选好的数据进行标记  还要根据已经被选好存在的 丧心病狂
      const self = this

      if(self.content.list[0].goods_list.length>0) {
        self.content.list[0].goods_list.forEach(function(val, item, arr) {
          self.all_showList.forEach(function(v, i, a) {
            if (val == v.item_id) { // 被展示的该商品是被选中的
              self.$set(self.all_showList[i], 'select', 1)
            }
          })
        })
      }
      
      // 根据我选好的
      this.all_idList.forEach(function(val, item, arr) {
        self.all_showList.forEach(function(v, i, a) {
          if (val == v.item_id) { // 被展示的该商品是被选中的
            self.$set(self.all_showList[i], 'select', 1)
          }
        })
      })
      // 根据已经存在的
      // console.log('已经存在的自定义商品', self.content.list[self.theIndex].floor_data)
      console.log(111,self.theIndex1)
      if(self.theIndex1==="") {
        self.content.list[self.theIndex].floor_data.forEach(function(val, item, index) {
          self.all_showList.forEach(function(v, i, a) {
            if (val.param == v.item_id) { // 被展示的该商品是被选中的
              self.$set(self.all_showList[i], 'select', 1)
            }
          })
        })
      }else {
        self.content.list[self.theIndex].moduleList[self.theIndex1].floor_data.forEach(function(val, item, index) {
          self.all_showList.forEach(function(v, i, a) {
            if (val.param == v.item_id) { // 被展示的该商品是被选中的
              self.$set(self.all_showList[i], 'select', 1)
            }
          })
        })
      }
      
    },

    SaveAllGoods() {
      const self = this
      const arr1 = []
      const obj = {
        good_info: {
          title: ''
        }, // 商品信息
        title: '设置标题', // 分类导航需要标题时使用
        img_url: '', // 显示图片
        img_width: 0, // 显示宽度
        img_height: 0, // 显示高度
        type: "无", //无 点击效果类型 ——  商品：1，分类对应列表：2，店铺：3，热门商品列表：4，新品推荐列表：5，推荐店铺列表：6，富文本：7，外链：8，
        param: '', // 点击效果对应参数
        imgtit: ''
      }
      self.all_dataList.forEach(function(val, ind, arr) {
        const ddd = JSON.stringify(obj)
        const obj2 = JSON.parse(ddd)
        arr1.push(obj2)
      })
      console.log('空数据的', arr1)
      self.all_dataList.forEach(function(val, ind, arr) {
        arr1[ind].param = val.item_id
        arr1[ind].good_info = val
      })
      console.log('有数据的', arr1)
      console.log('老数组', self.content.list[self.theIndex].floor_data)
      console.log(222,self.theIndex1)
      if(self.theIndex1==="") {
        arr1.forEach(function(v, i, a) {
          self.content.list[self.theIndex].floor_data.push(v)
        })
        console.log('保存拼接后的', self.content.list[self.theIndex].floor_data)
        for (let i = 0; i < arr1.length; i++) {
          self.content.list[self.theIndex].goods_list.push(arr1[i].good_info.item_id)
        }
      }else {
        console.log(2)
        arr1.forEach(function(v, i, a) {
          self.content.list[self.theIndex].moduleList[self.theIndex1].floor_data.push(v)
        })
        for (let i = 0; i < arr1.length; i++) {
          self.content.list[self.theIndex].moduleList[self.theIndex1].goods_list.push(arr1[i].good_info.item_id)
        }
      }
      
      
      // 删除data中数据。等等还需要判断刷新页面之后数据是否在之前已经被保存2333333
      // all_start:0, //起始页  以下数据专供自定义商品选择页面233333
      // theIndex:'',//属于楼层位置顺位
      // all_total:'',//全部页面
      // all_mcid:'', //品类id
      // all_keyWord:'', //搜索关键字
      // all_showList:'',  //展示用列表
      // all_dataList:[],  //选中的数据列表
      // all_idList:[],  //选中的id列表
      self.all_start = 0
      self.theIndex = ''
      self.all_total = null
      self.all_mcid = ''
      self.all_keyWord = ''
      self.all_showList = []
      self.all_dataList = []
      self.all_idList = []

      self.dialogTableVisible4 = false
    },
    /**
     * 图片下移
     * index(楼层索引)
    */
    downImg(index, index1) {
      // console.log(index,index1)
      const self = this
      if (index1 === (self.content.list[index].floor_data.length - 1)) {
        return
      }
      const obj = self.content.list[index].floor_data[index1]
      const obj1 = self.content.list[index].floor_data[index1 + 1]
      self.$set(self.content.list[index].floor_data, index1, obj1)
      self.$set(self.content.list[index].floor_data, (index1 + 1), obj)

      const dd1 = self.content.list[index].goods_list[index1]
      const dd2 = self.content.list[index].goods_list[index1 + 1]
      self.$set(self.content.list[index].goods_list, index1, dd2)
      self.$set(self.content.list[index].goods_list, (index1 + 1), dd1)
    },
    downImg1(index, index1,index2) {
      // console.log(index,index1)
      const self = this
      if (index2 === (self.content.list[index].moduleList[index1].floor_data.length - 1)) {
        return
      }
      const obj = self.content.list[index].moduleList[index1].floor_data[index2]
      const obj1 = self.content.list[index].moduleList[index1].floor_data[index2 + 1]
      self.$set(self.content.list[index].moduleList[index1].floor_data, index2, obj1)
      self.$set(self.content.list[index].moduleList[index1].floor_data, (index2 + 1), obj)

      const dd1 = self.content.list[index].moduleList[index1].goods_list[index2]
      const dd2 = self.content.list[index].moduleList[index1].goods_list[index2 + 1]
      self.$set(self.content.list[index].moduleList[index1].goods_list, index2, dd2)
      self.$set(self.content.list[index].moduleList[index1].goods_list, (index2 + 1), dd1)

    },
    downImg2(index, index1,index2) {
      // console.log(index,index1)
      const self = this
      if (index2 === (self.content.list[index].moduleList[index1].image_data.length - 1)) {
        return
      }
      const obj = self.content.list[index].moduleList[index1].image_data[index2]
      const obj1 = self.content.list[index].moduleList[index1].image_data[index2 + 1]
      self.$set(self.content.list[index].moduleList[index1].image_data, index2, obj1)
      self.$set(self.content.list[index].moduleList[index1].image_data, (index2 + 1), obj)

      const dd1 = self.content.list[index].moduleList[index1].goods_list[index2]
      const dd2 = self.content.list[index].moduleList[index1].goods_list[index2 + 1]
      self.$set(self.content.list[index].moduleList[index1].goods_list, index2, dd2)
      self.$set(self.content.list[index].moduleList[index1].goods_list, (index2 + 1), dd1)

    },
    setTime(index, index1) {
      const self = this
      const newDate = self.getNowDate()
      self.content.list[index].floor_data[index1].time = newDate
    },
    getNowDate() {
      const date = new Date()
      const seperator1 = '-'
      // const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentdate = month + seperator1 + strDate
      return currentdate
    },
    /**
     * 图片上移
     * index(楼层索引)
    */
    upImg(index, index1) {
      // console.log(index,index1)
      if (index1 === 0) {
        return
      }
      const self = this
      const obj = self.content.list[index].floor_data[index1]
      const obj1 = self.content.list[index].floor_data[index1 - 1]
      self.$set(self.content.list[index].floor_data, index1, obj1)
      self.$set(self.content.list[index].floor_data, (index1 - 1), obj)

      const dd1 = self.content.list[index].goods_list[index1]
      const dd2 = self.content.list[index].goods_list[index1 - 1]
      self.$set(self.content.list[index].goods_list, index1, dd2)
      self.$set(self.content.list[index].goods_list, (index1 - 1), dd1)
    },

     upImg1(index, index1,index2) {
      // console.log(index,index1)
      if (index2 === 0) {
        return
      }
      const self = this
      const obj = self.content.list[index].moduleList[index1].floor_data[index2]
      const obj1 = self.content.list[index].moduleList[index1].floor_data[index2 - 1]
      self.$set(self.content.list[index].moduleList[index1].floor_data, index2, obj1)
      self.$set(self.content.list[index].moduleList[index1].floor_data, (index2 - 1), obj)

      const dd1 = self.content.list[index].moduleList[index1].goods_list[index2]
      const dd2 = self.content.list[index].moduleList[index1].goods_list[index2 - 1]
      self.$set(self.content.list[index].moduleList[index1].goods_list, index2, dd2)
      self.$set(self.content.list[index].moduleList[index1].goods_list, (index2 - 1), dd1)
    },
    upImg2(index, index1,index2) {
      // console.log(index,index1)
      if (index2 === 0) {
        return
      }
      const self = this
      const obj = self.content.list[index].moduleList[index1].image_data[index2]
      const obj1 = self.content.list[index].moduleList[index1].image_data[index2 - 1]
      self.$set(self.content.list[index].moduleList[index1].image_data, index2, obj1)
      self.$set(self.content.list[index].moduleList[index1].image_data, (index2 - 1), obj)

      const dd1 = self.content.list[index].moduleList[index1].goods_list[index2]
      const dd2 = self.content.list[index].moduleList[index1].goods_list[index2 - 1]
      self.$set(self.content.list[index].moduleList[index1].goods_list, index2, dd2)
      self.$set(self.content.list[index].moduleList[index1].goods_list, (index2 - 1), dd1)
    },
    // 获取模板信息
    getTplInfo() {
      const self = this
      request({
        method: 'post',
        url: '/floor/floor-api/get-floor',
        data: {
          floor_id: self.floor_id
        }
      }).then(function(res) {
        self.tplInfo.title = res.data.data.title
        self.tplInfo.abstract = res.data.data.abstract
        self.tplInfo.content = res.data.data.content
        self.tplInfo.floor_id = res.data.data.id
        const bList = JSON.parse(res.data.data.content)
        // console.log(bList)
        // console.log(2222)
        if (bList.list) {
          for (let i = 0; i < bList.list.length; i++) {
            bList.list[i].active = false
          }
          self.content = bList
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    // 保存模板信息
    saveTplInfo() {
      const self = this
      var list=JSON.parse(JSON.stringify(self.content))
      for(let i=0;i<list.list.length;i++) {
        // if(list.list[i].type==19) {
          if(list.list[i].floor_data) {
            for(let m=0;m<list.list[i].floor_data.length;m++) {
              if(list.list[i].floor_data[m].good_info) {
                // console.log(1,list.list[i].floor_data[m].good_info)
                list.list[i].floor_data[m].good_info = {
                  title:list.list[i].floor_data[m].good_info.title,
                  img_url:list.list[i].floor_data[m].good_info.img_url,
                  item_id:list.list[i].floor_data[m].good_info.item_id,
                  price:list.list[i].floor_data[m].good_info.price,
                  shop_id:list.list[i].floor_data[m].good_info.shop_id
                }
              }
            }
          }
          if(list.list[i].moduleList) {
            for(let m=0;m<list.list[i].moduleList.length;m++) {
              if(list.list[i].moduleList[m].image_data) {
                for(let n=0;n<list.list[i].moduleList[m].image_data.length;n++) {
                  list.list[i].moduleList[m].image_data[n].good_info = {
                    title:list.list[i].moduleList[m].image_data[n].good_info.title,
                    img_url:list.list[i].moduleList[m].image_data[n].good_info.img_url,
                    item_id:list.list[i].moduleList[m].image_data[n].good_info.item_id,
                    price:list.list[i].moduleList[m].image_data[n].good_info.price,
                    shop_id:list.list[i].moduleList[m].image_data[n].good_info.shop_id
                  }
                }
                
              }
              if(list.list[i].moduleList[m].floor_data) {
                for(let n=0;n<list.list[i].moduleList[m].floor_data.length;n++) {
                  list.list[i].moduleList[m].floor_data[n].good_info = {
                    title:list.list[i].moduleList[m].floor_data[n].good_info.title,
                    img_url:list.list[i].moduleList[m].floor_data[n].good_info.img_url,
                    item_id:list.list[i].moduleList[m].floor_data[n].good_info.item_id,
                    price:list.list[i].moduleList[m].floor_data[n].good_info.price,
                    shop_id:list.list[i].moduleList[m].floor_data[n].good_info.shop_id
                  }
                }
                
              }
            }
          }
        // }
        
      }
      // console.log(23,list)
      // console.log(24,self.content)
      // console.log(25,JSON.stringify(list))
      self.tplInfo.content = JSON.stringify(list)
      let goods = list.list[0].goods_list.join(',')
      // console.log(goods)
      if (!self.tplInfo.content) {
        self.$message({
          type: 'info',
          message: '数据不能为空，会刷新页面重试!'
        })
        return
      }
      request({
        method: 'post',
        url: '/item/item-details-activity-list/save-activity-list',
        data: {
          id: self.id,
          banner_img: list.list[0].bgurl,
          activity_name: list.list[0].title,
          activity_remark: list.list[0].remarks,
          activity_goods: goods,
          jump_type: list.list[0].moduleList[0].image_data[0].type,
          jump_value: list.list[0].moduleList[0].image_data[0].param,
          is_show: list.list[0].isShow,
          sort: list.list[0].sort
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
    // 获取商品分类
    getClass1() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-category-api/index',
        data: {
          shop_id: 0
        }
      }).then(function(res) {
        self.class1 = res.data.data.list
        self.classList = res.data.data.list
        if (res.data.data.list.length > 0) {
          self.class1_act = res.data.data.list[0].mcid
        }
        self.class2 = []
        self.getClass2()
      }).catch(function(error) {
        console.log(error)
      })
    },
    selectClass1(item) {
      const self = this
      self.class1_act = item.mcid
      self.class2 = []
      self.goods = []
      self.getClass2()
    },
    // 获取商品2级分类
    getClass2() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-category-api/get-category-list',
        data: {
          shop_id: self.tplInfo.shop_id,
          pid: self.class1_act
        }
      }).then(function(res) {
        self.class2 = res.data.data
        self.class2_act = res.data.data[0].mcid
        self.getGoods()
      }).catch(function(error) {
        console.log(error)
      })
    },
    selectClass2(item) {
      const self = this
      self.start_page1 = 0
      self.key_word1 = ''
      if (this.select_type === '1') {
        self.class2_act = item.mcid
        self.goods = []
        self.getGoods()
      } else if (this.select_type === '2') {
        
        // 点击分类的 时候不让他自动替换
        // self.content.list[this.select_index].floor_data[this.select_index1].img_url = item.img_url
        if(self.iscoryShow) {
          // console.log(444)
          // console.log(111,this.cory_index,item)
          self.content.list[this.cory_index].moduleList[this.cory_index1].param=item.mcid
          self.iscoryShow = false
          self.cory_index = ''
          self.cory_index1 = ''
          self.select_type = 1
        }else {
          console.log(888,this.select_type)
          if(this.select_index2===""&&this.select_spindex2==="") {
            self.content.list[this.select_index].floor_data[this.select_index1].param = item.mcid
            self.content.list[this.select_index].floor_data[this.select_index1].title = item.name
          }else {
            if(this.select_spindex2==="") {
              self.content.list[this.select_index].moduleList[this.select_index1].image_data[this.select_index2].param = item.mcid
              self.content.list[this.select_index].moduleList[this.select_index1].image_data[this.select_index2].title = item.name
            }else {
              self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2].param = item.mcid
              self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2].title = item.name
            }
          }
          
        }
        self.select_index2 = ''
        self.select_spindex2 = ''
        self.dialogTableVisible = false

        
      }
    },
    // 获取商品列表
    getGoods() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-api/index',
        data: {
          start_page: self.start_page1,
          pages: 5,
          shop_id: self.tplInfo.shop_id,
          key_word: self.key_word1,
          mcid: self.class2_act
        }
      }).then(function(res) {
        self.total_pages1 = parseInt(res.data.data.total_pages)
        self.goods = res.data.data.list
      }).catch(function(error) {
        console.log(error)
      })
    },
    sureSelect(item) {
      const self = this
      // console.log(8888888888888, item)
      if(this.select_index2===""&&this.select_spindex2==="") {
        self.content.list[this.select_index].floor_data[this.select_index1].param = item.item_id
        self.content.list[this.select_index].floor_data[this.select_index1].good_info = item
        self.content.list[this.select_index].goods_list = []
        for (let i = 0; i < self.content.list[this.select_index].floor_data.length; i++) {
          self.content.list[this.select_index].goods_list.push(self.content.list[this.select_index].floor_data[i].good_info.item_id)
        }
      }else {
        // console.log(222222,this.select_spindex2)
        if(this.select_spindex2==="") {
          self.content.list[this.select_index].moduleList[this.select_index1].image_data[this.select_index2].param = item.item_id
          self.content.list[this.select_index].moduleList[this.select_index1].image_data[this.select_index2].good_info = item

          self.content.list[this.select_index].moduleList[this.select_index1].goods_list = []
          for (let i = 0; i < self.content.list[this.select_index].moduleList[this.select_index1].image_data.length; i++) {
            self.content.list[this.select_index].moduleList[this.select_index1].goods_list.push(self.content.list[this.select_index].moduleList[this.select_index1].image_data[i].good_info.item_id)
          }
        }else {
          // console.log(1111,item)
          // console.log(self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2])
          self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2].param = item.item_id
          self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2].good_info = item

          self.content.list[this.select_spindex].moduleList[this.select_spindex1].goods_list = []
          for (let i = 0; i < self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data.length; i++) {
            self.content.list[this.select_spindex].moduleList[this.select_spindex1].goods_list.push(self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[i].good_info.item_id)
          }
        }   
      }
      self.select_index2 = ''
      self.select_spindex2 = ''
      self.dialogTableVisible = false
    },
    sureSelectGift2(item) {
      const self = this
      // console.log(8888888888877, item)
      self.content.list[this.select_index].floor_data[this.select_index1].param = item.item_id
      self.content.list[this.select_index].floor_data[this.select_index1].good_info = item
      self.content.list[this.select_index].goods_list = []
      for (let i = 0; i < self.content.list[this.select_index].floor_data.length; i++) {
        self.content.list[this.select_index].goods_list.push(self.content.list[this.select_index].floor_data[i].good_info.item_id)
      }
      self.dialogTableVisible = false
    },
    
    handleCurrentChange1(val) {
      const self = this
      self.start_page1 = (val - 1)
      self.getGoods()
    },
    // 获取店铺列表
    getShops() {
      const self = this
      request({
        method: 'post',
        url: '/shop/shop-api/index',
        data: {
          start_page: self.start_page2,
          pages: 6,
          key_word: self.key_word2
        }
      }).then(function(res) {
        self.total_pages2 = parseInt(res.data.data.total_pages)
        self.shops = res.data.data.list
        console.log(111,self.shops)
      }).catch(function(error) {
        console.log(error)
      })
    },
    sureSelectShop(item) {
      const self = this
      if(this.select_index2===""&&this.select_spindex2==="") {
        self.content.list[this.select_index].floor_data[this.select_index1].param = item.id
      }else {
        console.log(123,item)
        if(this.select_spindex2==="") {
          self.content.list[this.select_index].moduleList[this.select_index1].image_data[this.select_index2].param = item.id
          self.content.list[this.select_index].moduleList[this.select_index1].image_data[this.select_index2].name = item.name
          self.content.list[this.select_index].moduleList[this.select_index1].image_data[this.select_index2].total_level = item.total_level
        }else {
          self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2].param = item.id
          self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2].name = item.name
          self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2].total_level = item.total_level
        }
      }
      self.select_index2 = ''
      self.select_spindex2 = ''
      self.dialogTable1Visible = false
    },
    handleCurrentChange2(val) {
      const self = this
      self.start_page2 = (val - 1)
      self.getShops()
    },
    // 获取店礼包列表
    getGift() {
      const self = this
      request({
        method: 'post',
        url: '/item/me-item-api/index',
        data: {
          'token': '',
          'start_page': self.start_page3,
          'pages': 6,
          'item_type': 4
        }
      }).then(function(res) {
        self.total_pages3 = parseInt(res.data.data.total_pages)
        self.gifts = res.data.data.list
        // console.log('gifts', self.shops)
      }).catch(function(error) {
        console.log(error)
      })
    },
    sureSelectGift(item) {
      console.log(777777,item)
      const self = this
      self.content.list[this.select_index].floor_data[this.select_index1].param = item.item_id
      self.content.list[this.select_index].floor_data[this.select_index1].good_info = item
      self.dialogTableVisible2 = false
    },
    handleCurrentChange3(val) {
      const self = this
      self.start_page3 = (val - 1)
      self.getGift()
    },
    // 获取楼层
    getfloor() {
      const self = this
      console.log(self.tplInfo.shop_id)
      request({
        method: 'post',
        url: '/floor/floor-api/get-use-position-list',
        data: {
          shop_id: self.tplInfo.shop_id
        }
      }).then(function(res) {
        self.floors = res.data.data
        console.log('floors', self.floors)
      }).catch(function(error) {
        console.log(error)
      })
    },
    sureSelectfloor(item) {
      const self = this
      if(this.select_index2===""&&this.select_spindex2==="") {
        self.content.list[this.select_index].floor_data[this.select_index1].param = item.position_code
      }else {
        if(this.select_spindex2==="") {
          self.content.list[this.select_index].moduleList[this.select_index1].image_data[this.select_index2].param = item.position_code
        }else {
          self.content.list[this.select_spindex].moduleList[this.select_spindex1].floor_data[this.select_spindex2].param = item.position_code
        }
      }
      self.select_index2 = ''
      self.select_spindex2 = ''
      self.dialogTableVisible3 = false
    }
    // handleCurrentChange3(val) {
    //   const self = this
    //   self.start_page3 = (val - 1)
    //   self.getGift()
    // },
  }

}
</script>
<style lang="scss">
.index-tpl2 {
  width: 100%;
  padding: 0px;
  // margin-bottom: 500px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .f-tools{
    position: fixed;
    bottom:0;
    top:0;
    right:0px;
    width:140px;
    background-color: #f7f7f7;
    z-index: 10;
    padding: 0px;
    box-sizing: border-box;
    box-shadow: 0 0 9px 0 rgba(0,0,0,.4);
    height: 100%;
    overflow-y: auto;
    .tool-box{
      line-height: 36px;
      .tool-item{
        padding: 0 5px;
      }
    }
  }
  .tpl-column1 {
    width: 100%;
    // min-height: 570px;
    // border: solid 1px #999999;
    // height: auto;
    // background-color: #f0f0f0;
    // overflow: hidden;
    .tpl-column-header {
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0 20px;
      text-align: center;
      background: #333333;
      display: flex;
      color: #fff;
    }

    .tpl-column-content {
      
      .tpl-item {
        cursor: pointer;
        width: 100%;
        position: relative;
        min-height: 40px;
        height: auto;
        // background-color: #fff;
        text-align: left;
        line-height: 44px;
        box-sizing: border-box;
        .tpl-item-box{
          display: block;
          box-sizing: border-box;
          .tpl-item-box1{
            display: flex;
            box-sizing: border-box;
            .item-box-item{
              flex:1;
              span{
                padding: 2px 10px;
                border-radius: 12px;
                background-color: rgba(0, 0, 0, .8);
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                z-index: 99;
                line-height: 1.4;
              }
              img{
                width: 100%;
                display: block;
              }
              .no-img{
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                width: 100%;
                border: 1px dashed rgb(110, 109, 108);
                text-align: center;
                // background-color: #7ac0e0;
                color: #ffffff;
                &.hot-goods{
                  height: 200px;
                  background-image:url('../../assets/screenshot/hot.png');
                }
                &.new-goods{
                  height: 200px;
                  background-image:url('../../assets/screenshot/new.png');
                }
                &.spike{
                  height: 240px;
                  background-image:url('../../assets/screenshot/spike.png');
                }
                &.spike1{
                  height: 240px;
                  background-image:url('../../assets/screenshot/spike2.png');
                }
                &.spike2{
                  height: 240px;
                  background-image:url('../../assets/screenshot/spike1.png');
                }
                &.spike3{
                  height: 240px;
                  background-image:url('../../assets/screenshot/spike3.png');
                }
                &.notice{
                  height: 40px;
                  background-image:url('../../assets/screenshot/notice.png');
                }
                &.shop{
                  height: 250px;
                  background-image:url('../../assets/screenshot/shop.png');
                }
                &.vae{
                  height: 200px;
                  background-image:url('../../assets/screenshot/vae.png');
                }
                &.vae2{
                  height: 200px;
                  background-image:url('../../assets/screenshot/vae2.png');
                }
                &.coupon{
                  height: 50px;
                  background-image:url('../../assets/screenshot/coupon.png');
                }
              }
              .item-box-item__mask{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,.4);
                z-index: 10;
              }
              .search-bar{
                display: flex;
                line-height: 34px;
                padding: 5px 10px;
                .el-input--medium .el-input__inner {
                    border-radius: 18px;
                    opacity: 0.6;
                }
              }
            }
          }
          .tpl-item-box2{
            overflow: hidden;
            box-sizing: border-box;
            background-color: #ffffff;
            padding: 5px;
            .item-box-item{
              width: 25%;
              padding: 4px;
              text-align: center;
              float: left;
              img{
                width: 40px;
                height: 40px;
                margin: 0 auto;
                border-radius: 20px;
                display: block;
              }
              .c-text{
                line-height: 22px;
                color: #1F1F1E;
                text-align: center;
                font-weight:300;
                font-size:12px;
              }
              .no-img{
                width: 100%;
                line-height: 44px;
                border: 1px dashed rgb(110, 109, 108);
                text-align: center;
                background-color: #7ac0e0;
                color: #ffffff;
              }
              .search-bar{
                display: flex;
                line-height: 34px;
                padding: 5px 10px;
                .el-input--medium .el-input__inner {
                    border-radius: 18px;
                    opacity: 0.6;
                }
              }
            }
          }
          .tpl-item-box3{
            overflow: hidden;
            box-sizing: border-box;
            background-color: #ffffff;
            padding: 5px;
            display: flex;
            width: 1000px;
            .item-box-item{
              width: 90px;
              padding: 4px;
              text-align: center;
              img{
                width: 40px;
                height: 40px;
                margin: 0 auto;
                border-radius: 20px;
                display: block;
              }
              .c-text{
                line-height: 22px;
                color: #1F1F1E;
                text-align: center;
                font-weight:300;
                font-size:12px;
              }
              .no-img{
                width: 100%;
                line-height: 44px;
                border: 1px dashed rgb(110, 109, 108);
                text-align: center;
                background-color: #7ac0e0;
                color: #ffffff;
              }
              .search-bar{
                display: flex;
                line-height: 34px;
                padding: 5px 10px;
                .el-input--medium .el-input__inner {
                    border-radius: 18px;
                    opacity: 0.6;
                }
              }
            }
          }

        }
        .box-tool{
          position: absolute;
          display: none;
          top:0;
          left:0;
          width: 100%;
          height: 100%;
          border: 2px dashed #fa0;
          z-index: 2000;
          .box-tool-panel{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            font-size: 12px;
            position: relative;
            .floor-del{
              position: absolute;
              text-align: center;
              bottom: 5px;
              right:5px;
              width: 40px;
              height: 25px;
              box-sizing: border-box;
              line-height: 25px;
              background: rgba(0,0,0,.4);
              color: #fff;
            }
            .floor-edit{
              position: absolute;
              text-align: center;
              bottom: 5px;
              right:5px;
              width: 40px;
              height: 25px;
              box-sizing: border-box;
              line-height: 25px;
              background: rgba(0,0,0,.4);
              color: #fff;
            }
          }
        }
        .f-block{
          display: block;
        }
      }
      .tpl-item:hover{
          .box-tool{
            display: block;
          }
      }

    }
  }
}
.panel-close{
  position: absolute;
  right: 5px;
  top: 5px;
}
.qunju-bg {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  width: 660px;
  border: 1px solid #ebeef5;
  margin: 40px 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.qjt {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.bg-hx {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.edit-panel1{
  padding: 10px;
  position: relative;
  cursor: pointer;
  .one-row1{
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    .one-roe-title {
      font-size: 34px;
      line-height: 2;
    }
    .row-col{
      flex: 1;
      display: flex;
      padding: 0 10px 0 0;
      line-height: 32px;
      align-items: center;
      .col-label{
        padding-right: 15px;
      }
    }
  }
  .two-row{
    padding: 0;
    max-height: 500px;
    overflow-y: auto;
    max-width: 805px;
    .two-row-item{
      border: solid 1px #dddddd;
      border-radius: 4px;
      margin-bottom: 5px;
      position: relative;
      min-height: 40px;
      padding-left: 10px;
      // min-width: 150px;
      .item-btns{
        position: absolute;
        z-index: 10;
        right: 0;
        top:0;
        width: 60px;
        text-align: right;
        padding: 5px;
        box-sizing: border-box;
      }
      .item-content{
        display: flex;
        padding: 5px;
        overflow: hidden;
        .img-box{
          width: 100px;
          height: 100px;
          margin-right: 10px;
        }
        .data-box{
          flex: 1;
          min-height: 80px;
        }
      }
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .el-carousel{
    width: 100%;
  }

.el-carousel__item--card {
    width: 86%;
    left:-18%;
    -webkit-transition: -webkit-transform .4s ease-in-out;
    transition: -webkit-transform .4s ease-in-out;
    transition: transform .4s ease-in-out;
    transition: transform .4s ease-in-out, -webkit-transform .4s ease-in-out;
    transition: transform .4s ease-in-out,-webkit-transform .4s ease-in-out;
}
.el-dialog__body{
  padding: 0;
  border: solid 1px #f1f1f1;
  min-height: 400px;
}
.el-radio--mini.is-bordered {
    padding: 6px 3px 0 3px;
    border-radius: 3px;
    height: 28px;
}
.el-radio__label {
    padding-left: 3px;
}
.el-popover {
    padding: 3px;
    position: relative;
}
</style>

