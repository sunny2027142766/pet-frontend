import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Link, Card, Stack, TextField, Typography, IconButton } from '@mui/material'; 
import { useRouter } from 'src/routes/hooks';
import { validateEmail } from 'src/utils/vaildate';
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { sendCodeApi, registerApi } from 'src/api/modules/auth'; // 假设这里有注册接口

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorHelper, setEmailErrorHelper] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorHelper, setPasswordErrorHelper] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorHelper, setConfirmPasswordErrorHelper] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const validateFields = () => {
  let hasError = false;

  // 用户名非空校验
  if (username.trim() === '') {
    setUsernameError(true);
    hasError = true;
  }

  // 邮箱非空校验和格式校验
  if (email.trim() === '') {
    setEmailError(true);
    setEmailErrorHelper('请输入邮箱');
    hasError = true;
  } else if (!validateEmail(email)) {
    setEmailError(true);
    setEmailErrorHelper('请输入正确的邮箱');
    hasError = true;
  }

  // 验证码非空校验
  if (verificationCode.trim() === '') {
    setVerificationCodeError(true);
    hasError = true;
  }

  // 密码非空校验、长度校验、包含字母、数字和标点符号校验、一致性校验
  if (password.trim() === '') {
    setPasswordError(true);
    setPasswordErrorHelper('请输入密码');
    hasError = true;
  } else if (password.length < 8 || password.length > 16) {
    setPasswordError(true);
    setPasswordErrorHelper('密码长度为8-16位');
    hasError = true;
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}/.test(password)) {
    setPasswordError(true);
    setPasswordErrorHelper('密码包含字母、数字和标点符号');
    hasError = true;
  } else if (password !== confirmPassword) {
    setPasswordError(true);
    setPasswordErrorHelper('两次密码输入不一致');
    hasError = true;
  }

  // 确认密码非空校验、长度校验、包含字母、数字和标点符号校验、一致性校验
  if (confirmPassword.trim() === '') {
    setConfirmPasswordError(true);
    setConfirmPasswordErrorHelper('请输入密码');
    hasError = true;
  } else if (confirmPassword.length < 8 || confirmPassword.length > 16) {
    setConfirmPasswordError(true);
    setConfirmPasswordErrorHelper('密码长度为8-16位');
    hasError = true;
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}/.test(confirmPassword)) {
    setConfirmPasswordError(true);
    setConfirmPasswordErrorHelper('密码包含字母、数字和标点符号');
    hasError = true;
  } else if (confirmPassword !== password) {
    setConfirmPasswordError(true);
    setConfirmPasswordErrorHelper('两次密码输入不一致');
    hasError = true;
  }

  return hasError;
};

  const handleClick = async () => {
    const hasError = validateFields();
    if (!hasError) {
      // 执行注册逻辑
      const registerData = {
        username,
        email,
        code: verificationCode,
        password
      }
      const res = await registerApi(registerData);
      if (res.success) {
        // 注册成功，跳转到登录页面或其他页面
        router.push('/login');
      } else {
        // 注册失败，处理失败情况，可能是后端返回的错误信息，也可能是网络等问题
        // 弹出错误提示或者设置状态来提示用户
      }
    } 

  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          value={username}
          name="username"
          label="用户名"
          required
          onChange={e => setUsername(e.target.value)}
          error={usernameError}
          helperText={usernameError ? '请输入用户名' : ''}
        />
        
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
          label="邮箱验证码"
          required
          value={verificationCode}
          onChange={e => setVerificationCode(e.target.value)}
          error={verificationCodeError}
          helperText={verificationCodeError ? '请输入验证码' : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  onClick={async () => {
                    if (email.trim() === '') {
                      setEmailError(true);
                      setEmailErrorHelper('请输入邮箱');
                    } else if (!validateEmail(email)) {
                      setEmailError(true);
                      setEmailErrorHelper('请输入正确的邮箱');
                    }

                    const res = await sendCodeApi(email);
                    console.log('发送验证码', res);
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
          required
          type={showPassword ? 'text' : 'password'}
          onChange={e => setPassword(e.target.value)}
          error={passwordError}
          helperText={passwordErrorHelper}
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
          required
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={e => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          helperText={confirmPasswordErrorHelper}
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
        <Link variant="subtitle2" sx={{ cursor:'pointer' }} onClick={()=>router.push('/login')}>
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
