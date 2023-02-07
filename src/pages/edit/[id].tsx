import { getUserFromAPI, getUsersDataFromAPI } from '@/utils/api'
import { GetServerSideProps, NextPage } from 'next'
import { UserType } from '@/types/UserTypes'
import UserInfo from '@/components/UserInfo'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context?.params
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
// export const getStaticProps: GetStaticProps = async (context) => {
//     const id = context.params
//     console.log(context)

//     const data = await getUserFromAPI(id)

//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }

//     return {
//         props: { user: data },
//     }
// }

type UserTypeProps = { user: UserType }

const UserPage: NextPage<UserTypeProps> = ({ user }) => {
    return (

        <UserInfo user={user} />
    )
}

export default UserPage