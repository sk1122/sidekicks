import { ProductCard } from "../components/productlist/productCard";

import { useState, useEffect } from "react";
import { useAccountContext } from "./_context";

const ProductList = () => {
    const { getAllProjects, getImages } = useAccountContext()
    const [data, setData] = useState([])
    const [image, setImage] = useState([])
    useEffect(() => {
        (async () => {
            setData(await getAllProjects())
        })()
    }, [])

    useEffect(() => console.log(data, "dsadas"), [data])

    return (
        <>
            <div className="h-full w-screen bg-black">
                <div className="p-4 m-auto h-full w-[90%] ">
                    <div className=" lg:m-auto justify-center lg:flex flex-wrap max-w-[1000px] 2xl:max-w-full">
                        {data ? data.map((product: any) => {
                            product = product[0]
                            var image: any;
                            (async () => {
                                image = await getImages(product.id)
                                // console.log(image)
                            })()
                            return <ProductCard key={product.id} id={product.projectId} title={product.title} description={product.description} tagline={product.tagline} image={product.images} />
                        }) : <div className="text-white text-[4rem] border-2 ">loading ....  </div>}
                    </div>

                </div>



            </div>
        </>

    )
}


export default ProductList;