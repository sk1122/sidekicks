import { useEffect, useState } from "react";


export const ProductCard = ({ title, description, image, }) => {

    const MAX_lENGTH = 1000;
    const text = description;
    const pera = text.length > MAX_lENGTH ? <p>{text.substring(0, MAX_lENGTH)} ...<a href="">Read More</a></p> : <p>{text}</p>


    return (
        <>
            <div className="rounded-xl font-inter mycard text-white border-[1px]  min-h-[600px] h-full border-white w-full  m-auto max-w-[400px] 2xl:mx-[25px] mb-[35px]">
                <div className="rounded-xl h-[200px] w-full bg-[#626262] ">
                    <img src={image} alt="" />
                </div>
                <div className="  flex justify-between min-h-[400px] grow-1 shrink-0  flex-col  p-4">

                    <div>
                        <p className="opacity-80 text-[.9rem] text-justify">{pera}</p>
                        <h2 className=" opacity-75 text-bolder mb-3 text-[1.3rem]">{title} </h2>

                    </div>
                    <button className=" rounded-lg block text-center bg-[#5451FF] py-3 px-2 w-[95%] m-auto my-[15px]" >view details</button>
                </div>

            </div>
        </>
    )
}