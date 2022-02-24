import { ProductCard } from "../components/productlist/productCard";


import { useState, useEffect } from "react";
import { useAccountContext } from "./_context";
const ProductList = () => {
    const [products, setProducts] = useState([]);

    const { getAllProjects } = useAccountContext()
    const [data, setData] = useState([])
    useEffect(() => {

        (async () => {
            setData(await getAllProjects())
        })()
    }, [])

    useEffect(() => {
        setProducts(data)
        console.log(products)

        // products.map(product => console.log(product[0]))

    }, [data])

    return (

        <>
            <div className="h-full w-screen bg-black">
                <div className="p-4 m-auto h-full w-[90%] ">
                    <div className=" lg:m-auto justify-center lg:flex flex-wrap max-w-[1000px] 2xl:max-w-full">
                        {products.map((product) => {
                            product = product[0]
                            return <ProductCard title={product.title} description={product.description} />
                        })}
                    </div>

                </div>



            </div>
        </>

    )
}


export default ProductList;