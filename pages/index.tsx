import React from 'react';
import Head from 'next/head';

import styles from '../styles/Home.module.css';
import DeweyTable from '../components/table/DeweyTable';

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bibliotheque</title>
        <meta name="description" content="made by mmg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>
          Organize your library with the
          {' '}
          <br />
          <a target="_blank" href="https://en.wikipedia.org/wiki/List_of_Dewey_Decimal_classes" rel="noreferrer">Dewey Decimal System!</a>
        </h2>

        <DeweyTable />

      </main>

    </div>
  );
}

export default Home;
