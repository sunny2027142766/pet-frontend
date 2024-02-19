/*
 * @Author: 晴天
 * @Date: 2024-01-31 17:36:29
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-19 17:00:27
 * @FilePath: \pet-frontend\src\layout\Sidebar.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import React, { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { tokens } from '../settings/theme'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

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

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('控制台')

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
            <Item title="控制台" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              Data
            </Typography>
            <Item title="测试" to="/test" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item
              title="接口"
              to="/interface"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="登录"
              to="/login"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="注册"
              to="/register"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
