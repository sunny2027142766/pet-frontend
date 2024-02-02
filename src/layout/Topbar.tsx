/*
 * @Author: 晴天
 * @Date: 2024-01-31 17:57:20
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 15:25:36
 * @FilePath: \pet-frontend\src\layout\Topbar.tsx
 * @Description: 
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved. 
 */

import React, { useContext } from 'react';
import { Box, IconButton, useTheme, InputBase } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { ColorModeContext, tokens } from '../settings/theme';

interface TopbarProps {
  // Define any props you might pass to this component
}

const Topbar: React.FC<TopbarProps> = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px" bgcolor={colors.primary[400]}>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="搜索" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
