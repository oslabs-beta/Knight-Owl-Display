import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { v4 as uuidv4 } from 'uuid';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'querystring', label: 'Query String', minWidth: 100 },
  {
    id: 'ip',
    label: 'IP Address',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'limiter',
    label: 'Limiter',
    minWidth: 170,
    align: 'right',
  },
]

function createData(date, querystring, ip, limiter) {
  let color;
  let name;
  if (limiter === 'depth_limiter'){
     color = 'seagreen';
     name = 'Depth Limiter'
    }
  if (limiter === 'rate_limiter') {
    color = 'dodgerblue'
    name = 'Rate Limiter'
  };
  if (limiter === 'cost_limiter') {
    color = 'firebrick'
    name = 'Cost Limiter'
  };
  
  return { date, querystring, ip, name, color };
};

export default function QueryLog(props) {
  const rows = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const mapQueryData = (queries) => {
    for (let query of queries) {
      const {
        querier_ip_address,
        query_string,
        rejected_by,
        rejected_on
      } = query;
     rows.push(
        createData(
        `${new Date(Number(rejected_on))}`,
        `${query_string}`,
        `${querier_ip_address}`,
        `${rejected_by}`,
      ));
    }
    return;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (props.queryData.queries !== undefined) {
    mapQueryData(props.queryData.queries);
  }

  return (
    <Paper sx={{ width: '99%' }} style={{border: 'transparent', height:'100vh', borderRadius: '20px'}}>
      <TableContainer  
        sx={{ maxHeight: "100vh" }} 
        style={{border: 'transparent', 
        height:'100vh', 
        borderRadius: '20px',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                Query Log
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(rows.length / 2)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.querystring}</TableCell>
                    <TableCell align="right">{row.ip}</TableCell>
                    <TableCell id="limiter" align="right" style={{ color: row.color }}>
                      {row.name}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}