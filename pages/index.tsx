import React from 'react';
// import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Button from '@mui/material/Button';

import styles from '../styles/Home.module.css';
import DewTable from '../components/table/table';

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
          Organize your library with the <br /><a target="_blank" href="https://en.wikipedia.org/wiki/List_of_Dewey_Decimal_classes">Dewey Decimal System!</a>
        </h2>

        <DewTable></DewTable>
        
      </main>
      
    </div>
  );
}

export default Home;
