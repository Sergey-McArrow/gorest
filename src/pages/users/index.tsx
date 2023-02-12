import { TableHeader, UsersTableBody } from '@/components/UserTable'
import { PaginationType, UserType } from '@/types/UserTypes'
import { ChangeEvent, ReactNode, useState } from 'react'

import { getinitialUsersDataFromAPI, getAllUsersInfoFromApi } from '@/utils/api'

import { Paper, Pagination, Table, TableContainer, Stack, SelectChangeEvent } from '@mui/material/'

import { GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'

type UsersProps = { initialUsersData: UserType[] | null, pagination: PaginationType | null }

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<NextParsedUrlQuery>) => {
    const id = context.params?.id as string

    const users = await getAllUsersInfoFromApi()
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
    // const [users, setUsers] = useState(initialUsersData)
    console.log(initialUsersData)

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

    return (
        <Paper sx={{ width: '90%', overflow: 'hidden', mx: 'auto' }}>
            <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                    <TableHeader handleGenderChange={handleGenderChange} />
                    {initialUsersData ?
                        initialUsersData.map((user) =>
                            <UsersTableBody key={user.id} user={user} />)
                        : null}
                </Table >
            </TableContainer >
            <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ padding: '1rem' }} >
                <Pagination count={pagination?.pages || 10} page={page} onChange={handleChangePage} />
            </Stack>
        </Paper >
    )
}

export default Users