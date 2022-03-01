import Navbar from '../../components/Navbar'
import { ProductInfo } from '../../components/productpage/projectinfo'
import { ImageGallary } from '../../components/productpage/imagegallary'
import { Description } from '../../components/productpage/description'
import { CryptoKick } from '../../components/CryptoKick'
import Head from 'next/head'
import Footer from '../../components/Footer'
import { Team } from '../../components/teams'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAccountContext } from '../_context'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const ProductPage = () => {
	const [project, setProject] = useState<any>()
	const [loading, setLoading] = useState(true)
	const [images, setImages] = useState([])
	const [myValue, setMyValue] = useState(0)
	const { getProject, getImages, myContributions, account, setAccount } = useAccountContext()

	const [{ data: accountData, error, loading: accountLoading }, disconnect] = useAccount()

    useEffect(() => {
		console.log(error)
        setAccount(accountData?.address)
    }, [accountData])
	
	const { id } = useRouter().query

	useEffect(() => {
		(async () => {
			try {
				setLoading(true)
				setProject(await getProject(Number(id)))
				setLoading(false)
			} catch (e) {
				setLoading(true)
			}
		})()
	}, [id])

	useEffect(() => {
		(async () => {
			if (project && project[1]) {
				setImages(await getImages(project[1].id))
			}
		})()
	}, [project])

	useEffect(() => {
		(async () => {
			if(account && account.length !== 0) {
				console.log("123")
				setMyValue(await myContributions(Number(id)))
			}
		})()
	}, [account])

	useEffect(() => console.log(myValue, "Value"), [myValue])
	useEffect(() => console.log(account, "Account"), [account])

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
      <div className="bg-black">
        <div className="h-[100%] w-[100%] bg-black font-inter">
          <div className=" m-auto h-full w-[95%] ">
            <div>
				{!loading && project && project[1] && images !== [] && 
					<div className='flex justify-between items-center'>
						<ProductInfo title={project[1].title} description={project[1].tagline} images={images} />
						<p className='text-white'>Your Contributions - {ethers.utils.formatEther(myValue.toString())} MATIC</p>
					</div>
				}
				{!loading && project && project[1] && images !== [] && 
					<div className="flex justify-center">
						<ImageGallary images={images} />
						<div className="w-1/2 sticky top-4 ml-[20px] flex flex-col items-start justify-between">
								<Description desc={project[1].description} />
							<CryptoKick id={Number(id)} />
							<Team creators={project[1].makers} />
						</div>
					</div>
				}
				{loading && 
					<div className="w-[100vw] flex justify-center items-center">
						<svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg> 
					</div>
				}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductPage
