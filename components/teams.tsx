import { useState } from "react"

export const Team = ({ creators }) => {
  const [hide, setHide] = useState(false)

  const handleHide = () => {
    setHide(!hide)
  }

  console.log(creators)
  return (
    <>
      <div className="w-full px-[15px]">
        <div className=" mt-[30px] flex w-[100%] justify-between  text-white">
          <h2>Team</h2>
          <button onClick={handleHide} className="bg-transparent text-[2rem]">+</button>
        </div>
        {hide ? <div></div> :
          <div className="mb-20px m-auto  w-[90%] border text-white border-white ">
            {creators ?
              creators.map(creator => {
                return <div className="flex items-center text-[1.3rem] underline  mt-[12px] ml-[20px] mb-[20px]  ">
                  <img className="w-[30px] mr-3 rounded-full" src="/icon/twitter.gif" alt="" />
                  <a href={"https://twitter.com/" + creator.twitter}>{creator.twitter}</a>
                </div>

              })
              : <div>No team mates</div>


            }
          </div>


        }



      </div>
    </>
  )
}
