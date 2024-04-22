import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { getAllUserListApi } from 'src/api/modules/user';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';
import UserAddDialog from '../user-add-dialog';

export default function UserView() {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({
    list: [],
    total: 0
  });

  const getTableData = useCallback(
    async (keywords = '') => {
      try {
        setLoading(true);
        const userPageQuery = {
          pageNum,
          pageSize,
          keywords
        };
        const res = await getAllUserListApi(userPageQuery);
        if (res.success) {
          console.log('请求成功', res.data);
          setTableData(res.data);
        } else {
          setTableData({ list: [], total: 0 });
        }
      } catch (error) {
        console.log(error);
        setTableData({ list: [], total: 0 });
      }
      setLoading(false);
    },
    [pageNum, pageSize]
  );

  useEffect(() => {
    getTableData();
  }, [getTableData]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.list.map((data) => data.uid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handlePageNumChange = (_event, newPage) => {
    setPageNum(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageNum(1);
    setPageSize(event.target.value);
  };

  const [editData, setEditData] = useState(undefined);

  const handleEdit = (row) => {
    console.log('点击编辑===>', row);
    setEditData(row);
    setAddOpen(true);
  };

  const handleDelete = (id) => {
    console.log('点击删除===>', id);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">用户管理</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setAddOpen(true)}
        >
          添加用户
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          handleQuery={(keywords) => getTableData(keywords)}
        />
        <Scrollbar>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress color="success" />
            </Box>
          ) : (
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 1000 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={tableData.total}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'username', label: '用户名' },
                    { id: 'password', label: '密码' },
                    { id: 'email', label: '邮箱' },
                    { id: 'phone', label: '电话' },
                    { id: 'roleNames', label: '角色' },
                    { id: 'isValid', label: '状态' },
                    { id: '' }
                  ]}
                />
                <TableBody>
                  {tableData.list.map((row) => (
                    <UserTableRow
                      key={row.uid}
                      username={row.username}
                      avatar={row.avatar}
                      password={row.password}
                      email={row.email}
                      phone={row.phone}
                      roleNames={row.roleNames}
                      status={row.status}
                      selected={selected.indexOf(row.uid) !== -1}
                      handleClick={(event) => handleClick(event, row.uid)}
                      onEdit={() => handleEdit(row)}
                      onDelete={() => handleDelete(row.uid)}
                    />
                  ))}

                  {tableData.total === 0 && (
                    <Typography
                      variant="h6"
                      paragraph
                    >
                      没有找到
                    </Typography>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Scrollbar>

        <TablePagination
          page={pageNum}
          component="div"
          labelRowsPerPage="每页行数"
          count={tableData.total}
          rowsPerPage={pageSize}
          onPageChange={handlePageNumChange}
          onRowsPerPageChange={handlePageSizeChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      <UserAddDialog
        open={addOpen}
        onClose={() => {
          setAddOpen(false);
          setEditData(undefined);
        }}
        initialData={editData}
      />
    </Container>
  );
}
