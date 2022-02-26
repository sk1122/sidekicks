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

const ProductPage = () => {
	const [project, setProject] = useState<any>()
	const [loading, setLoading] = useState(true)
	const [images, setImages] = useState([])
	
	const { id } = useRouter().query
	const { getProject, getImages } = useAccountContext()

	useEffect(() => {
		(async () => {
			try {
				setLoading(true)
				console.log(Number(id))
				setProject(await getProject(Number(id)))
				setLoading(false)
			} catch (e) {
				setLoading(true)
			} 
		})()
	}, [id])
	
	useEffect(() => {
		(async () => {
			if(project && project[1]) {
				setImages(await getImages(project[1].id))
				console.log(project)
			}
		})()
	}, [project])

	// useEffect(() => console.log(loading && project && project[1] && images !== []), [images])

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
              	<ProductInfo title={project[1].title} description={project[1].tagline} images={images} />
							}
							{!loading && project && project[1] && images !== [] && 
								<div className="flex justify-center">
									<ImageGallary images={images} />
									<div className="w-1/2 sticky top-4 ml-[20px] flex flex-col items-start justify-between">
											<Description desc={project[1].description} />
										<CryptoKick />
										<Team />
									</div>
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
