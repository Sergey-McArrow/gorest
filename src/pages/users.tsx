import { TableHeader, UsersTableBody } from '@/components/UserTable'
import { PaginationType, UserType } from '@/types/UserTypes'
import { ChangeEvent, FC, useState } from 'react'

import { getUsersDataFromAPI } from '@/utils/api'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import next, { NextPage } from 'next'
import { GetStaticProps } from 'next'

type UsersProps = { users: UserType[] | null, pagination: PaginationType | null }

export const getStaticProps = async () => {
    try {
        const users = await getUsersDataFromAPI()
        if (!users) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                users: users?.data,
                pagination: users?.meta?.pagination
            },
        }
    } catch {
        return {
            props: { users: null },
        }
    }
}


const Users: NextPage<UsersProps> = ({ users, pagination }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    // const nextLink = pagination?.links.next

    const handleChangePage = (event: unknown, newPage: number) => {
        // console.log(newPage)
        setPage(newPage)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHeader />
                    {users ?
                        users.map((user) =>
                            <UsersTableBody key={user.id} user={user} />)
                        : null}
                </Table >
            </TableContainer >
            <TablePagination
                component="div"
                count={pagination?.pages || 1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper >
    )
}

export default Users