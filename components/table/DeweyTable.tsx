import {
  TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BookInfo } from './types';

type Props = {
  books: BookInfo[];
}

function DeweyTable({ books }: Props) {
  const [rows, setRows] = useState<BookInfo[]>([]);
  const [sortOrderTitle, setSortOrderTitle] = useState<string>('asc');
  const [sortOrderAuthor, setSortOrderAuthor] = useState<string>('asc');
  const [sortOrderDeweyDecimal, setSortOrderDeweyDecimal] = useState<string>('asc');

  useEffect(() => {
    const sortedRow = books.sort((a: BookInfo, b: BookInfo) => (a.author.localeCompare(b.author)));
    setRows(sortedRow);
  }, [books]);

  const handleSort = (key: 'title' | 'author' | 'deweyDecimal', sortOrder: string, setSortOrder: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: string): void; }) => {
    const sortedRow = books.sort((a: BookInfo, b: BookInfo) => {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
        return (a[key].localeCompare(b[key]));
      }
      setSortOrder('asc');
      return (b[key].localeCompare(a[key]));
    });
    setRows(sortedRow);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort('title', sortOrderTitle, setSortOrderTitle)}>Title</TableCell>
            <TableCell onClick={() => handleSort('author', sortOrderAuthor, setSortOrderAuthor)}>Author</TableCell>
            <TableCell onClick={() => handleSort('deweyDecimal', sortOrderDeweyDecimal, setSortOrderDeweyDecimal)}>Dewey Decimal #</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .map((book) => (
              <TableRow key={`${book.title}`}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.deweyDecimal}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DeweyTable;
