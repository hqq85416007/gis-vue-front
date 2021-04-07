<template>
  <el-dialog
    title="电子围栏详情"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" label-width="130px" size="mini">
      <el-form-item label="标绘类型" prop="plottype">
        <el-radio label="1" v-model="form.plottype">多边形</el-radio>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" maxlength="40"></el-input>
      </el-form-item>
      <!-- <el-form-item label="类型" prop="type" v-if="false">
        <codelist :code="codeList.type" :apiUrl="DateUrl" k="id" l="text" v-model="form.type"></codelist>
      </el-form-item>-->
      <!-- <el-form-item label="适用车辆" prop="cartypes" v-if="false">
        <codelist
          :code="codeList.cartypes"
          :apiUrl="DateUrl"
          multiple
          k="id"
          l="text"
          @select="carChange"
          v-model="form.cartypes"
        ></codelist>
      </el-form-item>-->
      <el-form-item label="生效开始日期" prop="startdate">
        <el-date-picker v-model="form.startdate" type="date" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="生效结束日期" prop="enddate">
        <el-date-picker v-model="form.enddate" type="date" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="生效开始时间" prop="starttime">
        <el-time-picker
          v-model="form.starttime"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          placeholder="选择开始时间"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="生效结束时间" prop="endtime">
        <el-time-picker
          v-model="form.endtime"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          placeholder="选择结束时间"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="速度范围" prop="rulespec">
        <el-input v-model="form.rulespec" placeholder="km/h"></el-input>
      </el-form-item>
      <!-- <el-form-item label="排除车辆" prop="removeCar">
        <el-cascader
          :options="orgIdOptions"
          clearable
          v-model="form.removeCar"
          :props="{checkStrictly: true,value:'id',label:'name'}"
        ></el-cascader>
      </el-form-item>-->
      <!--<el-form-item label="通知人员" prop="noticeObj" v-if="false">
        <el-cascader
          :options="driverOptions"
          clearable
          @change="handleChange"
          @focus="focusChange"
          v-model="searchForm.noticeObj"
          :props="{checkStrictly: true,value:'id',label:'name'}"
        ></el-cascader>
      </el-form-item>-->
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      form: {
        plottype: "",
        name: "",
        startdate: "",
        enddate: "",
        starttime: "",
        endtime: "",
        rulespec: ""
      }
    };
  },
  props: {
    dialogFenceFormVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClose() {
      this.$emit("handleFenceFormVisible", { dialogFenceFormVisible: false });
    },
    setFormData(val) {
      this.form = { ...val };
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogFenceFormVisible;
      },
      set() {}
    }
  }
};
</script>
