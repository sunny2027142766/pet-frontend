/*
 * @Author: 晴天
 * @Date: 2024-01-31 17:36:29
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-27 08:32:40
 * @FilePath: \pet-frontend\src\layout\Sidebar.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { tokens } from '../settings/theme'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { rootRouter } from '@/router'

interface ItemProps {
  title: string
  to: string
  icon: React.ReactNode // 这里使用 React.ReactNode 表示可以接受任意 React 元素作为 icon
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

const Item: React.FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100]
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

// 递归成成菜单数据
const generateMenuData = (rootRouter: any[], menuData: any[] = []) => {
  rootRouter.forEach(item => {
    // 不存在children
    if (!item?.children?.length) {
      const currentItem = {
        title: item?.meta?.title,
        path: item.path,
        icon: item?.meta?.icon
      }
      return menuData.push(currentItem)
    }
    // children为1
    if (item?.children?.length === 1) {
      const currentItem = {
        title: item?.meta?.title,
        path: item.path,
        icon: item?.meta?.icon,
        children: []
      }
      return menuData.push(currentItem)
    }
    menuData.push({
      title: item?.meta?.title,
      path: item.path,
      icon: item?.meta?.icon,
      children: generateMenuData(item.children)
    })
  })
  return menuData.filter(item => {
    return item.title
  })
}

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('控制台')

  const [menuData, setMenuData] = useState<any[]>([])

  useEffect(() => {
    setMenuData(generateMenuData(rootRouter).filter(item => item.children))
  }, [])

  console.log(menuData)

  return (
    <Box
      component="div"
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important'
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important'
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important'
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100]
            }}
          >
            {!isCollapsed && (
              <Box component="div" display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h4" color={colors.grey[100]}>
                  虚拟宠物互动平台
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box component="div" mb="25px">
              <Box component="div" display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box component="div" textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
                  张三
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  管理员
                </Typography>
              </Box>
            </Box>
          )}

          <Box component="div" paddingLeft={isCollapsed ? undefined : '10%'}>
            {menuData.map(menuItem => (
              <React.Fragment key={menuItem.path}>
                {menuItem.children.length === 0 ? (
                  <Item
                    title={menuItem.title}
                    to={menuItem.path}
                    icon={menuItem.icon}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ) : (
                  <SubMenu title={menuItem.title} icon={menuItem.icon} placeholder="">
                    {menuItem.children.map((subMenuItem: any) => (
                      <Item
                        key={subMenuItem.path}
                        title={subMenuItem.title}
                        to={`${menuItem.path}/${subMenuItem.path}`}
                        icon={subMenuItem.icon}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ))}
                  </SubMenu>
                )}
              </React.Fragment>
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
