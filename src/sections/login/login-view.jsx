import { useState } from "react";
import {
  Box,
  Link,
  Card,
  Alert,
  Stack,
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { bgGradient } from "src/theme/css";
import { useRouter } from "src/routes/hooks";
import Iconify from "src/components/iconify";
import { loginApi } from "src/api/modules/auth";
import { getUserInfoApi } from "src/api/modules/user";
import { validateEmail } from "src/utils/vaildate";
import { setItem } from "src/utils/local-storage";
import { alpha, useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorHelper, setEmailErrorHelper] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [tipOpen, setTipOpen] = useState(false);
  const [tip, setTip] = useState("");

  const handleSubmit = async (event) => {
    // TODO: 登录逻辑
    event.preventDefault();
    let hasError = false;
    if (email.trim() === "") {
      console.log(email.trim());
      setEmailError(true);
      setEmailErrorHelper("邮箱不能为空");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError(true);
      setEmailErrorHelper("");
      setEmailErrorHelper("邮箱格式不正确");
      hasError = true;
    } else {
      setEmailError(false);
    }
    if (password.trim() === "") {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!hasError) {
      // 调用登录接口
      const res = await loginApi({
        email,
        password,
      });
      if (res.code === 200 && res.msg === "登录成功") {
        setTip("登录成功");
        setTipOpen(true);
        const { accessToken, refreshToken } = res.data;
        setItem("accessToken", accessToken);
        setItem("refreshToken", refreshToken);
        const userInfoRes = await getUserInfoApi();
        console.log("用户信息请求结果===>", userInfoRes);
        if (userInfoRes.code === 200) {
          dispatch({
            type: "userInfo/setUserInfo",
            payload: userInfoRes.data,
          });
          setTimeout(() => {
            router.push("/front/home");
          }, 1000);
        }
      } else {
        setTip(res.msg);
        setTipOpen(true);
      }
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          label="邮箱"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={emailError}
          helperText={emailErrorHelper}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {email && (
                  <IconButton
                    onClick={() => {
                      setEmail("");
                      setEmailError(false);
                      setEmailErrorHelper("");
                    }}
                  >
                    <Iconify icon="ic:outline-clear" />
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
          helperText={passwordError ? "密码不能为空" : ""}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
                {password && (
                  <IconButton
                    onClick={() => {
                      setPassword("");
                      setPasswordError(false);
                    }}
                  >
                    <Iconify icon="ic:outline-clear" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 3 }}
      >
        <Link
          variant="subtitle2"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/register")}
        >
          还没有账户? 去注册
        </Link>

        <Link variant="subtitle2" underline="hover" sx={{ cursor: "pointer" }}>
          忘记密码?
        </Link>
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
      >
        登录
      </Button>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.1),
          imgUrl: "/assets/background/bg.png",
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            登录
          </Typography>

          {renderForm}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={tipOpen}
        onClose={() => setTipOpen(false)}
        autoHideDuration={1000}
      >
        <Alert
          severity={tip === "登录成功" ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {tip}
        </Alert>
      </Snackbar>
    </Box>
  );
}
