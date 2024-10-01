import { Skeleton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
// import { PaginationType } from "../../types/CommonType";
import moment from "moment";
import { SingleUserResponse } from "../../types/AuthType/UserType";
import UserAPI from "../../utils/UserAPI";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2fddf0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#81d4fa",
  },
}));

export default function ListUser() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [listUser, setListUser] = React.useState<SingleUserResponse[] | []>([]);
  // const [pagination, setPagination] = React.useState<PaginationType>({
  //   pageNumber: 1,
  //   pageSize: 10,
  //   totalItem: 10,
  //   totalPage: 1,
  // });
  const [filter, setFilter] = React.useState<any>({
    page: 1,
    size: 10,
  });
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   console.log(newPage);
  //   setFilter((prev: any) => ({ ...prev, page: newPage + 1 }));
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setFilter((prev: any) => ({ ...prev, page: 1, size: +event.target.value }));
  // };

  const fetchAllUser = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await UserAPI.getAll(filter);
      setListUser(data.result);
      // setPagination({
      //   pageNumber: data.page,
      //   pageSize: data.size,
      //   totalItem: data.total,
      //   totalPage: data.totalPages,
      // });
    } catch (error) {
      console.log("Error get list User: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);
  React.useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  return (
    <Paper sx={{ p: 3 }}>
      <TableContainer component={Paper} sx={{ minHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Họ Và Tên</StyledTableCell>
              <StyledTableCell align="center">Tên Đăng Nhập</StyledTableCell>
              <StyledTableCell align="center">Ngày sinh</StyledTableCell>
              <StyledTableCell align="center">Vai trò</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUser.length === 0 && isLoading === false && (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="left">
                  <Typography align="center">Không có dữ liệu!</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {isLoading &&
              Array.from({ length: 10 }).map((data, index) => (
                <StyledTableRow hover={true} key={index}>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton variant="rectangular" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {listUser.length > 0 &&
              isLoading === false &&
              listUser.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {/* {(pagination.pageNumber - 1) * pagination.pageSize + index + 1} */}
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.lastName  + " "+ row.firstName}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"

                    // sx={{
                    //   overflow: "hidden",
                    //   textOverflow: "ellipsis",
                    //   whiteSpace: "nowrap",
                    //   maxWidth: "250px",
                    // }}
                  >
                    {row.username}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.dob ? moment(row.dob).format("DD/MM/YYYY") : "Chưa cập nhật"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.roles[0].name === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pagination.totalItem}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageNumber - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Hàng trên trang"
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}–${to} / ${count !== -1 ? count : `nhiều hơn ${to}`}`;
        }}
      /> */}
    </Paper>
  );
}
