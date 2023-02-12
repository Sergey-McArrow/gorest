import { TableHeader, UsersTableBody } from '@/components/UserTable'
import { PaginationType, UserType } from '@/types/UserTypes'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

import { getinitialUsersDataFromAPI } from '@/utils/api'

import { Paper, Pagination, Table, TableContainer, Stack, SelectChangeEvent } from '@mui/material/'

import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'

type UsersProps = { initialUsersData: UserType[] | null, pagination: PaginationType | null }

export const getServerSideProps = async (context: GetServerSidePropsContext<NextParsedUrlQuery>) => {
    const page = context.params?.page as string
    console.log(page)
    const users = await (getinitialUsersDataFromAPI(page))
    if (!users) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            initialUsersData: users?.data,
            pagination: users?.meta?.pagination
        },

    }
}

const Users: NextPage<UsersProps> = ({ initialUsersData, pagination }) => {
    const router = useRouter()
    const page = pagination?.page
    const [users, setUsers] = useState<UserType[] | null>(initialUsersData)
    console.log(users)

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        console.log(newPage)
        router.push(newPage.toString())
    }

    const handleGenderChange = async (event: SelectChangeEvent<string>) => {
        const { value } = event.target as HTMLInputElement

        // if (value === 'Gender') {
        //     setUsers(initialUsersData)
        // } else {
        //     const { data } = await (getinitialUsersDataFromAPI(page?.toString()))
        //     const filteredUsers = data?.filter(user => user.gender === value) || users
        //     setUsers(filteredUsers)
        // }
    }
    useEffect(() => { setUsers(initialUsersData) }, [])
    return (
        <TableContainer component={Paper} sx={{ width: '90%', overflow: 'hidden', mx: 'auto' }} >
            <Table stickyHeader aria-label="sticky table" sx={{ padding: '1rem' }}>
                <TableHeader handleGenderChange={handleGenderChange} />
                {users ?
                    users.map((user) =>
                        <UsersTableBody key={user.id} user={user} />)
                    : null}
            </Table >
            <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ padding: '1rem' }} >
                <Pagination count={pagination?.pages || 10} page={page} onChange={handleChangePage} />
            </Stack>
        </TableContainer >

    )
}

export default Users