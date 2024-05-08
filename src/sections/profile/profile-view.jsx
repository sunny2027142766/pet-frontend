/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  Button,
  Avatar,
  Select,
  Divider,
  MenuItem,
  Container,
  TextField,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
  CardContent,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Iconify from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import styled from "@emotion/styled";
import { updateUserApi, getUserProfileApi } from "src/api/modules/user";

// const userInfo = {
//   username: "User123",
//   nickname: null,
//   email: "123456789@qq.com",
//   phone: null,
//   birthday: null,
//   address: null,
//   avatar: "/preview/Myfile/avatar_1.jpg",
//   postNum: 0,
//   commentNum: 0,
//   likeNum: 0,
//   shareNum: 0,
// };

const HoverAvatar = styled(Box)({
  position: "relative",
  display: "inline-block",
  "&:hover div": {
    display: "flex",
  },
});

const UploadIconOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
}));

function ProfileView() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    nickname: "",
    email: "",
    phone: "",
    sex: 0,
    birthday: "",
    avatar: "",
    address: "",
    postNum: 0,
    likeNum: 0,
    shareNum: 0,
    commentNum: 0,
  });

  const {
    uid,
    username,
    nickname,
    email,
    phone,
    sex,
    birthday,
    avatar,
    address,
    postNum,
    likeNum,
    shareNum,
    commentNum,
  } = userInfo;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo((prev) => ({
            ...prev,
            avatar: data.data,
          }));
        })
        .catch((error) => console.error("Error uploading image:", error));
    }
  };

  const handleSave = () => {
    // 保存用户信息到后端
    const newInfo = {
      ...userInfo,
      sex: userInfo.sex === 2 ? 0 : userInfo.sex,
    };
    updateUserApi(uid, newInfo);
  };

  const getUserProfile = async () => {
    try {
      setLoading(true);
      const { data } = await getUserProfileApi();
      setUserInfo(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Container>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* 左侧信息面板 */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HoverAvatar>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      border: "1px dashed grey",
                    }}
                    src={`/preview${avatar}`}
                  />
                  <UploadIconOverlay>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="icon-button-file"
                      type="file"
                      onChange={handleAvatarChange}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <Iconify
                          icon="entypo:upload"
                          sx={{
                            color: "primary.main",
                            width: 20,
                            height: 20,
                          }}
                        />
                      </IconButton>
                    </label>
                  </UploadIconOverlay>
                </HoverAvatar>
                <Typography variant="h6">{username}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {nickname}
                </Typography>
                <Divider sx={{ width: "100%", my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2">发帖数</Typography>
                    <Typography variant="subtitle1">{postNum}</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2">评论数</Typography>
                    <Typography variant="subtitle1">{commentNum}</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2">点赞数</Typography>
                    <Typography variant="subtitle1">{likeNum}</Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2">分享数</Typography>
                    <Typography variant="subtitle1">{shareNum}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ mt: 8 }}>
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Iconify icon="solar:home-broken" />}
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    去首页
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* 右侧详细信息编辑面板 */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{ mb: 8 }}
                >
                  编辑个人信息
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="用户名"
                      name="username"
                      value={username || ""}
                      variant="outlined"
                      color="secondary"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="昵称"
                      name="nickname"
                      value={nickname || ""}
                      variant="outlined"
                      color="secondary"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="邮箱"
                      name="email"
                      value={email || ""}
                      variant="outlined"
                      color="secondary"
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <Iconify
                            icon="ic:outline-email"
                            sx={{
                              color: "secondary.main",
                              width: 20,
                              height: 20,
                              mr: 2,
                            }}
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="生日"
                      type="date"
                      name="birthday"
                      value={birthday || ""}
                      variant="outlined"
                      color="secondary"
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <Iconify
                            icon="mingcute:birthday-2-line"
                            sx={{
                              color: "secondary.main",
                              width: 20,
                              height: 20,
                              mr: 2,
                            }}
                          />
                        ),
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <InputLabel color="secondary" id="gender-label">
                        性别
                      </InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender-select"
                        name="sex"
                        value={sex || ""}
                        label="性别"
                        onChange={handleChange}
                        variant="outlined"
                        color="secondary"
                        startAdornment={
                          <InputAdornment position="start">
                            <Iconify
                              icon="guidance:unisex-restroom"
                              sx={{
                                color: "secondary.main",
                                width: 20,
                                height: 20,
                                mr: 2,
                              }}
                            />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value={1}>男</MenuItem>
                        <MenuItem value={2}>女</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="电话号"
                      name="phone"
                      value={phone || ""}
                      variant="outlined"
                      color="secondary"
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <Iconify
                            icon="solar:phone-outline"
                            sx={{
                              color: "secondary.main",
                              width: 20,
                              height: 20,
                              mr: 2,
                            }}
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="地址"
                      name="address"
                      value={address || ""}
                      variant="outlined"
                      color="secondary"
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <Iconify
                            icon="entypo:address"
                            sx={{
                              color: "secondary.main",
                              width: 20,
                              height: 20,
                              mr: 2,
                            }}
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 8 }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Iconify icon="jam:save" />}
                      onClick={handleSave}
                    >
                      保存个人信息
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ProfileView;
