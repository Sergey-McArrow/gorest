import { TableHeader, UsersTableBody } from '@/components/UserTable'
import { PaginationType, UserType } from '@/types/UserTypes'
import { ChangeEvent, ReactNode, use, useState } from 'react'

import { getUsersDataFromAPI } from '@/utils/api'

import { Paper, Pagination, Table, TableContainer, Stack, SelectChangeEvent } from '@mui/material/'

import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { ToggleButtonThreeEl } from '@/components/form-components/ToggleButton'

type UsersProps = { usersData: UserType[] | null, pagination: PaginationType | null }

export const getStaticProps = async () => {
    try {
        const users = await (getUsersDataFromAPI())
        if (!users) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                usersData: users?.data,
                pagination: users?.meta?.pagination
            },
        }
    } catch {
        return {
            props: { usersData: null },
        }
    }
}

const Users: NextPage<UsersProps> = ({ usersData, pagination }) => {
    const [users, setUsers] = useState(usersData)
    const [page, setPage] = useState(1)

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        console.log(newPage)
        setPage(newPage)
    }

    const handleGenderChange = async (event: SelectChangeEvent<string>, child: ReactNode) => {
        const { value } = event.target as HTMLInputElement

        if (value === 'Gender') {
            setUsers(usersData)
        } else {
            const { data } = await (getUsersDataFromAPI(page))
            const filteredUsers = data?.filter(user => user.gender === value) || users
            setUsers(filteredUsers)
        }

    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHeader handleGenderChange={handleGenderChange} />
                    {users ?
                        users.map((user) =>
                            <UsersTableBody key={user.id} user={user} />)
                        : null}
                </Table >
            </TableContainer >
            <Stack direction="row" justifyContent="space-around" alignItems="center"            >
                <Pagination count={pagination?.pages || 10} page={page} onChange={handleChangePage} />
                <ToggleButtonThreeEl setUsers={setUsers} users={users} />
            </Stack>
        </Paper >
    )
}

export default Users