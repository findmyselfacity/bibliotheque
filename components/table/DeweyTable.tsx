import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import React from 'react';
import { bookList } from './sampledata'


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
        <TableBody>
          {bookList.map((book, index) => <TableRow key={index}>
            <TableCell>{book.deweyDecimal}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.subject}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DeweyTable;
