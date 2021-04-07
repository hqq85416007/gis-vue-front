import Layout from '@/views/layout/index.vue'
const opPlanRouter = {
    path: '/operationalPlanManage',
    component: Layout,
    redirect: '/operationalPlanManage/operationalPlan',
    name: 'operationalPlanManage',
    meta: {
        title: '营运计划管理',
    },
    children: [
        {
            path: 'operationalPlan',
            component: () => import('@/views/operationalPlanManage/operationalPlan'),
            name: 'operationalPlan',
            meta: {
                title: '营运计划管理'
            }
        },
        {
            path: 'shortPlanGenerate',
            component: () => import('@/views/operationalPlanManage/shortPlanGenerate'),
            name: 'shortPlanGenerate',
            meta: {
                title: '短期计划生成'
            }
        },
        {
            path: 'nextdayPlanGenerate',
            component: () => import('@/views/operationalPlanManage/nextdayPlanGenerate'),
            name: 'nextdayPlanGenerate',
            meta: {
                title: '次日计划生成'
            }
        },
        
        // {
        //     path: '',
        //     component: () => import('@/views/operationalPlanManage/'),
        //     name: '',
        //     meta: {
        //         title: '计划连班管理'
        //     }
        // },

    ]
}
export default opPlanRouter
