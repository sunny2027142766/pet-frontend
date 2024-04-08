import Top from './top'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

import { Outlet } from 'react-router-dom'

const Footer = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFAE01' }}>
      <Toolbar>
        <Typography variant="body1" color="inherit">
          © {new Date().getFullYear()} Virtual Pet. @zcy
        </Typography>
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
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </Box>
  )
}

export default Layout
