import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccountContext } from '../pages/_context'

interface Props {
  id: number
}

export const CryptoKick = ({ id }: Props) => {
  const [value, setValue] = useState('')
  const { contributeProject } = useAccountContext()

  const submit = async () => {
    const promise = contributeProject(id, value)
    toast.promise(promise, 
      {
        loading: 'Loading',
        success: (data) => `Successfully contributed to ${id}`,
        error: (err) => `${err.message.toString()}`,
      },
      {
        style: {
          minWidth: '500px',
        },
        success: {
          duration: 5000,
          icon: '🔥',
        },
      }  
    )
  }

  return (
    <>
      <input
        className=" border-white-400 placeholder-white-300 mb-[20px] w-full border bg-transparent p-4 text-white focus:outline-none"
        type="text"
        value={value}
        placeholder="$ Amount"
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => submit()} className="w-full  rounded  bg-[#5551ff] p-4   text-white">
        Give Crypto Kicks
      </button>
    </>
  )
}
