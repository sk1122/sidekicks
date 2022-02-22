import { useEffect, useState } from 'react'
import { Project, Maker } from '../types/Project.type'
import { useAccountContext } from './_context'

type Props = {}

const createProject = (props: Props) => {
  const { startProject } = useAccountContext()
  
  let makers: Maker[] = [{name: 'fsa', twitter: ''}, {name: '', twitter: ''}, {name: '', twitter: ''}]
  const [maker, setMaker] = useState(makers)

  const initialValues: Project = {
    title: '',
    tagline: '',
    description: '',
	makers: maker,
	wallet_id: '',
	category: '',
	images: [],
	thumbnail: null,
	demo_video: ''
  }

  const [projectImg, setProjectImg] = useState<File>()
  const [projectImage, setProjectImage] = useState<string>('')
  const [projectMultipleImages, setProjectMultipleImages] = useState<File[]>([])

  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e: any) => {
    const { name, value } = e.target
	if(name.startsWith('makers')) {
		type or = "name" | "twitter"
		const arr = name.split('-')
		console.log(makers[Number(arr[1])][arr[2] as or], value)
		let makeR = maker
		makeR[Number(arr[1])][arr[2] as or] = value
		setMaker(makeR)
		setFormValues({ ...formValues, makers: makeR})
	} else {
		setFormValues({ ...formValues, [name]: value })
	}
    console.log(formValues)
  }

  // @ts-ignore
  const handleImage = (file) => {
    setProjectImg(file)
	setProjectImage(URL.createObjectURL(file))
  }
  //@ts-ignore
  const FiletoBase64 = (file) => {
    const reader = new FileReader()
    const url = reader.readAsDataURL(file)
    reader.onloadend = () => {
      //@ts-ignore
      setProjectMultipleImages((projectMultipleImages) => [
        ...projectMultipleImages,
        reader.result,
      ])
    }
  }
  //@ts-ignore
  const handleMultipleImages = (files) => {
    console.log(files)
    Object.keys(files).map((key) => FiletoBase64(files[key]))
  }

  useEffect(() => {
    console.log(projectImg)
  }, [projectImg])

  useEffect(() => {
    // setFormValues({ ...projectMultipleImages, ...formValues })
    // console.log(formValues)
    console.log(projectMultipleImages)
  }, [projectMultipleImages])

  const [newMember, setNewMember] = useState(false)

  const addNewMember = (e: any) => {
    e.preventDefault()
    setNewMember(true)
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
	const data: Project = {
		...formValues,
		thumbnail: projectImg as File,
		images: [projectImg] as File[]
	}

	startProject(data)
  }

  return (
    <div className="flex h-fit items-center justify-center bg-black text-white">
      <form className="mx-16 my-20 w-full" onSubmit={handleFormSubmit}>
        <div className="flex  flex-col items-center justify-center lg:flex-row lg:justify-start lg:space-x-20">
          {/* project icon input */}
          <div className="relative flex h-60 w-60 items-center justify-center rounded-full border-2 border-dotted border-gray-700">
			{projectImage !== '' && <img src={projectImage} className='select-none absolute z-50 m-0 h-full w-full cursor-pointer rounded-full p-0 outline-none' />}
            <input
              className="absolute z-50 m-0 h-full w-full cursor-pointer rounded-full p-0 opacity-0 outline-none"
              type="file"
              accept="image/*"
              name="projectImg"
              // @ts-ignore
              value={''}
              // @ts-ignore
              onChange={(e) => handleImage(e.target.files[0])}
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
              <p className="select-none text-xs opacity-50">Add Icon</p>
            </div>
          </div>
          {/* project name & summary */}
          <div className="flex w-5/6 flex-col items-center justify-center  md:w-3/5 lg:w-1/4">
            <input
              type="text"
              placeholder="Project Name"
              className="mt-8 w-full bg-transparent text-center text-xl outline-none lg:text-left"
              required
              value={formValues.title}
              name="title"
              onChange={handleChange}
            />

            <textarea
              id="summary"
              rows={3}
              className="mt-10 w-full overflow-hidden bg-transparent text-center outline-none lg:text-left"
              placeholder="Short summary - Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear on your project and pre-launch pages."
              name="tagline"
              required
              onChange={handleChange}
              value={formValues.tagline}
            ></textarea>
          </div>
        </div>
        {/* section #2 */}
        <div className="mt-20 flex h-[500px] w-full flex-col items-center lg:h-96 lg:flex-row lg:items-start lg:space-x-2">
          {/* left */}
          <div className="relative flex w-3/4 items-center justify-center rounded border-2 border-dotted border-gray-700 md:w-4/5 lg:h-full lg:w-3/5">
            <input
              className="absolute z-50 m-0 h-full w-full cursor-pointer rounded-full p-0 opacity-0 outline-none"
              type="file"
              accept="image/*"
              name="projectImg"
              // @ts-ignore
              value={''}
              // @ts-ignore
              onChange={(e) => handleImage(e.target.files[0])}
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
              <p className="select-none text-xs opacity-50">Add Icon</p>
            </div>
          </div>
          {/* right */}
          <div className="md:4/5 mt-8 h-full w-3/4 rounded border-2 border-dotted border-gray-700 lg:mt-0 lg:w-2/5">
            <textarea
              className="h-full w-full bg-transparent py-2 px-2 outline-none"
              name="description"
              placeholder="Add Description"
              value={formValues.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        {/* section #3 */}
        <div className="mt-20 flex flex-col items-center lg:flex-row lg:items-start">
          {/* left */}
          <div className="flex w-full flex-col items-center space-y-3 lg:items-start">
            <h2 className="text-center text-xl text-gray-200 lg:text-left">
              Team
            </h2>
            <p className="w-4/5 text-center text-sm text-gray-400 lg:w-3/5 lg:text-left">
              If you're working with others, you can grant them permission to
              edit this project, communicate with backers, and coordinate reward
              fulfillment
            </p>
          </div>
          {/* right */}
          <div className="mt-10 w-full lg:mt-0">
            <div className="flex w-full space-x-4">
              <div className="flex w-1/2 flex-col space-y-1">
                <label htmlFor="twitter" className="text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  name="makers-0-name"
                  onChange={handleChange}
                  value={formValues.makers[0].name}
                  className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                />
              </div>
              <div className="flex w-1/2 flex-col space-y-1">
                <label htmlFor="twitter" className="text-gray-200">
                  Twitter
                </label>
                <input
                  type="text"
                  name="makers-0-twitter"
                  onChange={handleChange}
                  value={formValues.makers[0].twitter}
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
                  name="makers-1-name"
                  value={formValues.makers[1].name}
                  onChange={handleChange}
                  className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                />
              </div>
              <div className="flex w-1/2 flex-col space-y-1">
                <label htmlFor="twitter" className="text-gray-200">
                  Member Twitter
                </label>
                <input
                  type="text"
                  name="makers-1-twitter"
                  value={formValues.makers[1].twitter}
                  onChange={handleChange}
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
                    name="makers-2-name"
                    value={formValues.makers[2].name}
                    onChange={handleChange}
                    className="rounded-lg border border-2 border-gray-500 bg-transparent py-2 px-2 outline-none"
                  />
                </div>
                <div className="flex w-1/2 flex-col space-y-1">
                  <label htmlFor="twitter" className="text-gray-200">
                    Member Twitter
                  </label>
                  <input
                    type="text"
                    name="makers-2-twitter"
                    value={formValues.makers[2].twitter}
                    onChange={handleChange}
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

export default createProject