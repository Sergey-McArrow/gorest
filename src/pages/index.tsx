import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { Button } from '@mui/material'


export default function Home() {
  return (
    <>
      <Head>
        <title>GoRest</title>
        <meta name="description" content="Fetching data forkm gorestA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Button variant='contained' color='info'>
          <Link href='./users/1'>Go to Users</Link>
        </Button>
      </main>
    </>
  )
}
