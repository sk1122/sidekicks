import Head from "next/head";
import { useEffect, useState } from "react";
import Link from 'next/link'

interface Props {
    id: string
    title: string
    description: string
    image: string
    tagline?: string
}

export const ProductCard = ({ id, title, description, image, tagline }: Props) => {

    const MAX_lENGTH = 1000;
    const text = description;
    const pera = text.length > MAX_lENGTH ? <p>{text.substring(0, MAX_lENGTH)} ...<a href="">Read More</a></p> : <p>{text}</p>

    useEffect(() => {
      console.log(image)
    }, [image])
    

    return (
        <>
            <Head>
                <title>{title} - sidekicks</title>
            </Head>
            <div className="rounded-xl font-inter mycard text-white border-[1px]  min-h-[600px] h-full border-white w-full  m-auto max-w-[400px] 2xl:mx-[25px] mb-[35px]">
                <div className="rounded-xl">
                    <img src={image} alt="Image not available" className="text-white w-full h-96 rounded-xl" />
                </div>
                <div className="flex justify-between min-h-[400px] grow-1 shrink-0  flex-col  p-4">
                    <div>
                        <h2 className=" opacity-75 text-bolder mb-3 text-[1.3rem]">{title} </h2>
                        <p className="opacity-80 text-[.9rem] text-justify">{tagline}</p>
                        <p className="opacity-80 text-[.9rem] mt-5 text-justify">{pera}</p>
                    </div>
                    <Link href={`product/${id}`}>
                        <button className="rounded-lg block text-center bg-[#5451FF] py-3 px-2 w-[95%] m-auto my-[15px]" >view details</button>
                    </Link>
                </div>
            </div>
        </>
    )
}