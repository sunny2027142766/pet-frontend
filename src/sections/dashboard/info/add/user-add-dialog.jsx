import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Dialog,
  Button,
  MenuItem,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const roles = [
  {
    value: 0,
    label: "普通用户",
  },
  {
    value: 1,
    label: "管理员",
  },
];

export default function UserAddDialog({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    // 检查所有字段是否已填写
    setCanSend(username.trim() && email.trim() && password.trim());
  }, [username, email, password]); // 当这些依赖项变化时重新运行

  const handleAdd = () => {
    console.log("表单数据:", { username, email, password });
    onClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>添加用户</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="username"
          label="用户名"
          type="text"
          color="secondary"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          id="email"
          label="邮箱"
          color="secondary"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="密码"
          color="secondary"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          fullWidth
          id="role"
          select
          color="secondary"
          label="角色"
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ color: "red", fontSize: "12px", p: 1 }}>
          新增用户只是建立一条数据,后续还要用户自己设置个人信息
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={onClose}>
          取消
        </Button>
        <Button
          disabled={!canSend}
          variant="outlined"
          color="secondary"
          onClick={handleAdd}
        >
          添加
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UserAddDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
