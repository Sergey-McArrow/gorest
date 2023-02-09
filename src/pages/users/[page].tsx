import { TableHeader, UsersTableBody } from '@/components/UserTable'
import { PaginationType, UserType } from '@/types/UserTypes'
import { ChangeEvent, ReactNode, use, useState } from 'react'

import { getUsersDataFromAPI } from '@/utils/api'

import { Paper, Pagination, Table, TableContainer, Stack, SelectChangeEvent } from '@mui/material/'

import { GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ToggleButtonThreeEl } from '@/components/form-components/ToggleButton'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'

type UsersProps = { usersData: UserType[] | null, pagination: PaginationType | null }

export const getServerSideProps = async (context: GetStaticPropsContext<NextParsedUrlQuery>) => {
    const page = context.params?.id as string
    const users = await (getUsersDataFromAPI(page))
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
}

const Users: NextPage<UsersProps> = ({ usersData, pagination }) => {
    const router = useRouter()

    const [users, setUsers] = useState(usersData)
    const [page, setPage] = useState(1)

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        router.push(newPage.toString())
        setPage(newPage)
    }

    const handleGenderChange = async (event: SelectChangeEvent<string>, child: ReactNode) => {
        const { value } = event.target as HTMLInputElement

        if (value === 'Gender') {
            setUsers(usersData)
        } else {
            const { data } = await (getUsersDataFromAPI(page.toString()))
            const filteredUsers = data?.filter(user => user.gender === value) || users
            setUsers(filteredUsers)
        }
    }

    return (
        <Paper sx={{ width: '90%', overflow: 'hidden', mx: 'auto' }}>
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
            </Stack>
        </Paper >
    )
}

export default Users