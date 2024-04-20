import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  avatarUrl,
  username,
  password,
  email,
  phone,
  role,
  isVaild,
  selected,
  handleClick,
  onEdit,
  onDelete
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            disableRipple
            checked={selected}
            onChange={handleClick}
          />
        </TableCell>

        <TableCell
          component="th"
          scope="row"
          padding="none"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Avatar
              alt={username}
              src={avatarUrl}
            />
            <Typography
              variant="subtitle2"
              noWrap
            >
              {username}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{password}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>
          <Label color={(isVaild === 0 && 'error') || 'success'}>{isVaild === 0 ? '禁用' : '正常'}</Label>
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
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleCloseMenu();
          }}
        >
          <Iconify
            icon="eva:edit-fill"
            sx={{ mr: 2 }}
          />
          编辑
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete();
            handleCloseMenu();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify
            icon="eva:trash-2-outline"
            sx={{ mr: 2 }}
          />
          删除
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  role: PropTypes.string,
  isVaild: PropTypes.number,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
