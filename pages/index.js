import Head from 'next/head'
import BuildForm from '../components/BuildForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Build VM UI</title>
        <meta name="description" content="deploy a VM from vCenter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BuildForm />
    </>
        
  )
}
