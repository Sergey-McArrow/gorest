import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { GetServerSidePropsContext, NextPage } from 'next'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { useRouter } from 'next/router'
import { Pagination, Paper, SelectChangeEvent, Stack, Table, TableContainer } from '@mui/material/'

import { TableHeader, UsersTableBody } from '@/components/UserTable'
import { GenderSelectType, PaginationType, UserType } from '@/types/UserTypes'
import { getinitialUsersDataFromAPI } from '@/utils/api'

type UsersProps = { initialUsersData: UserType[] | null, pagination: PaginationType | null }

export const getServerSideProps = async (context: GetServerSidePropsContext<NextParsedUrlQuery>) => {
    const page = context.params?.page as string
    const users = await getinitialUsersDataFromAPI(page)
    return users ? {
        props: {
            initialUsersData: users?.data,
            pagination: users?.meta?.pagination
        }
    } : { notFound: true }
}

const Users: NextPage<UsersProps> = ({ initialUsersData, pagination }) => {
    const page = pagination?.page
    const router = useRouter()
    const [gender, setGender] = useState<GenderSelectType>('all')

    const handleChangePage = useCallback((event: ChangeEvent<unknown>, newPage: number) => {

        router.push(String(newPage))
            .then(() => { setGender('all') })
    }, [])

    const usersByGender = useMemo(() => {
        if (!initialUsersData) return []

        switch (gender) {
            case 'male':
            case 'female':
                return initialUsersData.filter(user => user.gender === gender)
            default:
                return initialUsersData
        }
    }, [initialUsersData, gender])

    const handleGenderChange = useCallback((event: SelectChangeEvent<string>) => {
        const { value } = event.target as { value: GenderSelectType }
        setGender(value)
    }, [])

    return (
        <TableContainer component={Paper} sx={{ width: '90%', overflow: 'hidden', mx: 'auto' }}>
            <Table stickyHeader aria-label="sticky table" sx={{ padding: '1rem' }}>
                <TableHeader handleGenderChange={handleGenderChange} gender={gender} />
                {usersByGender.map((user) =>
                    <UsersTableBody key={user.id} user={user} />)
                }
            </Table>
            <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ padding: '1rem' }}>
                <Pagination count={pagination?.pages || 10} page={page} onChange={handleChangePage} />
            </Stack>
        </TableContainer>

    )
}

export default Users