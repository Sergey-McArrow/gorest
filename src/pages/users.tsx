import { TableHeader, UsersTableBody } from '@/components/UserTable'
import { UserType } from '@/types/UserTypes'
import { ChangeEvent, FC, useState } from 'react'

import { getUsersDataFromAPI } from '@/utils/api'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

export const getStaticProps = async () => {
    try {
        const response = await fetch(`https://gorest.co.in/public/v1/users?access-token=${process.env.API_TOKEN}`) //
        const { data } = await response.json()

        if (!data) {
            return {
                notFound: true,
            }
        }

        return {
            props: { users: data },
        }
    } catch {
        return {
            props: { users: null },
        }
    }
}

type UsersProps = { users: UserType[] }

const Users: FC<UsersProps> = ({ users }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }


    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHeader />
                        {users.map((user) =>
                            <UsersTableBody key={user.id} user={user} />)}
                    </Table >
                </TableContainer >
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper >
        </>
    )
}

export default Users