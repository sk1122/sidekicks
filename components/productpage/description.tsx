interface Props {
  desc: string
}

export const Description = (props: Props) => {
  return (
    <>
      <div className="mb-4 text-justify text-white">
        <h2>Description</h2>
        <p>
          {props.desc}
        </p>
      </div>
    </>
  )
}
