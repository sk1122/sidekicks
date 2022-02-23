import Navbar from "../components/Navbar"
import { ProductCard } from "../components/productlist/productCard";


import { useState, useEffect } from "react";
import { useAccountContext } from "./_context";
const ProductList = () => {

    const { myProjects } = useAccountContext()
    const [data, setData] = useState([])
    useEffect(() => {

        (async () => {
            setData(await myProjects())
        })()
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (

        <>
            <div className="h-full w-screen bg-black">
                <div className="p-4 m-auto h-full w-[90%] ">
                    <div className=" lg:m-auto justify-center lg:flex flex-wrap max-w-[1000px] 2xl:max-w-full">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />``
                        <ProductCard />


                    </div>

                </div>



            </div>
        </>

    )
}


export default ProductList;