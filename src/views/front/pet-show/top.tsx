import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import {
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useScrollTrigger,
  useTheme
} from '@mui/material'

import Logo from '@/assets/logo.png'
import { useState } from 'react'
import { tokens } from '@/settings/theme'
import React from 'react'

const pages = ['首页', '宠物互动', '宠物展示', '档案馆', '社区', '情感互动']

interface Props {
  window?: () => Window
  children: React.ReactElement
}
function ElevationScroll(props: Props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

const Top = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [accountEl, setAccountEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null)

  const accountOpen = Boolean(accountEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }
  // 关闭菜单
  const handleMenuClose = () => {
    setAccountEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'account'
  const renderMenu = (
    <Menu anchorEl={accountEl} id={menuId} keepMounted open={accountOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>个人信息</MenuItem>
      <MenuItem onClick={handleMenuClose}>退出登录</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'mobileMenu'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="4封邮件" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>邮件</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="17条通知" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>通知</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="当前用户"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>个人</p>
      </MenuItem>
    </Menu>
  )

  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }
  const DrawerList = (
    <Box component="div" sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {pages.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const toPage = () => {
    console.log('跳转')
  }
  const navList = (
    <Box component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map(page => (
        <Button key={page} onClick={toPage} sx={{ my: 2, color: 'white', display: 'block' }}>
          {page}
        </Button>
      ))}
    </Box>
  )

  return (
    <Box component="div" sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="static" sx={{ backgroundColor: '#6E2987' }}>
          <Toolbar>
            {/* 抽屉 */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              <Box component="div" sx={{ display: { xs: 'flex', md: 'none' } }}>
                <img src={Logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
              </Box>
              {DrawerList}
            </Drawer>
            <Box component="div" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <img src={Logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
            </Box>
            {/* 导航菜单 */}
            <Box component="div" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navList}
            </Box>
            {/* 搜索 */}
            <Box
              component="div"
              display="flex"
              borderRadius="10px"
              bgcolor={colors.primary[400]}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="搜索" />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
            {/* 浏览器展示 */}
            <Box component="div" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            {/* 手机展示更多按钮 */}
            <Box component="div" sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
          {renderMobileMenu}
          {renderMenu}
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Box>
  )
}

export default Top
