import { parseRoutes } from '@/commons/route.js'

// Layout Components
import MainLayout from '@/layouts/MainLayout'

// Module Components
import Home from '@/modules/task/Home'
import Detail from '@/modules/task/Detail'
import Document from '@/modules/task/Document'

export default parseRoutes([
  {
    path: '/task',
    redirect: '/task/home',
    children: [
      {
        path: '/task/home',
        layout: MainLayout,
        component: Home,
      },
      {
        path: '/task/detail/:id',
        layout: MainLayout,
        component: Detail,
      },
      {
        path: '/task/document/:id',
        layout: MainLayout,
        component: Document,
      }
    ]
  },
])