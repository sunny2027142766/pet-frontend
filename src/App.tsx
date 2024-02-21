/*
 * @Author: 晴天
 * @Date: 2024-01-31 17:22:13
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-21 14:45:25
 * @FilePath: \pet-frontend\src\App.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

// import { useState } from "react";
import { ColorModeContext, useMode } from './settings/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
// import { Route, Routes } from 'react-router-dom'
// import Sidebar from './layout/Sidebar'
// import Topbar from './layout/Topbar'
// import Dashboard from './views/Dashboard'
// import Test from './views/Test'
// import InterfaceDemo from './views/InterfaceDemo'
// import Login from './views/login'
// import Register from './views/Register'
import Router from './router'

const App = () => {
  const [theme, colorMode] = useMode()
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
        {/* <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/test" element={<Test />} />
              <Route path="/interface" element={<InterfaceDemo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
