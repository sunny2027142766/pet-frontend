import { tokens } from '@/settings/theme'
import { Add, Delete, Edit, Search } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  useTheme
} from '@mui/material'

const User = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // 假设下面是用户查询表单的相关逻辑
  const handleSearch = () => {
    // 处理查询逻辑的函数
  }

  const handleAdd = () => {
    // 处理新增用户的逻辑
  }

  const handleEdit = (userId: any) => {
    // 处理编辑用户的逻辑
    console.log(userId)
  }

  const handleDelete = (userId: any) => {
    // 处理删除用户的逻辑
    console.log(userId)
  }

  // 假设下面是用户表格的模拟数据
  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' }
    // 更多用户数据...
  ]

  return (
    <Box component="div" m="20px">
      {/* 用户条件查询表单 */}
      <Box
        component="form"
        flex="1"
        padding="20px"
        borderRadius="5px"
        boxShadow={`0px 2px 14px ${colors.primary[400]}`}
      >
        <TextField
          label="用户名"
          placeholder="请输入用户名"
          variant="outlined"
          sx={{ marginRight: '12px', height: '30px' }}
        />
        <TextField
          label="邮箱"
          placeholder="请输入邮箱"
          variant="outlined"
          sx={{ marginRight: '12px', height: '20px' }}
        />
        <Button sx={{ marginRight: '12px', height: '30px' }} variant="contained" color="primary" onClick={handleSearch}>
          <Search />
          查询
        </Button>
        <Button sx={{ marginRight: '12px', height: '30px' }} variant="contained" color="secondary" onClick={handleAdd}>
          <Add />
          新增
        </Button>
      </Box>
      {/* 表格 */}
      <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>用户名</TableCell>
              <TableCell>邮箱</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user.id)} color="warning">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}

export default User
