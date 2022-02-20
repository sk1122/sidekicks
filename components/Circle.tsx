interface Props {
	title: string
	text: string
	number: string
}

const Circle = (props: Props) => {
	return (
		<div className="absolute rounded-full w-28 h-28 flex flex-col justify-center items-center bg-white text-black">
			<h2 className="text-2xl">{props.number}</h2>
			<h2 className="text-xs">{props.title}</h2>
		</div>
	)
}

export default Circle