export interface BookInfo {
    deweyDecimal: number | string;
    author: string;
    isbn: string;
    subject?: string;
    title: string;
    pages: number;
  }