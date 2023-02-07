import { UserType } from '@/types/UserTypes'
import { FC } from 'react'


import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

type UserProps = { user: UserType }
type Column = {
    id: 'name' | 'email' | 'gender' | 'status'
    label: string
    minWidth?: number
    align?: 'right' | 'left'
}
const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 1 / 3 },
    { id: 'email', label: 'EMail', minWidth: 1 / 3 },
    { id: 'gender', label: 'Gender', minWidth: 1 / 4, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 1 / 4, align: 'right', },

]

export const UsersTableBody: FC<UserProps> = ({ user }) => {

    return (

        <TableBody sx={{ maxWidth: 1 / 1 }}>
            <TableRow hover role="checkbox" tabIndex={-1} >
                {columns.map((column) => {
                    const value = user[column.id]
                    return (
                        <TableCell key={column.id} align={column.align} style={{ width: column.minWidth }} >
                            {value}
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableBody>

    )
}

export const TableHeader = () => (
    <TableHead>
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ width: column.minWidth }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
)