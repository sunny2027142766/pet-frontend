import { useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// -----------------------------------------------------------

export default function UserAddDialog({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    console.log("表单数据:", { username, email });
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
          multiline
          id="email"
          label="邮箱"
          color="secondary"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={onClose}>
          取消
        </Button>
        <Button
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
