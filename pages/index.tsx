import Head from 'next/head'

import Home from '../components/home/home'
import TopKick from '../components/home/topkick'
import ThisKick from '../components/home/thisweek'
import HowWorks from '../components/home/howworks'

export default function Index() {
  return (
    <div className="snap-scroll flex min-h-screen flex-col items-center justify-start bg-black py-2 font-inter">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="http://fonts.cdnfonts.com/css/clash-display"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Home></Home>
      <TopKick></TopKick>
      <ThisKick></ThisKick>
      <HowWorks></HowWorks>
    </div>
  )
}
