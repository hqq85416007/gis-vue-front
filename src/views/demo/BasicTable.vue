<template>
  <div class="hello">
    <h1>element-ui表格</h1>
    <el-row class="table-grid-content">
      <el-col :span="18" class="grid">
        <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="3" class="grid" :gutter="1">
        <el-button type="success" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="2" class="grid" :gutter="15">
        <el-button type="primary" @click="addMembers()">增加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :stripe="true"
      :data="tables.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      :border="true"
      width="100%"
      size="mini"
    >
      <el-table-column sortable label="日期" prop="date"></el-table-column>
      <el-table-column sortable label="姓名" prop="name"></el-table-column>
      <el-table-column sortable label="地址" prop="address"></el-table-column>
      <el-table-column sortable label="区域" prop="region"></el-table-column>
      <el-table-column sortable label="即时配送" prop="delivery"></el-table-column>
      <el-table-column sortable label="活动性质" prop="type"></el-table-column>
      <el-table-column sortable label="性别" prop="resource"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" @click="modifyData(scope.$index, scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteData(scope.$index,tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1,5,10,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>

    <!-- 修改弹框 -->
    <el-dialog :visible.sync="centerDialogVisible">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="日期" :picker-options="pickerOptions">
          <el-date-picker
            v-model="editForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="editForm.region" placeholder="请选择区域">
            <el-option label="上海" value="上海"></el-option>
            <el-option label="北京" value="北京"></el-option>
            <el-option label="南京" value="南京"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="editForm.delivery" active-value="是" inactive-value="否"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="editForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="sumbitEditRow()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 新增弹框 -->
    <el-dialog :visible.sync="isAddMembers">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="日期" :picker-options="pickerOptions">
          <el-date-picker
            v-model="addForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>

        <el-form-item label="区域">
          <el-select v-model="addForm.region" placeholder="请选择区域">
            <el-option label="上海" value="上海"></el-option>
            <el-option label="北京" value="北京"></el-option>
            <el-option label="南京" value="南京"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="addForm.delivery" active-value="是" inactive-value="否"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="addForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align:center"> 
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="sumbitAddRow()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserData } from "@/api/demo/demo.js";
//_index 删除
//搜索框命名
//搜索参数 放在对象
var _index;
export default {
  name: "BasicTable",
  data() {
    return {
      centerDialogVisible: false,
      isAddMembers: false,
      editForm: [],
      addForm: [],
      searchData: "",
      query: {},
      input: "",
      id: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableData: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5 // 每页的数据条数
    };
  },
  methods: {
    deleteData(index, row) {
      this.tableData.splice(index, 1);
      console.log("进行了删除操作");
      console.log("index的值是：" + index);
      console.log("row的值是：", row);
    },
    modifyData(index, row) {
      this.centerDialogVisible = true;
      this.editForm = Object.assign({}, row); //重置对象
      _index = index;
      console.log("index的值：" + index);
      console.log("_index的值：" + _index);
      console.log("row的值是：", this.editForm); //代表选择的这一行的数据
    },
    sumbitEditRow() {
      var editData = _index;
      console.log("editData的值" + this.editForm);
      this.tableData[editData].name = this.editForm.name;
      this.tableData[editData].date = this.editForm.date;
      this.tableData[editData].address = this.editForm.address;
      this.tableData[editData].region = this.editForm.region;
      this.tableData[editData].delivery = this.editForm.delivery;
      this.tableData[editData].type = this.editForm.type;
      this.tableData[editData].resource = this.editForm.resource;
      this.centerDialogVisible = false;
      console.log("数据：" + this.editForm.date);
      console.log("对象数组", this.tableData);
    },
    closeDialog() {
      this.centerDialogVisible = false;
      this.isAddMembers = false;
      console.log("editfrom", this.editForm);
      console.log("addfrom", this.addForm);
    },
    addMembers() {
      this.isAddMembers = true;
      this.addForm = {
        name: "",
        date: "",
        address: "",
        region: "",
        delivery: "",
        type: [],
        resource: ""
      };
    },
    sumbitAddRow() {
      this.tableData = this.tableData || [];
      console.log("表格是:" + this.tableData);
      this.tableData.push({
        name: this.addForm.name,
        date: this.addForm.date,
        address: this.addForm.address,
        region: this.addForm.region,
        delivery: this.addForm.delivery,
        type: this.addForm.type,
        resource: this.addForm.resource
      });
      this.isAddMembers = false;
      console.log("新增的日期：" + this.addForm.date);
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    queryData() {
      getUserData(this.query).then(res => {
        this.tableData = res.data;
        console.log(this.tableData)
      });
    }
  },
  computed: {
    tables() {
      const input = this.input;
      if (input) {
        console.log("input输入的搜索内容：" + this.input);
        return this.tableData.filter(data => {
          console.log("object:" + Object.keys(data));
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(input) > -1
            );
          });
        });
      }
      return this.tableData;
    }
  },
  mounted() {
    this.queryData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-grid-content {
  border-radius: 4px;
  height: 50 px;
  background: #ebeef5;
  padding: 10px;
}
</style>
