<template>
  <el-select v-model="selectValue" placeholder="请选择" @change="retSelectValue" size="mini">
    <el-option 
    v-for="item in list"
    :key="item.dictionaryCode"
    :label="item.dictionaryName"
    :value="item.dictionaryCode">
    </el-option>
  </el-select>
</template>
<script>
import request from '@/utils/request'
export default {
  name:'codelist',
  data(){
    return{
      list:[],
      selectValue:this.init,
      innerCode:this.code,
      innnerData:this.data,
      api:this.apiUrl
    }

  },
  props:{
    code:{
      required:false,
      type:String
    },
    init:{
      required:false,
      type:String,
      default:undefined
    },
    data:{
      required:false,
      type:Array
   },
   apiUrl:{
      required:false,
      type:String,
      default:'/dictionary/getDicInfoByType'
   }
  },
  methods:{
    loadBizCode(){
      if(this.innnerData){
        this.list=this.innnerData
      }else{
        request({
          url:this.api,
          methods:'GET',
          params:{
          dictype:this.innerCode
         }
        }).then(res=>{
          this.list=res.data
        })
      }
    },
    retSelectValue(){
      this.$emit('select',this.selectValue)
    }
  },
  watch:{
    init(val){
      this.selectValue=val;
    }
  },
  created(){
    this.loadBizCode()
  }
}
</script>
<style scoped>

</style>