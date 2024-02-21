/*
 * @Author: 晴天
 * @Date: 2024-02-01 08:43:50
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-21 15:02:07
 * @FilePath: \pet-frontend\src\views\dashboard\index.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import { Box, Button, useTheme } from '@mui/material'
import { tokens } from '@/settings/theme'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import Header from '@/components/Header'

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box component="div" m="20px">
      {/* HEADER */}
      <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
        <Header title="控制台" subtitle="欢迎来到控制台" />

        <Box component="div">
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            按钮
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
