import { Box, Collapse, IconButton, Skeleton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
// import MenuActionPermission from "../../components/manager/MenuAction/MenuActionPermission";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModalCreatePermission from "../../components/home/Note/CreateNewNote";
import { PermissionType } from "../../types/Permission/PermissionType";
import RoleAPI from "../../utils/PermissionAPI";

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
  "&:nth-of-type(odd)": {
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

const RenderTableRow: React.FC<PermissionType & {index: number}> = ({name, description, permissions, index}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell size="small" align="center">{index + 1}</TableCell>
        <TableCell  size="small" align="center">{name}</TableCell>
        <TableCell  size="small" align="center">{description}</TableCell>
        <TableCell  size="small" align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Quyền
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Tên</StyledTableCell>
                    <StyledTableCell>Mô tả</StyledTableCell>                 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissions.map((p) => (
                    <TableRow key={p.name}>
                      <TableCell component="th" scope="row">
                        {p.name}
                      </TableCell>
                      <TableCell>{p.description}</TableCell>                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function ListPermission() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModalCreate, setShowModalCreate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const [showModalUpdate, setShowModalUpdate] = React.useState(false);
  // const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [listPermission, setListPermission] = React.useState<
    PermissionType[] | []
  >([]);
  // const [pagination, setPagination] = React.useState<PaginationType>({
  //   pageNumber: 1,
  //   pageSize: 10,
  //   totalItem: 10,
  //   totalPage: 1,
  // });
  // const [searchName, setSearchName] = React.useState("");
  const [filter, setFilter] = React.useState<any>({
    page: 1,
    size: 10,
  });
  const [selectedPermission, setSelectedPermission] = React.useState<
    any | null
  >(null);
  // const debouncedInputValue = useDebounce(searchName, 1000); // Debounce with 1000ms delay
  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setFilter((prev) => ({ ...prev, page: newPage + 1 }));
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setFilter((prev) => ({ ...prev, page: 1, size: +event.target.value }));
  // };
  // const handleSearchName = (name: string) => {
  //   setSearchName(name);
  // };
  const fetchAllPermission = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await RoleAPI.getAll(filter);
      console.log({ data });
      setListPermission(data.result);
      // setPagination({
      //   pageNumber: 1,
      //   pageSize: 1,
      //   totalItem: 1,
      //   totalPage: 1
      // });
    } catch (error) {
      console.log("Error get list Permission: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);
  React.useEffect(() => {
    fetchAllPermission();
  }, [fetchAllPermission]);
  // React.useEffect(() => {
  //   setFilter((prev) => ({ ...prev, Name: debouncedInputValue }));
  // }, [debouncedInputValue]);
  return (
    <Paper sx={{ p: 3 }}>
      {/* <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={3}
          sx={{ mb: 3, mt: 2 }}
        >
          <TextField
            size="small"
            placeholder="Nhập tên thể loại..."
            label="Tìm kiếm"
            value={searchName}
            onChange={(e) => handleSearchName(e.target.value)}
            sx={{ width: "345px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "345px" }} size="small">
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter.Status}
                label="Trạng thái"
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    Status: e.target.value as string,
                  }))
                }
              >
                <MenuItem value={""}>Tất cả</MenuItem>
                <MenuItem value={"ACTIVE"}>Đang hoạt động</MenuItem>
                <MenuItem value={"INACTIVE"}>Ngưng hoạt động</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Button
          variant="contained"
          color="info"
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#33eaff",
            color: "black",
            borderRadius:"15px"
          }}
          onClick={() => {
            setShowModalCreate(true);
          }}
        >
          Thêm
        </Button>
      </Stack> */}

      <TableContainer component={Paper} sx={{ minHeight: 600 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Tên</StyledTableCell>
              <StyledTableCell align="center">Mô tả</StyledTableCell>
              <StyledTableCell align="center">Chi tiết</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPermission.length === 0 && isLoading === false && (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="left">
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
                </StyledTableRow>
              ))}
            {listPermission.length > 0 &&
              isLoading === false &&
              listPermission.map((row, index) => (
               <RenderTableRow name={row.name} description={row.description} permissions={row.permissions} key={row.name} index={index} />
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
      <ModalCreatePermission
        open={showModalCreate}
        setOpen={setShowModalCreate}
        fetchListNotes={fetchAllPermission}
      />

      {/* {selectedPermission && <ModalUpdatePermission
        open={showModalUpdate}
        setOpen={setShowModalUpdate}
        fetchAllPermission={fetchAllPermission}
        data={selectedPermission}
      />}
      {selectedPermission && <ModalDeletePermission
        open={showModalDelete}
        setOpen={setShowModalDelete}
        fetchAllPermission={fetchAllPermission}
        data={selectedPermission}
      />} */}
    </Paper>
  );
}
