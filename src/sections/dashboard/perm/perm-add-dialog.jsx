import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const menuOptions = [
  { id: 1, name: 'Dashboard' },
  { id: 2, name: 'Users' },
  { id: 3, name: 'Settings' }
  // Add more menu options as needed
];

export default function PermAddDialog({ open, onClose, initialData }) {
  const [pid, setPid] = useState('');
  const [permissionName, setPermissionName] = useState('');
  const [permissionCode, setPermissionCode] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMenuOptions, setSelectedMenuOptions] = useState([]);
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    setCanSend(permissionName.trim() && permissionCode.trim() && description.trim() && selectedMenuOptions.length > 0);
  }, [permissionName, permissionCode, description, selectedMenuOptions]);

  useEffect(() => {
    if (open) {
      // fetchPerms();
      if (initialData) {
        setPid(initialData.pid || '');
        setPermissionName(initialData.permissionName || '');
        setPermissionCode(initialData.code || '');
        setDescription(initialData.desc || '');
        setSelectedMenuOptions(initialData.menus || []);
      }
    } else {
      setPid(undefined);
      setPermissionName('');
      setPermissionCode('');
      setDescription('');
      setSelectedMenuOptions([]);
    }
  }, [open, initialData]);

  const handleAdd = () => {
    console.log('添加信息:', { permissionName, permissionCode, description, selectedMenuOptions });
    onClose();
  };

  const handleMenuOptionsChange = (event) => {
    setSelectedMenuOptions(event.target.value);
  };

  const handleUpdate = () => {
    console.log('编辑信息:', { pid, permissionName, permissionCode, description, selectedMenuOptions });
    onClose();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
    >
      <DialogTitle>添加权限</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="permission-name"
          label="权限名"
          type="text"
          color="secondary"
          fullWidth
          variant="outlined"
          value={permissionName}
          onChange={(e) => setPermissionName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="permission-code"
          label="权限代码"
          type="text"
          color="secondary"
          fullWidth
          variant="outlined"
          value={permissionCode}
          onChange={(e) => setPermissionCode(e.target.value)}
        />
        <FormControl
          fullWidth
          margin="dense"
          variant="outlined"
          color="secondary"
        >
          <InputLabel id="menu-options-label">关联菜单</InputLabel>
          <Select
            labelId="menu-options-label"
            id="menu-options"
            multiple
            value={selectedMenuOptions}
            onChange={handleMenuOptionsChange}
            label="关联菜单"
          >
            {menuOptions.map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
              >
                {option.name}
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
        <Box sx={{ color: 'red', fontSize: '12px', p: 1 }}>注意：权限一旦创建后，可能需要进行更细致的配置。</Box>
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

PermAddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object
};
