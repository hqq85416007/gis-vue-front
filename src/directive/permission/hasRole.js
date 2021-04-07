const roles=['admin','guest']
function hasRole(el,binding){
    const {value}=binding
    if(value &&value instanceof Array){
        const permRoles=value
        if(value.length>0){
            const hasRoleFlag=roles.some(role=>{
                return permRoles.includes(role) 
            })
            if(!hasRoleFlag){
                el.parentNode &&el.parentNode.removeChild(el)
            }
        }
    }else{
        throw new Error(`v-hasRole指令需要传递角色数组，例如v-hasRole="['admin']"'`)
    }
}
export default{
    inserted(el,binding){
        hasRole(el,binding)
    },
    update(el,binding){
        hasRole(el,binding)
    }
}