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
  const [listPermission, setListPermission] = React.useState<
    PermissionType[] | []
  >([]);
  const [filter, setFilter] = React.useState<any>({
    page: 1,
    size: 10,
  });
  const fetchAllPermission = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await RoleAPI.getAll(filter);
      console.log({ data });
      setListPermission(data.result);
    } catch (error) {
      console.log("Error get list Permission: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);
  React.useEffect(() => {
    fetchAllPermission();
  }, [fetchAllPermission]);

  return (
    <Paper sx={{ p: 3 }}>
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
    </Paper>
  );
}
