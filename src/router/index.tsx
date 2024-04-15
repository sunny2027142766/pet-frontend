import lazyLoad from '@/components/LazyLoad'
import Layout from '@/layout/Layout'
import Layout2 from '@/views/front/layout'
import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined' // 首页
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip' // 权限管理
import WebIcon from '@mui/icons-material/Web' // 登录注册界面
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import BugReportIcon from '@mui/icons-material/BugReport' // 测试
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation'
import ApiIcon from '@mui/icons-material/Api'
import Face6Icon from '@mui/icons-material/Face6'
import PeopleIcon from '@mui/icons-material/People'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'

// eslint-disable-next-line react-refresh/only-export-components
export const rootRouter = [
  {
    path: '/',
    element: <Navigate to="/front" />
  },
  {
    path: '/login',
    element: lazyLoad(lazy(() => import('@/views/auth-page/login'))),
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login'
    }
  },
  {
    path: '/front',
    element: <Layout2 />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />
      },
      {
        path: 'home',
        element: lazyLoad(lazy(() => import('@/views/front/home'))),
        meta: {
          requiresAuth: false,
          title: '首页',
          key: 'front'
        }
      },
      {
        path: 'interaction',
        element: lazyLoad(lazy(() => import('@/views/front/interaction'))),
        meta: {
          requiresAuth: false,
          title: '宠物互动',
          key: 'interaction'
        }
      },
      {
        path: 'show',
        element: lazyLoad(lazy(() => import('@/views/front/show'))),
        meta: {
          requiresAuth: false,
          title: '宠物展示',
          key: 'show'
        }
      },
      {
        path: 'archive',
        element: lazyLoad(lazy(() => import('@/views/front/archive'))),
        meta: {
          requiresAuth: false,
          title: '档案馆',
          key: 'archive'
        }
      },
      {
        path: 'community',
        element: lazyLoad(lazy(() => import('@/views/front/community'))),
        meta: {
          requiresAuth: false,
          title: '社区',
          key: 'community'
        }
      },
      {
        path: 'emotion',
        element: lazyLoad(lazy(() => import('@/views/front/emotion'))),
        meta: {
          requiresAuth: false,
          title: '情感互动',
          key: 'emotion'
        }
      }
    ]
  },
  {
    path: '/register',
    element: lazyLoad(lazy(() => import('@/views/auth-page/register'))),
    meta: {
      requiresAuth: false,
      title: '注册页',
      key: 'register'
    }
  },
  {
    path: '/dashboard',
    element: <Layout />,
    meta: {
      title: '控制台',
      icon: <HomeOutlinedIcon />
    },
    children: [
      {
        path: '',
        element: lazyLoad(lazy(() => import('@/views/dashboard')))
      }
    ]
  },
  {
    path: '/test',
    element: <Layout />,
    meta: {
      title: '测试',
      icon: <BugReportIcon />
    },
    children: [
      {
        path: 'dashboard',
        element: lazyLoad(lazy(() => import('@/views/dashboard'))),
        meta: {
          title: '首页',
          icon: <HomeOutlinedIcon />
        }
      },
      {
        path: '3D',
        element: lazyLoad(lazy(() => import('@/views/test'))),
        meta: {
          title: '3D测试',
          icon: <ThreeDRotationIcon />
        }
      },
      {
        path: 'interface',
        element: lazyLoad(lazy(() => import('@/views/interfaceDemo'))),
        meta: {
          title: '接口测试',
          icon: <ApiIcon />
        }
      }
    ]
  },
  {
    path: '/auth-page',
    element: <Layout />,
    meta: {
      title: '页面',
      icon: <WebIcon />
    },
    children: [
      {
        path: 'register',
        element: lazyLoad(lazy(() => import('@/views/auth-page/register'))),
        meta: {
          title: '注册',
          icon: <HowToRegIcon />
        }
      },
      {
        path: 'login',
        element: lazyLoad(lazy(() => import('@/views/auth-page/login'))),
        meta: {
          title: '登录',
          icon: <LoginIcon />
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <Layout />,
    meta: {
      title: '权限管理',
      icon: <PrivacyTipIcon />
    },
    children: [
      {
        path: 'user',
        element: lazyLoad(lazy(() => import('@/views/auth/user'))),
        meta: {
          title: '用户管理',
          icon: <Face6Icon />
        }
      },
      {
        path: 'role',
        element: lazyLoad(lazy(() => import('@/views/auth/role'))),
        meta: {
          title: '角色管理',
          icon: <PeopleIcon />
        }
      },
      {
        path: 'permission',
        element: lazyLoad(lazy(() => import('@/views/auth/permission'))),
        meta: {
          title: '权限管理',
          icon: <PermIdentityIcon />
        }
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  },
  {
    path: '/404',
    element: lazyLoad(lazy(() => import('@/views/notFound')))
  }
]

const Router = () => {
  const routes = useRoutes(rootRouter as any)
  return routes
}

export default Router
