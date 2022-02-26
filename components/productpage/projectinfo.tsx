import Circle from '../Circle'

interface Props {
  title: string
  description: string
  images: string[]
}

export const ProductInfo = ({ title, description, images }: Props) => {
  return (
    <>
      <div className=" mb-[50px] flex items-center justify-start  text-white">
        <div className="mt-10">
          <img src={images[0]} className="h-[200px] w-[200px] rounded-[50%] bg-white" />
        </div>
        <div className="w ml-[20px] mt-10 w-[600px] text-justify">
          <h1 className="text-[2rem]">{title}</h1>
          <p>
            {description}
          </p>
        </div>
      </div>
    </>
  )
}
