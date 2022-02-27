import { useState } from "react"

export const Team = () => {
  const [hide, setHide] = useState(false)

  const handleHide = () => {
    setHide(!hide)
  }
  return (
    <>
      <div className="w-full px-[15px]">
        <div className=" mt-[30px] flex w-[100%] justify-between  text-white">
          <h2>Team</h2>
          <button onClick={handleHide} className="bg-transparent text-[2rem]">+</button>
        </div>
        {hide ? <div></div> : <div className="mb-20px m-auto  w-[90%] border border-white ">
          <div className=" mt-[12px] ml-[20px] mb-[20px] flex">
            <div className="h-[50px] w-[50px] rounded-[50%] bg-white"></div>
            <div className="ml-[12px] text-white">
              <p>hello this it </p>
              <p>lorem</p>
            </div>
          </div>
          <div className=" mt-[12px] ml-[20px] mb-[20px] flex">
            <div className="h-[50px] w-[50px] rounded-[50%] bg-white"></div>
            <div className="ml-[12px] text-white">
              <p>hello this it </p>
              <p>lorem</p>
            </div>
          </div>
          <div className=" mt-[12px] ml-[20px] mb-[20px] flex">
            <div className="h-[50px] w-[50px] rounded-[50%] bg-white"></div>
            <div className="ml-[12px] text-white">
              <p>hello this it </p>
              <p>lorem</p>
            </div>
          </div>
        </div>


        }



      </div>
    </>
  )
}
