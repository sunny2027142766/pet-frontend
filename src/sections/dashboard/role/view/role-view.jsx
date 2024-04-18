import { useState } from "react";
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
} from "@mui/material";

import { users } from "src/_mock/user";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";

import TableNoData from "../table-no-data";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import TableEmptyRows from "../table-empty-rows";
import UserTableToolbar from "../user-table-toolbar";

import { emptyRows, applyFilter, getComparator } from "../utils";
import UserAddDialog from "../add/user-add-dialog";

// ----------------------------------------------------------------------

export default function RolePage() {
  const [page, setPage] = useState(0);

  // 选中的数据
  const [selected, setSelected] = useState([]);
  // 排序
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  //
  const [addOpen, setAddOpen] = useState(false);

  const tableRes = {
    data: [
      {
        id: "1",
        username: "张三",
        password: "123456",
        email: "zhangsan@example.com",
        phone: "13812345678",
        role: "管理员",
        isValid: 1,
        avatarUrl:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      },
      {
        id: "2",
        username: "李四",
        password: "123456",
        email: "lisi@example.com",
        phone: "13812345678",
        role: "普通用户",
        isValid: 1,
        avatarUrl:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      },
    ],
    total: 15,
  };
  const { data: tableData, total } = tableRes;

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };
  // 全选
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((data) => data.id);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

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
          添加用户
        </Button>
      </Stack>
      <UserAddDialog open={addOpen} onClose={() => setAddOpen(false)} />

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={total}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "username", label: "用户名" },
                  { id: "password", label: "密码" },
                  { id: "email", label: "邮箱" },
                  { id: "phone", label: "电话" },
                  { id: "role", label: "角色" },
                  { id: "isValid", label: "状态" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {tableData.map((row) => (
                  <UserTableRow
                    key={row.id}
                    username={row.username}
                    avatarUrl={row.avatarUrl}
                    password={row.password}
                    email={row.email}
                    phone={row.phone}
                    role={row.role}
                    isValid={row.isValid}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(event) => handleClick(event, row.id)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          labelRowsPerPage="每页行数"
          count={total}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
