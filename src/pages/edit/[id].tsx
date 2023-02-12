import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { getinitialUsersDataFromAPI, getUserFromAPI } from '@/utils/api'
import { UserType } from '@/types/UserTypes'
import UserInfo from '@/components/UserInfo'

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<NextParsedUrlQuery>) => {
    const id = context.params?.id as string

    const { data } = await getUserFromAPI(id)
    return data ? {
        props: { user: data }
    } : {
        notFound: true,
    }
}

export const getStaticPaths = async () => {
    const { data } = await getinitialUsersDataFromAPI()
    const paths = data?.map(({ id }) => ({
        params: { id: id.toString() }
    }))
    return data ? {
        paths,
        fallback: false,
    } :
        {
            notFound: true,
        }
}

type UserTypeProps = { user: UserType }

const UserPage: NextPage<UserTypeProps> = ({ user }) => {
    return (<UserInfo user={user} />)
}

export default UserPage