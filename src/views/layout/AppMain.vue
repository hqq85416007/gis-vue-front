<template>
    <section class="app-main" style="height:100%">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view :key="key"/>
            </keep-alive>
        </transition>
    </section>
</template>
<script>
export default {
    name:'AppMain',
    data(){
        return {
            cachedViews:[]
        }
    },
    computed:{
        key(){
            return this.$route.path
        }
    }
}
</script>
<style scoped>

</style>