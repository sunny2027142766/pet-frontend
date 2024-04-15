import React, { useState } from 'react'
import { Box, Button, TextField, Typography, useTheme, InputAdornment, IconButton, Link } from '@mui/material'
import { tokens } from '@/settings/theme'
import bg from '@/assets/login/bg.png'
import Logo from '@/components/Logo'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    // 处理登录逻辑，可以在这里添加实际的登录请求等
    console.log('登录中...')
    navigate('/dashboard')
  }

  const navToRegister = () => {
    navigate('/register')
  }

  const inputStyles = {
    color: colors.orange[400],
    '& label, & label.Mui-focused': {
      color: colors.orange[400]
    },
    '& .MuiInputBase-input::placeholder': {
      color: colors.orange[400]
    },
    '& .MuiInputBase-input': {
      color: colors.orange[400]
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: colors.orange[200]
      },
      '&:hover fieldset': {
        borderColor: colors.orange[300]
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.orange[400]
      }
    }
  }

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background: `url(${bg})`,
        backgroundSize: 'cover'
      }}
    >
      <Box
        component="div"
        sx={{
          border: `2px solid hsla(0,0%,100%,.1)`,
          backgroundColor: `hsla(0,0%,100%,.13)`,
          borderRadius: '10px',
          boxShadow: '0 0 40px rgba(8,7,16,.6)',
          margin: '2rem 0',
          padding: '50px 35px',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Logo />
        <Typography textAlign="center" variant="h2" mb={3} color={colors.orange[400]}>
          登录
        </Typography>
        <Box component="div" width={300}>
          <TextField
            label="用户名"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="请输入用户名"
            sx={inputStyles}
          />
          <TextField
            label="密码"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="请输入密码"
            sx={inputStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            fullWidth
            onClick={handleLogin}
            sx={{
              backgroundColor: colors.orange[500],
              '&.MuiButton-root:hover': {
                backgroundColor: colors.orange[700]
              },
              fontSize: '14px',
              fontWeight: 'bold',
              mt: 2,
              padding: '10px 20px'
            }}
          >
            登录
          </Button>
          <Typography variant="body2" mt={2} color={colors.orange[400]} sx={{ textAlign: 'center' }}>
            还没有账号？{' '}
            <Link onClick={navToRegister} color="inherit" sx={{ cursor: 'pointer' }}>
              去注册
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
