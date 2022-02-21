import Carousel from 'framer-motion-carousel'

export const ImageGallary = () => {
  return (
    <>
      <Carousel renderArrowLeft={({ handlePrev, activeIndex }) => <div />}>
        <div className=" relative h-[500px] w-[60%] flex-shrink-0 border-2 bg-white">
          <button className="absolute top-0 bottom-0">
            <img src="/icon/back.png" />
          </button>
          <button className="absolute top-0 bottom-0 right-0">
            <img className="scale-x-[-1]" src="/icon/back.png" alt="" />
          </button>
        </div>
      </Carousel>
    </>
  )
}
