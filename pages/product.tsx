import Navbar from '../components/Navbar'
import { ProductInfo } from '../components/productpage/projectinfo'
import { ImageGallary } from '../components/productpage/imagegallary'
import { Description } from '../components/productpage/description'
import { CryptoKick } from '../components/CryptoKick'
import Head from 'next/head'
import { Team } from '../components/teams'
const ProductPage = () => {
  return (
    <>
      <Head>
        <title>sidekicks</title>
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
      <div className="h-[100%] w-[100%] bg-black font-inter">
        <div className=" m-auto h-full w-[95%] ">
          <div>
            <ProductInfo />
            <div className="flex justify-center">
              <ImageGallary />
              <div className=" sticky top-4 ml-[20px] flex flex-col items-center justify-between">
                <Description />
                <CryptoKick />
                <Team />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPage
