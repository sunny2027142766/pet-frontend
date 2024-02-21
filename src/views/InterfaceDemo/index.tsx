/*
 * @Author: 晴天
 * @Date: 2024-02-02 11:31:27
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-21 15:16:11
 * @FilePath: \pet-frontend\src\views\interfaceDemo\index.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */

import { Box, Grid, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React from 'react'
import Header from '../../components/Header'
import { tokens } from '../../settings/theme'
import { useRequest } from 'ahooks'
import { demo, getList } from '@/api/modules/demo/index'

const InterfaceDemo: React.FC = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { loading, run, data } = useRequest(demo, {
    manual: true
  })

  const listObj = useRequest(getList, {
    manual: true
  })

  return (
    <Box component="div" m="20px">
      {/* HEADER */}
      <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
        <Header title="接口" subtitle="下面将进行接口测试" />
      </Box>
      {/* 栅格布局 */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            component="div"
            width="100%"
            height="250px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            bgcolor={colors.blueAccent[400]}
          >
            {/* 请求结果 */}
            <Box component="div" height="10%">
              {loading ? '加载中' : JSON.stringify(data)}
            </Box>
            <Box component="div" height="70%" overflow="auto">
              {listObj.loading ? '加载中' : JSON.stringify(listObj.data)}
            </Box>
            {/* 发送请求 */}
            <Box component="div" width="80%" display="flex" justifyContent="space-between">
              <LoadingButton loading={loading} variant="contained" color="primary" onClick={() => run({ id: '1' })}>
                发送请求
              </LoadingButton>
              <LoadingButton
                loading={listObj.loading}
                variant="contained"
                color="primary"
                onClick={() => listObj.run()}
              >
                发送请求2
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box component="div" width="100%" height="250px" bgcolor={colors.blueAccent[400]}>
            111
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box component="div" width="100%" height="250px" bgcolor={colors.blueAccent[400]}>
            111
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box component="div" width="100%" height="250px" bgcolor={colors.blueAccent[400]}>
            111
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box component="div" width="100%" height="250px" bgcolor={colors.blueAccent[400]}>
            111
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box component="div" width="100%" height="250px" bgcolor={colors.blueAccent[400]}>
            111
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box component="div" width="100%" height="250px" bgcolor={colors.blueAccent[400]}>
            111
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default InterfaceDemo
