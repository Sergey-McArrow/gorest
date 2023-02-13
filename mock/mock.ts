import { Gender, Status, UserType } from '@/types/UserTypes'

export const initialUsersData: UserType[] = [
	{
		id: 383566,
		name: 'Chakrika Jha',
		email: 'chakrika_jha@hirthe.net',
		gender: Gender.female,
		status: Status.active,
	},
	{
		id: 383565,
		name: 'Dr. Anjali Gupta',
		email: 'gupta_anjali_dr@quigley.com',
		gender: Gender.male,
		status: Status.inactive,
	},
	{
		id: 383564,
		name: 'Gopi Sharma',
		email: 'sharma_gopi@bechtelar.io',
		gender: Gender.female,
		status: Status.inactive,
	},
	{
		id: 383563,
		name: 'Mangalya Mishra',
		email: 'mangalya_mishra@nicolas.com',
		gender: Gender.female,
		status: Status.active,
	},
	{
		id: 383562,
		name: 'Anwesha Talwar',
		email: 'anwesha_talwar@mraz.io',
		gender: Gender.male,
		status: Status.active,
	},
	{
		id: 383561,
		name: 'Bhargavi Tagore',
		email: 'bhargavi_tagore@toy-crona.biz',
		gender: Gender.male,
		status: Status.inactive,
	},
	{
		id: 383560,
		name: 'Baidehi Patil',
		email: 'patil_baidehi@gibson-schaefer.info',
		gender: Gender.male,
		status: Status.active,
	},
	{
		id: 383464,
		name: 'Menaka Jha',
		email: 'jha_menaka@weissnat.name',
		gender: Gender.female,
		status: Status.inactive,
	},
	{
		id: 383463,
		name: 'Pramila Asan DO',
		email: 'do_pramila_asan@gleichner.org',
		gender: Gender.male,
		status: Status.inactive,
	},
	{
		id: 383461,
		name: 'Bhoj Dwivedi',
		email: 'bhoj_dwivedi@schulist-sauer.io',
		gender: Gender.female,
		status: Status.active,
	},
]

export const pagination = {
	total: 2500,
	pages: 250,
	page: 1,
	limit: 10,
	links: {
		previous: null,
		current: 'https://gorest.co.in/public/v1/users?page=1',
		next: 'https://gorest.co.in/public/v1/users?page=2',
	},
}
