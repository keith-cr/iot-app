import Head from 'next/head';
import styles from '../styles/Home.module.css';

const globalStyle = `
html, body {
  overflow: hidden;
}
`;

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>IOT Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{globalStyle}</style>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Coming Soon
        </h1>
      </main>
    </div>
  );
}
