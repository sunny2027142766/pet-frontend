/*
 * @Author: 晴天
 * @Date: 2024-02-01 08:45:00
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-19 17:01:15
 * @FilePath: \pet-frontend\src\components\Header.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from '../settings/theme'

interface HeaderProps {
  title: string
  subtitle: string
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box component="div" mb="30px">
      <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: '0 0 5px 0' }}>
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  )
}

export default Header
