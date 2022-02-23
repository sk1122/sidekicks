import Navbar from "../components/Navbar"
import { ProductCard } from "../components/productlist/productCard";

const ProductList = () => {
    return (

        <>
            <div className="h-full w-screen bg-black">
                <div className="p-4 m-auto h-full w-[90%] border-2 ">
                    <div className=" lg:m-auto justify-center lg:flex flex-wrap max-w-[1000px] 2xl:max-w-full">
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