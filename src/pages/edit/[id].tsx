import { getUserFromAPI, getUsersDataFromAPI } from '@/utils/api'
import { GetServerSideProps, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import { UserType } from '@/types/UserTypes'
import UserInfo from '@/components/UserInfo'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<NextParsedUrlQuery>) => {
    const id = context.params?.id as string

    const { data } = await getUserFromAPI(id)

    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: { user: data },
    }
}

export const getStaticPaths = async () => {
    const { data } = await getUsersDataFromAPI()
    if (!data) {
        return {
            notFound: true,
        }
    }
    const paths = data.map(({ id }) => ({
        params: { id: id.toString() }
    }))

    return {
        paths,
        fallback: false,
    }
}

type UserTypeProps = { user: UserType }

const UserPage: NextPage<UserTypeProps> = ({ user }) => {
    return (

        <UserInfo user={user} />
    )
}

export default UserPage