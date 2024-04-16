import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { validateEmail } from 'src/utils/vaildate';

import { bgGradient } from 'src/theme/css';
import { loginApi } from 'src/api/modules/auth';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorHelper, setEmailErrorHelper] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    // TODO: 登录逻辑
    event.preventDefault();
    let hasError = false;
    if (email.trim() === '') {
      console.log(email.trim());
      setEmailError(true);
      setEmailErrorHelper('邮箱不能为空')
      hasError = true;
    } else if (!validateEmail(email)) { 
      setEmailError(true);
      setEmailErrorHelper('')
      setEmailErrorHelper('邮箱格式不正确')
      hasError = true;
    } else {
      setEmailError(false);
    }
    if (password.trim() === '') {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!hasError) {
      // 调用登录接口
      await loginApi({
        email,
        password,
      })
      // ...
      // 假设登录成功，跳转到首页
      router.push('/');
    }
    
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          label="邮箱"
          variant="outlined"
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={emailError}
          helperText={emailErrorHelper}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {email && (
                  <IconButton onClick={() => {
                    setEmail('');
                    setEmailError(false);
                    setEmailErrorHelper('');
                  }}>
                    <Iconify icon='ic:outline-clear' />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="密码"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={passwordError}
          helperText={passwordError ? '密码不能为空' : ''}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
                {password && (
                  <IconButton onClick={() => {
                    setPassword('');
                    setPasswordError(false);
                  }}>
                    <Iconify icon='ic:outline-clear' />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
        <Link variant="subtitle2" sx={{ cursor: 'pointer' }} onClick={()=>router.push('/register') }>
             还没有账户? 去注册
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
        onClick={handleSubmit}
      >
        登录
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
          <Typography variant="h4" sx={{ mb: 2 }}>登录</Typography>
          
          {renderForm}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              或
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="ic:baseline-wechat" color="#19D56C" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="bi:tencent-qq" color="#33353B" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="simple-icons:alipay" color="#0188FB" />
            </Button>
          </Stack>

        </Card>
      </Stack>
    </Box>
  );
}
