/*
 * @Author: 晴天
 * @Date: 2024-02-21 14:30:23
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-27 08:36:01
 * @FilePath: \pet-frontend\src\router\index.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */
import lazyLoad from '@/components/LazyLoad'
import Layout from '@/layout/Layout'
import Layout2 from '@/views/front/layout'
import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

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
      title: '测试'
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
          icon: <HomeOutlinedIcon />
        }
      },
      {
        path: 'interface',
        element: lazyLoad(lazy(() => import('@/views/interfaceDemo'))),
        meta: {
          title: '接口测试',
          icon: <HomeOutlinedIcon />
        }
      }
    ]
  },
  {
    path: '/auth-page',
    element: <Layout />,
    meta: {
      title: '登录注册'
    },
    children: [
      {
        path: 'register',
        element: lazyLoad(lazy(() => import('@/views/auth-page/register'))),
        meta: {
          title: '注册',
          icon: <HomeOutlinedIcon />
        }
      },
      {
        path: 'login',
        element: lazyLoad(lazy(() => import('@/views/auth-page/login'))),
        meta: {
          title: '登录',
          icon: <HomeOutlinedIcon />
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <Layout />,
    meta: {
      title: '权限管理',
      icon: <HomeOutlinedIcon />
    },
    children: [
      {
        path: 'user',
        element: lazyLoad(lazy(() => import('@/views/auth/user'))),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'role',
        element: lazyLoad(lazy(() => import('@/views/auth/role'))),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'permission',
        element: lazyLoad(lazy(() => import('@/views/auth/permission'))),
        meta: {
          title: '权限管理'
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
