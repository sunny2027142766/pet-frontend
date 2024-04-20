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
import { getAllPermListApi } from 'src/api/modules/perm';
import { emptyRows } from '../utils';

import PermTableHead from '../perm-table-head';
import PermTableRow from '../perm-table-row';
import PermTableToolbar from '../perm-table-toolbar';
import PermAddDialog from '../perm-add-dialog';
import TableEmptyRows from '../table-empty-rows';

// ----------------------------------------------------------------------

export default function PermView() {
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
      const res = await getAllPermListApi(userPageQuery);
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
      const newSelecteds = tableData.list.map((data) => data.pid);
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
        <Typography variant="h4">权限管理</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setAddOpen(true)}
        >
          添加权限
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress color="success" />
      ) : (
        <Card>
          <PermTableToolbar
            numSelected={selected.length}
            handleQuery={(username) => getTableData(username)}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <PermTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={tableData.total}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'permissionName', label: '权限名' },
                    { id: 'desc', label: '描述' },
                    { id: 'isValid', label: '状态' },
                    { id: '' }
                  ]}
                />
                <TableBody>
                  {tableData.list.map((row) => (
                    <PermTableRow
                      key={row.uid}
                      permissionName={row.permissionName}
                      desc={row.desc}
                      isValid={row.isValid}
                      selected={selected.indexOf(row.pid) !== -1}
                      handleClick={(event) => handleClick(event, row.pid)}
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

      <PermAddDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
      />
    </Container>
  );
}
