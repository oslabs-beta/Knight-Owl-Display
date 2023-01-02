import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



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
  if (limiter === 'DepthLimiter') color = 'seagreen';
  if (limiter === 'RateLimiter') color = 'dodgerblue';
  if (limiter === 'CostLimiter') color = 'firebrick';
  
  return { date, querystring, ip, limiter, color };
}

const rows = [
  createData('1/2/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/13/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/14/2023', '[GraphQL Query]', '135.237.108.247', 'RateLimiter'),
  createData('1/15/2023', '[GraphQL Query]', '135.237.108.247', 'CostLimiter'),
  createData('1/16/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/16/2023', '[GraphQL Query]', '133.132.234.525', 'RateLimiter'),
  createData('1/17/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '182.456.345.123', 'CostLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '125.237.108.247', 'CostLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/13/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/14/2023', '[GraphQL Query]', '135.237.108.247', 'RateLimiter'),
  createData('1/15/2023', '[GraphQL Query]', '135.237.108.247', 'CostLimiter'),
  createData('1/16/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/16/2023', '[GraphQL Query]', '133.132.234.525', 'RateLimiter'),
  createData('1/17/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '182.456.345.123', 'CostLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '135.237.108.247', 'DepthLimiter'),
  createData('1/4/2023', '[GraphQL Query]', '125.237.108.247', 'CostLimiter'),
];

export default function QueryLog() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }} style={{border: 'transparent', height:'90%'}}>
      <TableContainer  sx={{ maxHeight: "100vh" }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.querystring}</TableCell>
                    <TableCell align="right">{row.ip}</TableCell>
                    <TableCell id="limiter" align="right" style={{ color: row.color }}>
                      {row.limiter}
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