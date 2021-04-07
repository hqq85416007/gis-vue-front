//数据源
const state={
    author:'zyw'
}
//state成员操作
//组件中调用this.$store.commit('edit','name')
const mutations={
    edit(state,name){
        state.author=name
    }

}
//异步操作ajax请求之类的操作
//组件中调用this.$store.dispatch('aEdit','zhan')
const actions={
    aEdit({commit},name){
        setTimeout(()=>{
            commit('edit',name)
        },2000)
    }
}
export default{
    namespaced:true,
    state,
    mutations,
    actions
}