export type Column = {
	id: 'name' | 'email' | 'gender' | 'status'
	label: string
	minWidth?: number | string
	align?: 'right' | 'left' | 'center'
}
