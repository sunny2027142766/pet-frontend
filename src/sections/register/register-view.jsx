import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Link, Card, Stack, TextField, Typography, IconButton } from '@mui/material'; 

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [username, setUsername] = useState('')

  const [email, setEmail] = useState('')

  const [verificationCode, setVerificationCode] = useState('')

  const [password, setPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClick = () => {
    router.push('/');
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          value={username}
          name="username"
          label="用户名"
          onChange={e => setUsername(e.target.value)}
        />
        
        <TextField
          value={email}
          name="email"
          label="邮箱"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="邮箱验证码"
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    // 发送验证码逻辑
                  }}
                >
                  发送验证码
                </LoadingButton>
              </InputAdornment>
            )
          }}
        />
        
        <TextField
          value={password}
          name="password"
          label="密码"
          type={showPassword ? 'text' : 'password'}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          value={confirmPassword}
          name="confirmPassword"
          label="确认密码"
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={e => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
        <Link variant="subtitle2" sx={{ cursor:'pointer' }}>
             已经有账户? 去登录
        </Link>

        <Link variant="subtitle2" underline="hover" sx={{cursor:'pointer' }}>
          忘记密码?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        注册
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.1),
          imgUrl: '/assets/background/bg.png',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420
        }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>注册</Typography>
          
          {renderForm}

        </Card>
      </Stack>
    </Box>
  );
}
