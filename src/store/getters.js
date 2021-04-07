//state中需要加工返回的数据
//组件中调用this.$store.getters.author
const getters={
    author:state=>state.demo.author
}
export default getters