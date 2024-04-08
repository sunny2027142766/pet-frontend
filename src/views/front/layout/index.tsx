import Top from './top'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

import { Outlet } from 'react-router-dom'

const Footer = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFAE01' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="inherit">© {new Date().getFullYear()} Virtual Pet. @zcy</Typography>
      </Toolbar>
    </AppBar>
  )
}

const Layout = () => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh' // 使布局至少有100视口高度
      }}
    >
      <Top />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default Layout
