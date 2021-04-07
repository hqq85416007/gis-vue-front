import Layout from '@/views/layout/index.vue'
const selfRouter = {
    path: '/self',
    component: Layout,
    redirect: '/self/form',
    name: 'self',
    meta: {
        title: '手工DEMO',
    },
    children: [
        {
            path: 'form',
            component: () => import('@/views/self/form'),
            name: 'form',
            meta: {
                title: '表单'
            }
        },
        {
            path: 'transformCoordinateSystem',
            component: () => import('@/views/self/transformCoordinateSystem'),
            name: 'transformCoordinateSystem',
            meta: {
                title: '坐标系转换'
            }
        },
    ]
}
export default selfRouter