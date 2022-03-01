import Head from "next/head";
import { ProductCard } from "../components/productlist/productCard";

import { useState, useEffect } from "react";
import { useAccountContext } from "./_context";
import { useAccount } from "wagmi";

const ProductList = () => {
    const { getAllProjects, getImages, setAccount } = useAccountContext()
    const [data, setData] = useState([])
    const [image, setImage] = useState([])

    const [{ data: accountData, error, loading }, disconnect] = useAccount()

    useEffect(() => {
        setAccount(accountData?.address)
    }, [accountData])

    useEffect(() => {
        (async () => {
            setData(await getAllProjects())
        })()
    }, [])

    useEffect(() => console.log(data, "dsadas"), [data])

    return (
        <>
            <Head>
                <title>Products - sidekicks</title>
            </Head>
            <div className="h-full w-screen bg-black">
                <div className="p-4 m-auto h-full w-[90%] ">
                    <div className="lg:m-auto justify-center lg:flex flex-wrap max-w-[1000px] 2xl:max-w-full">
                        {data ? data.map((product: any) => {
                            product = product[0]
                            var image: any;
                            (async () => {
                                image = await getImages(product.id)
                                // console.log(image)
                            })()
                            return <ProductCard key={product.id} id={product.projectId} title={product.title} description={product.description} tagline={product.tagline} image={product.images} />
                        }) : <div className="w-[100vw] flex justify-center items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> 
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>

    )
}


export default ProductList;