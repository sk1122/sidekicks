interface Props {
	title: string
	text: string
	number: string
}

const Circle = (props: Props) => {
	return (
		<div className="absolute rounded-full w-36 h-36 flex flex-col justify-center items-center bg-black shadow-inner-circle drop-shadow-[0_75px_30px_rgba(255,255,255,0.25)]">
			<h2 className="text-2xl">{props.number}</h2>
			<h2 className="text-xs">{props.title}</h2>
		</div>
	)
}

export default Circle