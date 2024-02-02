/*
 * @Author: 晴天
 * @Date: 2024-02-02 17:14:46
 * @LastEditors: 晴天
 * @LastEditTime: 2024-02-02 17:39:22
 * @FilePath: \pet-frontend\src\views\Login\index.tsx
 * @Description:
 * QQ: 2027142766
 * Copyright (c) ${2024} by ${晴天}, All Rights Reserved.
 */
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = () => {
    // 处理登录逻辑
    console.log('Username:', formData.username)
    console.log('Password:', formData.password)
    // 可以在这里添加实际的登录逻辑，比如调用后端API进行验证
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <Typography variant="h5">登录</Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="用户名"
            name="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="密码"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            登录
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
