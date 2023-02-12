import { GetServerSidePropsContext,  NextPage } from 'next'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import {  getUserFromAPI } from '@/utils/api'
import { UserType } from '@/types/UserTypes'
import UserInfo from '@/components/UserInfo'

export const getServerSideProps = async (context: GetServerSidePropsContext<NextParsedUrlQuery>) => {
    const id = context.params?.id as string

    const { data } = await getUserFromAPI(id)
    return data ? {
        props: { user: data }
    } : {
        notFound: true,
    }
}



type UserTypeProps = { user: UserType }

const UserPage: NextPage<UserTypeProps> = ({ user }) => {
    return (<UserInfo user={user} />)
}

export default UserPage