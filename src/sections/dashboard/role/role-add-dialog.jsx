import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  Select,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const rolePermissions = [
  { id: 1, name: '超级管理员' },
  { id: 2, name: '普通管理员' },
  { id: 3, name: '普通用户' }
  // Add more role permissions as needed
];

export default function RoleAddDialog({ open, onClose, initialData }) {
  const [rid, setRid] = useState(undefined);
  const [roleName, setRoleName] = useState('');
  const [roleRemark, setRoleRemark] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRolePermissions, setSelectedRolePermissions] = useState([]);
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    setCanSend(roleName.trim() && roleRemark.trim() && description.trim() && selectedRolePermissions.length > 0);
  }, [roleName, roleRemark, description, selectedRolePermissions]);

  useEffect(() => {
    if (open) {
      // fetchPerms();
      if (initialData) {
        setRid(initialData.rid || '');
        setRoleName(initialData.roleName || '');
        setRoleRemark(initialData.roleRemark || '');
        setDescription(initialData.password || '');
        setSelectedRolePermissions(initialData.perms || []);
      }
    } else {
      setRid('');
      setRoleName('');
      setRoleRemark('');
      setDescription('');
      setSelectedRolePermissions([]);
    }
  }, [open, initialData]);

  const handleAdd = () => {
    console.log('添加信息:', { roleName, roleRemark, description, selectedRolePermissions });
    onClose();
  };

  const handleUpdate = () => {
    console.log('编辑信息:', { rid, roleName, roleRemark, description, selectedRolePermissions });
    onClose();
  };

  const handleRolePermissionsChange = (event) => {
    setSelectedRolePermissions(event.target.value);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle>添加角色</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="role-name"
          label="角色名"
          type="text"
          color="secondary"
          fullWidth
          variant="outlined"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="role-remark"
          label="角色备注"
          type="text"
          color="secondary"
          fullWidth
          variant="outlined"
          value={roleRemark}
          onChange={(e) => setRoleRemark(e.target.value)}
        />
        <FormControl
          fullWidth
          margin="dense"
          variant="outlined"
          color="secondary"
        >
          <InputLabel id="role-permissions-label">角色权限</InputLabel>
          <Select
            labelId="role-permissions-label"
            id="role-permissions"
            multiple
            value={selectedRolePermissions}
            onChange={handleRolePermissionsChange}
            label="角色权限"
          >
            {rolePermissions.map((permission) => (
              <MenuItem
                key={permission.id}
                value={permission.id}
              >
                {permission.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="description"
          label="描述"
          type="text"
          color="secondary"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ color: 'red', fontSize: '12px', p: 1 }}>注意：角色创建后，可能需要对角色进行菜单权限配置。</Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="info"
          onClick={onClose}
        >
          取消
        </Button>
        <Button
          disabled={!canSend}
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

RoleAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object
};
