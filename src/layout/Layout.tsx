/*
 * @Author: 晴天
 * @Date: 2024-02-21 14:52:05
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-21 14:53:47
 * @FilePath: \pet-frontend\src\layout\Layout.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

const Layout: React.FC = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
