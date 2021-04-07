<template>
    <div class="util">
        <h1>平台工具类使用</h1>
        <p>平台工具类统一放在src/utils下面</p>
        <pre>
        <xmp>
            使用方式举例：
            import {parseTime} from '@/utils/common'
            export default{
                methods:{
                    test(){
                        parseTime(new Date(),'yyyy-MM-dd')
                    }
                }
            }
        </xmp>
        </pre>
    </div>
</template>
<script>
export default {
    name:'util'
}
</script>
<style scoped>
</style>