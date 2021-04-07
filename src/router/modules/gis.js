import Layout from '@/views/layout/index.vue'
const gisRouter = {
    path: '/gis',
    component: Layout,
    redirect: '/gis/demo1',
    name: 'gis',
    meta: {
        title: 'GISvue版',
    },
    children: [
        {
            path: 'demo1',
            component: () => import('@/views/gis/demo1'),
            name: 'demo1',
            meta: {
                title: '第一个demo'
            }
        },
        {
            path: 'demo2',
            component: () => import('@/views/gis/demo2'),
            name: 'demo2',
            meta: {
                title: '第二个demo'
            }
        },
        {
            path: 'demo3',
            component: () => import('@/views/gis/demo3'),
            name: 'demo3',
            meta: {
                title: '第三个demo'
            }
        },
        {
            path: 'planePostition',
            component: () => import('@/views/gis/planePosition'),
            name: 'planePostition',
            meta: {
                title: '机坪监控'
            }
        },
        {
            path: 'measure',
            component: () => import('@/views/gis/measure'),
            name: 'measure',
            meta: {
                title: '测距'
            }
        },
        {
            path: 'replay',
            component: () => import('@/views/gis/replay'),
            name: 'replay',
            meta: {
                title: '轨迹回放'
            }
        }

    ]
}
export default gisRouter