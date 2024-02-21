/*
 * @Author: 晴天
 * @Date: 2024-02-21 14:30:23
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-21 15:19:59
 * @FilePath: \pet-frontend\src\router\index.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */
import lazyLoad from '@/components/LazyLoad'
import Layout from '@/layout/Layout'
import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

const rootRouter = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: lazyLoad(lazy(() => import('@/views/login'))),
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login'
    }
  },
  {
    path: '/register',
    element: lazyLoad(lazy(() => import('@/views/register'))),
    meta: {
      requiresAuth: false,
      title: '注册页',
      key: 'register'
    }
  },
  {
    element: <Layout />,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/dashboard',
        element: lazyLoad(lazy(() => import('@/views/dashboard'))),
        meta: {
          title: '首页',
          icon: <HomeOutlinedIcon />
        }
      },
      {
        path: '/test',
        element: lazyLoad(lazy(() => import('@/views/test'))),
        meta: {
          title: '测试',
          icon: <HomeOutlinedIcon />
        }
      },
      {
        path: '/interface',
        element: lazyLoad(lazy(() => import('@/views/interfaceDemo'))),
        meta: {
          title: '接口',
          icon: <HomeOutlinedIcon />
        }
      },
      {
        path: '/register/inner',
        element: lazyLoad(lazy(() => import('@/views/register'))),
        meta: {
          title: '注册',
          icon: <HomeOutlinedIcon />
        }
      },
      {
        path: '/login/inner',
        element: lazyLoad(lazy(() => import('@/views/login'))),
        meta: {
          title: '登录',
          icon: <HomeOutlinedIcon />
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
