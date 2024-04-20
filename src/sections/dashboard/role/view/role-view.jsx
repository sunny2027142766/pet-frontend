import { useState, useEffect } from 'react';
import {
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
import { getAllRoleListApi } from 'src/api/modules/role';
import { emptyRows } from '../utils';

import UserTableHead from '../role-table-head';
import RoleTableRow from '../role-table-row';
import RoleTableToolbar from '../role-table-toolbar';
import RoleAddDialog from '../role-add-dialog';
import TableEmptyRows from '../table-empty-rows';

// ----------------------------------------------------------------------

export default function RoleView() {
  // 选中的数据
  const [selected, setSelected] = useState([]);
  // 排序
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  // 查询条件
  const [pageNum, setPageNum] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  // 新增用户弹框
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // table数据
  const [tableData, setTableData] = useState({
    list: [],
    total: 0
  });

  const getTableData = async (username = '') => {
    try {
      setLoading(true);
      const userPageQuery = {
        pageNum,
        pageSize,
        username
      };
      const res = await getAllRoleListApi(userPageQuery);
      if (res.success) {
        setTableData(res.data);
      } else {
        setTableData({ list: [], total: 0 });
      }
    } catch (error) {
      console.log(error);
      setTableData({ list: [], total: 0 });
    }
    setLoading(false);
  };

  useEffect(() => {
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  // 全选
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.list.map((data) => data.rid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  // 选中单个
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
  // 页码改变
  const handlePageNumChange = (_event, newPage) => {
    setPageNum(newPage);
  };
  // 每页数量改变
  const handlePageSizeChange = (event) => {
    setPageNum(0);
    setPageSize(parseInt(event.target.value, 10));
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">角色管理</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setAddOpen(true)}
        >
          添加角色
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress color="success" />
      ) : (
        <Card>
          <RoleTableToolbar
            numSelected={selected.length}
            handleQuery={(username) => getTableData(username)}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={tableData.total}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'roleName', label: '角色名称(英文)' },
                    { id: 'roleRemark', label: '角色名(中文)' },
                    { id: 'desc', label: '角色描述' },
                    { id: 'isValid', label: '状态' },
                    { id: '' }
                  ]}
                />
                <TableBody>
                  {tableData.list.map((row) => (
                    <RoleTableRow
                      key={row.rid}
                      roleName={row.roleName}
                      roleRemark={row.roleRemark}
                      desc={row.desc}
                      isValid={row.isValid}
                      selected={selected.indexOf(row.rid) !== -1}
                      handleClick={(event) => handleClick(event, row.rid)}
                    />
                  ))}

                  <TableEmptyRows
                    height={50}
                    emptyRows={emptyRows(pageNum, pageSize, tableData.total)}
                  />

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
          </Scrollbar>

          <TablePagination
            page={pageNum}
            component="div"
            labelRowsPerPage="每页行数"
            count={tableData.total}
            rowsPerPage={pageSize}
            onPageChange={handlePageNumChange}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handlePageSizeChange}
          />
        </Card>
      )}

      <RoleAddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
      />
    </Container>
  );
}
