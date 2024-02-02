/*
 * @Author: 晴天
 * @Date: 2024-01-31 17:22:13
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:27:05
 * @FilePath: \pet-frontend\src\App.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

// import { useState } from "react";
import { ColorModeContext, useMode } from './settings/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './layout/Sidebar'
import Topbar from './layout/Topbar'
import Dashboard from './views/Dashboard'
import Test from './views/Test'
import InterfaceDemo from './views/InterfaceDemo'

const App = () => {
  const [theme, colorMode] = useMode()
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/test" element={<Test />} />
              <Route path="/interface" element={<InterfaceDemo />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
