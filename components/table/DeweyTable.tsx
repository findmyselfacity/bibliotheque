import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import React from 'react';
import { bookList } from './sampledata'
import { BookInfo } from './types';

function DeweyTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Dewey Decimal #</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookList
          .sort((a: BookInfo, b: BookInfo) => (a.title.localeCompare(b.title)))
          .map((book, index) => <TableRow key={index}>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.deweyDecimal}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DeweyTable;
