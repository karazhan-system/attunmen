import { parseRoutes } from '@/commons/route.js'

// Layout Components
import MainLayout from '@/layouts/MainLayout'

// Module Components
import Home from './Home'

export default parseRoutes([
  {
    path: '/rule',
    redirect: '/rule/home',
    children: [
      {
        path: '/rule/home',
        layout: MainLayout,
        component: Home,
      }
    ]
  },
])