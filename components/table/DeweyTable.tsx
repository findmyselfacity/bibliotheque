import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell,
} from '@mui/material';
import React from 'react';

function DeweyTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dewey Decimal #</TableCell>
            <TableCell align="right">BookTitle</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Link</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}

export default DeweyTable;
