import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { bookList } from './sampledata'
import { BookInfo } from './types';

function DeweyTable() {
  const [rows, setRows] = useState<BookInfo[]>([])
  useEffect(() => {
    const sortedRow = bookList.sort((a: BookInfo, b: BookInfo) => (a.author.localeCompare(b.author)))
    setRows(sortedRow);
  }, []);

  const handleSort = (key: 'title' | 'author') => {
    const sortedRow = bookList.sort((a: BookInfo, b: BookInfo) => (a[key].localeCompare(b[key])))
    setRows(sortedRow);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort('title')}>Title</TableCell>
            <TableCell onClick={() => handleSort('author')}>Author</TableCell>
            <TableCell>Dewey Decimal #</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((book, index) => <TableRow key={`${index}-${book.title}`}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.deweyDecimal}</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DeweyTable;
