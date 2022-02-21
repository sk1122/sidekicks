import { useState } from 'react'

export const CryptoKick = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <input
        className=" border-white-400 placeholder-white-300 mb-[20px] w-full border bg-transparent p-4 text-white focus:outline-none"
        type="text"
        value={value}
        placeholder="$ Amount"
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="w-full  rounded  bg-[#5551ff] p-4   text-white">
        Give Crypto Kicks
      </button>
    </>
  )
}
