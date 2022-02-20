import Head from 'next/head'
import Navbar from '../components/Navbar'
import Home from '../components/home/home'

export default function Index() {
  return (
    <div className="font-inter flex min-h-screen flex-col items-center justify-start py-2 bg-gradient-to-br from-black via-grey-500 to-white">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="http://fonts.cdnfonts.com/css/clash-display" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar></Navbar>
      <Home></Home>
    </div>
  )
}
