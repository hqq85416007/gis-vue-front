import Layout from '@/views/layout/index.vue'

const carRouter = {
    path: '/car',
    component: Layout,
    redirect: '/car/MonitorHome',
    name: 'car',
    meta: {
        title: '车辆监视',
    },
    children: [
        {
            path: 'MonitorHome',
            component: () => import('@/views/car/MonitorHome'),
            name: 'MonitorHome',
            meta: {
                title: '监视主页'
            }
        },]
}
export default carRouter;