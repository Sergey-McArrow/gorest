import { getinitialUsersDataFromAPIFnType, UserType } from '@/types/UserTypes'

export const getAllUsersInfoFromApi = async () => {
    try {
        const response = await fetch('https://gorest.co.in/public/v1/users')
        const users = await response.json()

        return users
    } catch (err) {
        console.error(err)
    }
}

export const getinitialUsersDataFromAPI: getinitialUsersDataFromAPIFnType = async (page) => {
    try {
        const response = await fetch('https://gorest.co.in/public/v1/users?page=' + page) //
        const users = await response.json()
        return users
    } catch (err) {
        console.error(err)
    }
}

export const getUserFromAPI = async (id: string) => {
    try {
        const response = await fetch('https://gorest.co.in/public/v1/users/' + id)
        const user = await response.json()
        return user
    } catch (err) {
        console.error(err)
    }
}

export const updateUser = async (updatedData: UserType) => {
    const API_KEY = process.env.API_TOKEN || '467f495bc0990c67185f0fb496167f7600fe2217bb89c75fdc8e9e9fa1071ae5'

    try {
        const response = await fetch('https://gorest.co.in/public/v1/users/' + updatedData.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(updatedData)
        })
        return response.json()

    } catch (err) {
        console.error(err)
    }
}