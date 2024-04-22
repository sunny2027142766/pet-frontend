import { useState } from "react";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import Label from "src/components/label";
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

export default function UserTableRow({
  avatar,
  username,
  password,
  email,
  phone,
  status,
  roleNames,
  selected,
  handleClick,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleConfirmDeleteOpen = () => {
    handleCloseMenu();
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    handleConfirmDeleteClose();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={username} src={avatar} />
            <Typography variant="subtitle2" noWrap>
              {username}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{password}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{roleNames}</TableCell>
        <TableCell>
          <Label color={(status === 0 && "error") || "success"}>
            {status === 0 ? "禁用" : "正常"}
          </Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleCloseMenu();
          }}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          编辑
        </MenuItem>

        <MenuItem
          onClick={handleConfirmDeleteOpen}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          删除
        </MenuItem>
      </Popover>

      <Dialog open={confirmDeleteOpen} onClose={handleConfirmDeleteClose}>
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            确定要删除 {username} 这个用户吗？
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose} color="info">
            取消
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.number,
  roleNames: PropTypes.string,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
