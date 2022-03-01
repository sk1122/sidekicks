import Head from 'next/head'
import Home from '../components/home/home'
import TopKick from '../components/home/topkick'
import ThisKick from '../components/home/thisweek'
import HowWorks from '../components/home/howworks'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { useAccountContext } from './_context'

export default function Index() {
  const { setAccount } = useAccountContext()
  const [{ data, error, loading }, disconnect] = useAccount()

  useEffect(() => {
    setAccount(data?.address)
  }, [data])

  return (
    <div className="snap-scroll flex min-h-screen flex-col items-center justify-start bg-black py-2 font-inter">
      <Head>
        <title>sidekicks</title>
      </Head>
      <Home></Home>
      <TopKick></TopKick>
      <ThisKick></ThisKick>
      <HowWorks></HowWorks>
    </div>
  )
}
