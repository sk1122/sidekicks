export interface Maker {
	name: string
	twitter: string
}

export interface Project {
	title: string
	description: string
	tagline: string
	thumbnail: File | null
	demo_video: string
	makers: Maker[]
	wallet_id: string
	category: string
	images: File[]
}