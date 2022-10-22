import { test, expect } from '@playwright/test';

const books = [
  {
    url: 'https://bookshop.org/p/books/tenements-towers-trash-an-unconventional-illustrated-history-of-new-york-city-julia-wertz/113878?ean=9780316501217',
  // }, {
  //   url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRhyIlYNtezFcMITyUVZxykV8Uhrcqpd_XMI492WljU1_M2slwr',
  // }, {
  //   url: 'https://wwnorton.com/books/9780393733075',
  // }, {
  //   url: 'https://www.abebooks.com/Kindness-Strangers-Travel-Stories-Heart-Grow/31071327871/bd?cm_mmc=ggl-_-US_Shopp_Trade0to10-_-product_id=COM9781786855312USED-_-keyword=&gclid=Cj0KCQjwhsmaBhCvARIsAIbEbH5JPnMZFpuM7FsOXuAj0fm9UBjTGRRYIipq_aNYsQr7KOQ_cV64NLIaAqCfEALw_wcB',
  // }, {
  //   url: 'https://www.amazon.com/Greenpoint-Brooklyns-Forgotten-Past-Geoffrey/dp/1512256625?ref=d6k_applink_bb_dls&dplnkId=92612192-58c5-4409-ba64-d6661e03051d',
  // }, {
  //   url: 'https://www.barnesandnoble.com/w/country-plumbing-gerry-hartigan/1112606522',
  // }, {
  //   url: 'https://www.biblio.com/book/you-please-quiet-please-carver-raymond/d/1292331716?aid=frg',
  // }, {
  //   url: 'https://www.goodreads.com/book/show/333690.365_Days',
  // }, {
  //   url: 'https://www.thriftbooks.com/w/rigger-a-memoir-from-high-school-to-high-steel/9391355/#isbn=0692287035&idiq=37116444',
  // }, {
  //   url: 'https://www.thriftbooks.com/w/the-great-houdini-magician-extraordinary/13493456/item/29063475/?gclid=Cj0KCQjwhsmaBhCvARIsAIbEbH5Bc0KoWZ6pqs1EjX-0VmGSzoOQOFqpTNUghdX6H_CAlV0vp6ANC-oaAg8zEALw_wcB#idiq=29063475&edition=13155882',
  // }, {
  //   url: 'https://a.co/d/bZ3XLPU',
  },
];

const bookImport = [];

books.forEach(({ url }, currentBookIndex) => {
  test(`should extract book info ${url}`, async ({ page }) => {
    const book = {
      author: '',
      isbn: '',
      pageTitle: '',
      title: '',
      url,
      deweyDecimalClassification: '',
      upc: '',
      ddc: {
        mostPopular: [],
        mostRecent: [],
        latestEdition: [],
      },
    };
    await page.goto(url);

    book.pageTitle = await page.title();
    // console.log('book', book);
    expect(book.pageTitle).toBeTruthy();
    book.title = book.pageTitle.replace(/ by .*/, '');
    book.author = book.pageTitle.replace(/.* by /, '');

    bookImport[currentBookIndex] = book;

    book.isbn = '9780911469349';
    // TODO: extract the ISBN if possible
    book.isbn = await page.getByLabel('isbn').innerText();
    book.upc = await page.getByLabel('upc').innerText();

    console.log(JSON.stringify(book, null, 2));

    await page.goto(`http://classify.oclc.org/classify2/Classify?isbn=${book.isbn}&summary=true`);

    // Extract the Dewey Decimal Classification (DDC) if possible
    book.ddc = (await page.$$eval('ddc', (ddcs) => ddcs.map((ddc) => ({
      mostPopular: ddc.querySelector('mostPopular')?.getAttribute('nsfa'),
      mostRecent: ddc.querySelector('mostRecent')?.getAttributeNames(),
      latestEdition: ddc.querySelector('latestEdition')?.getAttributeNames(),
    }))));

    console.log('book', book);
  });
});

test.afterAll(() => {
  // TODO: each worker has it's own part of the array
  // console.log(JSON.stringify(bookImport, null, 2));
});