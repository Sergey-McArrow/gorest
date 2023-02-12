import { ChangeEvent, FC, HTMLAttributes, ReactNode } from 'react'
import { Gender, UserType } from '@/types/UserTypes'

import Link from 'next/link'
import { Select, TableRow, TableHead, TableCell, TableBody, MenuItem, SelectChangeEvent, Box } from '@mui/material'

type UserProps = { user: UserType }
type Column = {
    id: 'name' | 'email' | 'gender' | 'status'
    label: string
    minWidth?: number | string
    align?: 'right' | 'left' | 'center'
}
const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: '30%' },
    { id: 'email', label: 'E Mail', minWidth: '30%', },
    { id: 'gender', label: 'Gender', minWidth: '20%', align: 'right' },
    { id: 'status', label: 'Status', minWidth: '20%', align: 'right', },

]

export const UsersTableBody: FC<UserProps> = ({ user }) => (
    <TableBody sx={{ maxWidth: 1 / 1 }}>
        <TableRow hover role="checkbox" tabIndex={-1} >
            {columns.map((column) => {
                const value = user[column.id]
                if (column.id === 'name')
                    return (
                        <TableCell key={column.id} align={column.align} style={{ width: column.minWidth, maxWidth: '100%' }} >
                            <Link href={`/edit/${user.id}`}>
                                {value}
                            </Link>
                        </TableCell>
                    )
                else return (
                    <TableCell key={column.id} align={column.align} style={{ width: column.minWidth, maxWidth: '100%' }} >
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
    <TableHead sx={{ maxWidth: '100%' }}>
        <TableRow>
            {columns.map((column) => {
                if (column.id === 'gender') return (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ maxWidth: 1 / 1, padding: '0!important' }}
                    >
                        <Select
                            defaultValue='Gender'
                            inputProps={{ MenuProps: { disableScrollLock: true } }}
                            onChange={handleGenderChange}
                            sx={{ maxWidth: '100%', border: 'none' }}
                            variant='standard'
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
                        sx={{ width: column.minWidth, maxWidth: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>
                )
            }
            )}
        </TableRow>
    </TableHead>
)