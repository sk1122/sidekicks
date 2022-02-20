import Head from 'next/head'
import Leaderboard from '../Leaderboard'

export default function HowWorks() {
  return (
    <div className="text-white flex w-full h-screen items-center justify-between py-2 space-y-3 snap-start">
      <div className='flex w-full h-[65vh] flex-col items-start justify-center py-2 space-y-3 px-16'>
        <h1 className='text-white font-clash font-bold text-4xl md:text-6xl xl:text-8xl w-4/5'>HOW THIS WORKS?</h1>
        <h1 className='text-white font-inter font-semibold text-xl lowercase cursor-pointer'>{`Follow this all -->`}</h1>
      </div>
      <div className='flex w-1/2 flex-col items-start justify-center space-y-3 px-16 font-bold text-xl'>
		  <h1>Buidl Side Project</h1>
		  <h1>Upload on Kicks with Crypto</h1>
		  <h1>Share Link</h1>
		  <h1>Product Lovers will give you crypto with kicks</h1>
      </div>
    </div>
  )
}
