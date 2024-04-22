import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Alert,
  Dialog,
  Select,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  OutlinedInput,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { getRoleOptionsApi } from 'src/api/modules/role';
import { addUserApi, updateUserApi } from 'src/api/modules/user';

// ---------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function UserAddDialog({ open, onClose, initialData }) {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rids, setRids] = useState([]); // 用户角色ids 可多选
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canSend, setCanSend] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    setCanSend(username.trim() && email.trim() && password.trim() && rids.length > 0);
  }, [username, email, password, rids]);

  useEffect(() => {
    if (open) {
      fetchRoles();
      if (initialData) {
        setUserId(initialData.id || '');
        setUsername(initialData.username || '');
        setEmail(initialData.email || '');
        setPassword(initialData.password || '');
        setRids(initialData.role || []);
      }
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      setRids([]);
      setRoles([]);
    }
  }, [open, initialData]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await getRoleOptionsApi();
      if (res.code === 200) {
        setRoles(res.data);
      } else {
        console.log('获取角色信息失败:', res.message);
      }
    } catch (error) {
      console.log('获取角色信息失败:', error);
    }
    setLoading(false);
  };

  const validateEmail = (em) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!em) return '邮箱不能为空';
    if (!emailRegex.test(em)) return '请输入有效的邮箱地址';
    return '';
  };

  const validateUsername = (name) => {
    if (!name) return '用户名不能为空';
    if (name.length < 3) return '用户名长度至少为3个字符';
    return '';
  };

  const validatePassword = (pw) => {
    if (!pw) return '密码不能为空';
    if (pw.length < 8) return '密码长度至少为8个字符';
    if (!/\d/.test(pw) || !/[a-zA-Z]/.test(pw)) return '密码必须包含至少一个字母和一个数字';
    return '';
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    setUsernameError(validateUsername(value));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setRids(Array.isArray(value) ? value : [value]);
  };

  const handleAdd = async () => {
    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (!usernameErr && !emailErr && !passwordErr) {
      console.log('表单数据:', { username, email, password, rids });
      const userForm = {
        username,
        email,
        password,
        rids
      };
      try {
        const addRes = await addUserApi(userForm);
        if (addRes.code === 200) {
          setSnackbarMessage('用户添加成功');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          onClose();
        } else {
          setSnackbarMessage('用户添加失败，请重试');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('添加用户失败:', error);
        setSnackbarMessage('用户添加失败，请重试');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } else {
      setUsernameError(usernameErr);
      setEmailError(emailErr);
      setPasswordError(passwordErr);
    }
  };

  const handleUpdate = async () => {
    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (!usernameErr && !emailErr && !passwordErr) {
      console.log('表单数据:', { userId, username, email, password, rids });
      const userForm = {
        id: userId,
        username,
        email,
        password,
        rids
      };
      try {
        const updateRes = await updateUserApi(userForm);
        if (updateRes.code === 200) {
          setSnackbarMessage('用户更新成功');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          onClose();
        } else {
          setSnackbarMessage('用户更新失败，请重试');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('更新用户失败:', error);
        setSnackbarMessage('用户更新失败，请重试');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } else {
      setUsernameError(usernameErr);
      setEmailError(emailErr);
      setPasswordError(passwordErr);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
      >
        <DialogTitle>{initialData ? '编辑用户' : '添加用户'}</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <TextField
                error={!!usernameError}
                helperText={usernameError}
                margin="dense"
                id="username"
                label="用户名"
                type="text"
                color="secondary"
                fullWidth
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                error={!!emailError}
                helperText={emailError}
                margin="dense"
                id="email"
                label="邮箱"
                color="secondary"
                fullWidth
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                error={!!passwordError}
                helperText={passwordError}
                margin="dense"
                id="password"
                label="密码"
                color="secondary"
                fullWidth
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
              />
              <FormControl sx={{ my: 1, width: '100%' }}>
                <InputLabel id="multiple-label">角色</InputLabel>
                <Select
                  labelId="multiple-label"
                  id="multiple-chip"
                  multiple
                  value={rids}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Chip"
                    />
                  }
                  MenuProps={MenuProps}
                >
                  {roles.map((op) => (
                    <MenuItem
                      key={op.value}
                      value={op.value}
                    >
                      {op.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ color: 'red', fontSize: '12px', p: 1 }}>
                新增用户只是建立一条数据，后续还需要用户自行设置个人信息
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            color="info"
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            disabled={!canSend || loading}
            variant="outlined"
            color="secondary"
            onClick={initialData ? handleUpdate : handleAdd}
          >
            {initialData ? '保存' : '添加'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

UserAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object
};
