import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const books = [
  ["9780140074512","9780140074512","EAN_13","1666466035550","22 oct. 2022 15 h 13 min 55 s","Google How to Become Ridiculously Well-read in One Evening [E. O. Parrott] [188pp.]"],
  ["9780140086416","9780140086416","EAN_13","1666465730747","22 oct. 2022 15 h 08 min 50 s","Google Later the Same Day [Grace Paley] [211pp.]"],
  ["9780316010795","9780316010795","EAN_13","1666465974061","22 oct. 2022 15 h 12 min 54 s","Google Dress Your Family in Corduroy and Denim [David Sedaris] [272pp.]"],
  ["9780316501217","9780316501217","EAN_13","1666465674451","22 oct. 2022 15 h 07 min 54 s","Google Tenements, Towers & Trash [Julia Wertz] [284pp.]"],
  ["9780316779425","9780316779425","EAN_13","1666465992434","22 oct. 2022 15 h 13 min 12 s","Google Barrel Fever [David Sedaris] [212pp.]"],
  ["9780393733075","9780393733075","EAN_13","1666465529304","22 oct. 2022 15 h 05 min 29 s","Google Garden Guide: New York City (Revised Edition) [Nancy Berner, Susan Lowry] [425pp.]"],
  ["9780394754390","9780394754390","EAN_13","1666466023223","22 oct. 2022 15 h 13 min 43 s","Google Platitudes [Trey Ellis] [183pp.]"],
  ["9780688052850","9780688052850","EAN_13","1666466003444","22 oct. 2022 15 h 13 min 23 s","Google Whad'ya Know? [Michael Feldman] [159pp.]"],
  ["9780692287033","9780692287033","EAN_13","1666465647252","22 oct. 2022 15 h 07 min 27 s","Google Rigger [Larry James Neff] [158pp.]"],
  ["9780849934025","9780849934025","EAN_13","1666465826097","22 oct. 2022 15 h 10 min 26 s","Google My Life as a Smashed Burrito with Extra Hot Sauce [Bill Myers] [184pp.]"],
  ["9780914457015","9780914457015","EAN_13","1666466059644","22 oct. 2022 15 h 14 min 19 s","Google The Complete Book of Beer Drinking Games (and Other Really Important Stuff) [Andy Griscom, Randy Rand, Scott Johnston] [127pp.]"],
  ["9780940322776","9780940322776","EAN_13","1666465811382","22 oct. 2022 15 h 10 min 11 s","Google Renoir, My Father [Jean Renoir] [472pp.]"],
  ["9781512256628","9781512256628","EAN_13","1666465767501","22 oct. 2022 15 h 09 min 27 s","Google Greenpoint Brooklyn's Forgotten Past [Geoffrey Cobb] [390pp.]"],
  ["9781550593327","9781550593327","EAN_13","1666466090151","22 oct. 2022 15 h 14 min 50 s","Google Wolves in Russia [Will N. Graves] [232pp.]"],
  ["9781786855312","9781786855312","EAN_13","1666465607785","22 oct. 2022 15 h 06 min 47 s","Google The Kindness of Strangers [Fearghal O Nuallain] [320pp.]"],
  ["9781896597089","9781896597089","EAN_13","1666465951808","22 oct. 2022 15 h 12 min 31 s","Google No Love Lost [Ariel Bordeaux] [52pp.]"],
];

const detailsRegex = /Google ([^[]*) \[([^\]]*)\] \[([^\]]*)pp\.\]/;
const outDirectory = 'data';
const outFile = 'books.json';

test.beforeAll(() => {
  try {
    fs.mkdirSync(path.join(outDirectory));
  } catch (err) {
    if (!err || err?.code === 'EEXIST') {
      return;
    }
    if (err) {
      throw err;
    }
  }
});

books.forEach((row, currentRow) => {
  test(`should extract book info ${row[0]}`, async ({ page }) => {
    // console.log('row', row);
    // Extract the info from the row
    const [isbn, again, format, stuff, importDate, details] = row;
    expect(isbn.length).toBeGreaterThan(3);

    // Extract the info from the details
    const matches = detailsRegex.exec(details);
    // console.log('matches', matches);
    const [entireMatch, title, author, pages] = matches;
    expect(title.length).toBeGreaterThan(3);
    expect(author.length).toBeGreaterThan(3);
    expect(pages.length).toBeGreaterThan(1);

    const book = {
      author,
      isbn,
      title,
      pages: parseInt(pages, 10),
      deweyDecimal: '',
    };

    await page.goto(`http://classify.oclc.org/classify2/Classify?isbn=${book.isbn}&summary=true`);

    // Extract the Dewey Decimal Classification (DDC) if possible
    const deweyDecimalExtraction = (await page.$$eval('ddc', (ddcs) => ddcs.map((ddc) => ({
      mostPopular: ddc.querySelector('mostPopular')?.getAttribute('nsfa'),
      mostRecent: ddc.querySelector('mostRecent')?.getAttributeNames(),
      latestEdition: ddc.querySelector('latestEdition')?.getAttributeNames(),
    }))));
    book.deweyDecimal = deweyDecimalExtraction[0]?.mostPopular ?? '';
    const result = JSON.stringify(book);
    console.log('book', result);
    fs.appendFileSync(path.join(outDirectory, outFile), `${result}${currentRow < books.length ? ', \n' : ''}`);
  });
});

test.afterAll(() => {
  // cant close the json file because this is executed by each worker
  // fs.appendFileSync(path.join(outDirectory, outFile), '}');
});
