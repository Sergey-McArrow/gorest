import { ChangeEvent, FC, HTMLAttributes, ReactNode } from 'react'
import { Gender, UserType } from '@/types/UserTypes'

import Link from 'next/link'
import { Select, TableRow, TableHead, TableCell, TableBody, MenuItem, SelectChangeEvent, Box } from '@mui/material'

type UserProps = { user: UserType }
type Column = {
    id: 'name' | 'email' | 'gender' | 'status'
    label: string
    minWidth?: number
    align?: 'right' | 'left' | 'center'
}
const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 5 / 16 },
    { id: 'email', label: 'E Mail', minWidth: 5 / 16, },
    { id: 'gender', label: 'Gender', minWidth: 3 / 16, align: 'center' },
    { id: 'status', label: 'Status', minWidth: 3 / 16, align: 'right', },

]

export const UsersTableBody: FC<UserProps> = ({ user }) => (
    <TableBody sx={{ maxWidth: 1 / 1 }}>
        <TableRow hover role="checkbox" tabIndex={-1} >
            {columns.map((column) => {
                const value = user[column.id]
                if (column.id === 'name')
                    return (
                        <TableCell key={column.id} align={column.align} style={{ width: column.minWidth }} >
                            <Link href={`/edit/${user.id}`}>
                                {value}
                            </Link>
                        </TableCell>
                    )
                else return (
                    <TableCell key={column.id} align={column.align} style={{ width: column.minWidth }} >
                        {value}
                    </TableCell>
                )
            })}
        </TableRow>
    </TableBody>
)
interface TableHeaderProps extends HTMLAttributes<HTMLElement> {
    handleGenderChange: (event: SelectChangeEvent<string>, child: ReactNode) => void

}export const TableHeader: FC<TableHeaderProps> = ({ handleGenderChange }) => (
    <TableHead sx={{ maxWidth: 1 / 1 }}>
        <TableRow>
            {columns.map((column) => {
                if (column.id === 'gender') return (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ width: 1 / 1 }}
                    >
                        <Select
                            defaultValue='Gender'
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={handleGenderChange}
                            fullWidth
                        >
                            <MenuItem value={Gender.female}> {Gender.female} </MenuItem>
                            <MenuItem value={Gender.male}> {Gender.male}  </MenuItem>
                            <MenuItem hidden value="Gender">
                                <em>Gender(ALL)</em>
                            </MenuItem>
                        </Select>
                    </TableCell>
                )
                else return (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ width: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>
                )
            }
            )}
        </TableRow>
    </TableHead>
)