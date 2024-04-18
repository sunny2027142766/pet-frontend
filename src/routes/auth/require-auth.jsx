import PropTypes from "prop-types";
import React, { useState } from "react";
import { useAuth } from "src/hooks/use-auth"; // 导入 useAuth 钩子
import { Navigate, useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function RequireAuth({ children }) {
  const auth = useAuth(); // 使用 useAuth 获取认证状态
  const location = useLocation();
  const [redirect, setRedirect] = useState(false);

  if (!auth && !redirect) {
    // 如果 auth 是 null，并且尚未重定向，显示对话框
    const handleDialogClose = () => {
      // 关闭对话框后，执行重定向
      setRedirect(true);
    };

    return (
      <Dialog
        open
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">权限不足 && 未登录</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            请您申请权限 或 登录后查看此页面
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            去登录
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (redirect) {
    // 重定向到登录页面
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // 如果用户已登录，则渲染子组件
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
