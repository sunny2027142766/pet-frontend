import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  Button,
  MenuItem,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { getAllRoles } from 'src/api/modules/role';

export default function UserAddDialog({ open, onClose, initialData }) {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    setCanSend(username.trim() && email.trim() && password.trim() && role);
  }, [username, email, password, role]);

  useEffect(() => {
    if (open) {
      fetchRoles();
      if (initialData) {
        setUserId(initialData.id || '');
        setUsername(initialData.username || '');
        setEmail(initialData.email || '');
        setPassword(initialData.password || '');
        setRole(initialData.role || '');
      }
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('');
      setRoles([]);
    }
  }, [open, initialData]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await getAllRoles();
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

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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

  const handleAdd = () => {
    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (!usernameErr && !emailErr && !passwordErr) {
      console.log('表单数据:', { username, email, password, role });
      onClose();
    } else {
      setUsernameError(usernameErr);
      setEmailError(emailErr);
      setPasswordError(passwordErr);
    }
  };

  const handleUpdate = () => {
    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (!usernameErr && !emailErr && !passwordErr) {
      console.log('表单数据:', { userId, username, email, password, role });
      onClose();
    } else {
      setUsernameError(usernameErr);
      setEmailError(emailErr);
      setPasswordError(passwordErr);
    }
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{initialData ? "编辑用户" : "添加用户"}</DialogTitle>
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

            <TextField
              margin="dense"
              fullWidth
              id="role"
              select
              color="secondary"
              label="角色"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((option) => (
                <MenuItem
                  key={option.rid}
                  value={option.rid}
                >
                  {option.roleRemark}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ color: 'red', fontSize: '12px', p: 1 }}>
              新增用户只是建立一条数据,后续还要用户自己设置个人信息
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
  );
}

UserAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
