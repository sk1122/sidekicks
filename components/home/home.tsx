import Head from 'next/head'
import Circle from '../Circle'

export default function Home() {
  return (
    <div className="text-white flex w-full h-[80vh] flex-col items-center justify-center py-2 space-y-3 scroll-snap">
      <div className='flex w-full h-[65vh] flex-col items-center justify-center py-2 space-y-3'>
        <h1 className='text-white font-clash font-bold text-4xl md:text-6xl xl:text-8xl'>CREATE GREAT SIDE KICKS</h1>
        <h1 className='text-white font-inter font-semibold text-xl lowercase'>And Get supported with Crypto Kicks</h1>
        <div className='flex flex-col justify-center items-center'>
          <span className='line-through text-xl'>upvote</span>
          <span className='text-xl'>support with crypto</span>
        </div>
      </div>
      
      <div className='absolute top-10 md:top-20 xl:top-36'>
        <Circle text='' title='Projects Funded' number='20+'></Circle>
      </div>
      <div className='absolute left-10 md:left-20 xl:left-36'>
        <Circle text='' title='Projects of the Day' number='Image'></Circle>
      </div>
      <div className='absolute right-10 md:right-20 xl:right-48'>
        <Circle text='' title='Top Project' number='Image'></Circle>
      </div>

      <div className='flex-end'>
        <h1 className='text-white font-inter font-semibold text-xl lowercase cursor-pointer'>{`explore kicks -->`}</h1>
      </div>
    </div>
  )
}
