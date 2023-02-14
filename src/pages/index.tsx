import Head from 'next/head'
import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()
  const a = 123
  return (
    <>
      <Head>
        <title>GoRest</title>
        <meta name="description" content="Fetching data from gorestAPI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="odw3dKtpnluljCPThiY9P-UY93Y_PncM-mwLu7Zi628" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <Typography variant='h4' component='h1' textAlign='center' color='ThreeDLightShadow'>Here is the app for get & edit users data from FakeApi </Typography>
        <Button variant='contained' color='info' onClick={() => router.push('/users')}>
          Go to Users
        </Button>
      </main>
    </>
  )
}
