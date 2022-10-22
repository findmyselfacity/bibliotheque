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
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <DewTable />
        <Button className={styles.description}>
          Get started by editing
          {' '}
          <code className={styles.code}>pages/index.tsx</code>
        </Button>

        
      </main>

      
    </div>
  );
}

export default Home;
