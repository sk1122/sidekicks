import { ProductCard } from "../components/productlist/productCard";

import { useState, useEffect } from "react";
import { useAccountContext } from "./_context";
const ProductList = () => {
    const { getAllProjects, getImages } = useAccountContext()
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            setData(await getAllProjects())
            console.log(data)
            let images = await getImages()
            console.log(images)
        })()
    }, [])
    return (

        <>
            <div className="h-full w-screen bg-black">
                <div className="p-4 m-auto h-full w-[90%] ">
                    <div className=" lg:m-auto justify-center lg:flex flex-wrap max-w-[1000px] 2xl:max-w-full">
                        {data ? data.map((product) => {
                            product = product[0]
                            return <ProductCard key={product.id} title={product.title} description={product.description} />
                        }) : <div className="text-white text-[4rem] border-2 ">loading ....  </div>}
                    </div>

                </div>



            </div>
        </>

    )
}


export default ProductList;