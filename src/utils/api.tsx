export const getUsersDataFromAPI = async () => {
    try {
        const data = await fetch(`https://gorest.co.in/public/v1/users?access-token=${process.env.API_TOKEN}`)
        return (data)

    } catch (err) {
        console.log(err)
    }

}