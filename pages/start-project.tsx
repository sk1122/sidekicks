import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

type Props = {}

const startProject = (props: Props) => {
  const [imgPlaceholder, setImgPlaceholder] = useState('Add Icon')
  const [multipleImagesTitle, setMultipleImagesTitle] = useState(
    'Drag and Drop images or select files'
  )
  const [projectImage, setProjectImage] = useState('')
  const [newMember, setNewMember] = useState(false)
  const { register, handleSubmit } = useForm()

  const submitForm = (values: any): void => {
    console.log(values)
  }

  const addNewMember = (e: any) => {
    e.preventDefault()
    setNewMember(true)
  }

  // converting images to base64 and storing the hash in localstorage
  const manageImages = (file) => {
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    reader.onloadend = () => {
      localStorage.setItem(uuidv4(), reader.result)
      setProjectImage(reader.result)
    }
  }

  // looping on multiple images and passing them on to the manageImages function
  const multipleImages = (files) => {
    Object.keys(files).map((key) => manageImages(files[key]))
  }

  return (
    <div className="flex h-fit bg-black text-white">
      <form className="mx-16 my-20 w-full" onSubmit={handleSubmit(submitForm)}>
        <div className="flex  flex-col items-center justify-center space-x-20 lg:flex-row lg:justify-start">
          {/* project icon input */}
          <div className="relative flex h-60 w-60 items-center justify-center rounded-full border-2 border-dotted border-gray-700">
            <input
              className="absolute z-50 m-0 h-full w-full cursor-pointer rounded-full p-0 opacity-0 outline-none"
              type="file"
              {...register('project_img', {
                required: true,
                // this is the first image
                onChange: (e) => {
                  manageImages(e.target.files[0])
                },
              })}
              accept="image/*"
            />

            <div className="z-0 flex flex-col items-center justify-center py-20 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="opacity-50"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8.5 13.498l2.5 3.006l3.5-4.506l4.5 6H5m16 1v-14a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
                  fill="currentColor"
                ></path>
              </svg>
              <p className="select-none text-xs opacity-50">{imgPlaceholder}</p>
            </div>
          </div>
          {/* project name & summary */}
          <div>
            <input
              type="text"
              {...register('title', { required: true })}
              placeholder="Project Name"
              className="mt-8 w-full bg-transparent text-xl outline-none"
            />

            <textarea
              id="summary"
              rows={3}
              {...register('summary', { required: true })}
              className="mt-10 w-full bg-transparent outline-none"
              placeholder="Short summary - Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear on your project and pre-launch pages.
"
            ></textarea>
          </div>
        </div>
        {/* section #2 */}
        <div className="flex space-x-4 py-16">
          {/* left */}
          <div className="relative flex h-96 w-3/5 items-center justify-center rounded border-2 border-dotted border-gray-700">
            <input
              className="absolute z-50 m-0 h-full w-full cursor-pointer rounded-full p-0 opacity-0 outline-none"
              type="file"
              {...register('multiple_img', {
                required: true,
                // here we are converting multiple images to base64
                onChange: (e) => multipleImages(e.target.files),
              })}
              accept="image/*"
              multiple
            />
            <div className="z-0 flex flex-col items-center justify-center space-y-2 py-20 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="opacity-50"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8.5 13.498l2.5 3.006l3.5-4.506l4.5 6H5m16 1v-14a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
                  fill="currentColor"
                ></path>
              </svg>
              <h3 className="opacity-50">{multipleImagesTitle}</h3>
              <p className="select-none text-xs opacity-50">
                It must be .jpg or .png and no longer than __Mb
              </p>
            </div>
          </div>
          {/* right */}
          <div className="-m-7 h-96 w-2/5 space-y-1 ">
            <h2>Description</h2>
            <textarea
              {...register('description', { required: true })}
              className="h-full w-full rounded border border-2 border-gray-700 bg-transparent px-2 py-1 text-sm placeholder-opacity-50"
              placeholder="Add a Description"
            ></textarea>
          </div>
        </div>
        {/* section #3 */}
        <div className="flex">
          {/* left */}
          <div className="w-full space-y-3">
            <h2 className="text-xl text-gray-200">Team</h2>
            <p className="w-3/5 text-sm text-gray-400">
              If you're working with others, you can grant them permission to
              edit this project, communicate with backers, and coordinate reward
              fulfillment
            </p>
          </div>
          {/* right */}
          <div className="w-full">
            <div className="flex w-full space-x-4">
              <div className="flex w-1/2 flex-col space-y-1">
                <label htmlFor="twitter" className="text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  {...register('owner_name', { required: true })}
                  className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                />
              </div>
              <div className="flex w-1/2 flex-col space-y-1">
                <label htmlFor="twitter" className="text-gray-200">
                  Twitter
                </label>
                <input
                  type="text"
                  {...register('owner_twitter', { required: true })}
                  className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                />
              </div>
            </div>
            <div className="mt-3 flex w-full space-x-4">
              <div className="flex w-1/2 flex-col space-y-1">
                <label htmlFor="twitter" className="text-gray-200">
                  Member Name
                </label>
                <input
                  type="text"
                  {...register('member_name')}
                  className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                />
              </div>
              <div className="flex w-1/2 flex-col space-y-1">
                <label htmlFor="twitter" className="text-gray-200">
                  Member Twitter
                </label>
                <input
                  type="text"
                  {...register('member_twitter')}
                  className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                />
              </div>
            </div>
            {/* add new member */}

            {newMember ? (
              <div className="mt-3 flex w-full space-x-4">
                <div className="flex w-1/2 flex-col space-y-1">
                  <label htmlFor="twitter" className="text-gray-200">
                    Member Name
                  </label>
                  <input
                    type="text"
                    {...register('member2_name')}
                    className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                  />
                </div>
                <div className="flex w-1/2 flex-col space-y-1">
                  <label htmlFor="twitter" className="text-gray-200">
                    Member Twitter
                  </label>
                  <input
                    type="text"
                    {...register('member2_twitter')}
                    className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                  />
                </div>
              </div>
            ) : (
              <button
                className="mt-4 flex w-full justify-end text-sm"
                onClick={addNewMember}
              >
                Add Another member +
              </button>
            )}
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <button type="submit" className="rounded bg-[#5451FF] py-2 px-8">
            Submit the project
          </button>
        </div>
      </form>
    </div>
  )
}

export default startProject
