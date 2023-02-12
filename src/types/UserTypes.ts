export type UserType = {
	email: string
	id: number
	name: string
	gender: Gender
	status: Status
}

export enum Gender {
	male = 'male',
	female = 'female',
}
export enum Status {
	active = 'active',
	inactive = 'inactive',
}

type LinksType = {
	current: string
	next: string
	previous: string | null
}

export type PaginationType = {
	limit: number
	links: LinksType
	page: number
	pages: number
	total: number
}

export type MetaType = {
	pagination: PaginationType
}

export type getinitialUsersDataFromAPIFnType = (
	page?: string,
) => Promise<{ data: UserType[] | null; meta: MetaType }>

export type getAllUsersInfoFromApiFnType = () => Promise<{
	data: UserType[] | null
	meta: MetaType
}>
