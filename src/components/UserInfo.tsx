import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'

import { Stack, Button, Paper, Typography } from '@mui/material'
import { FormProvider, useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { Gender, Status, UserForRenderingType, UserType } from '@/types/UserTypes'
import { FormInputText } from '@/components/form/FormInputText'
import { FormInputDropdown } from '@/components/form/FormInputDropdown'
import { updateUser } from '@/utils/api'

type UserInfoProps = { user: UserType }

const UserInfo: FC<UserInfoProps> = ({ user: { id, ...userForRender } }) => {
    const router = useRouter()
    const methods = useForm<UserForRenderingType>({ defaultValues: userForRender })

    const onSubmit = useCallback(async (payload: UserForRenderingType) => {
        const { data: updatedUserResponse } = await updateUser({ ...payload, id })

        if (Array.isArray(updatedUserResponse)) {
            const [error] = updatedUserResponse
            toast.error(`An error occurred. 
            Message: ${error.field} ${error.message} `)
        }
        else if ('message' in updatedUserResponse) {
            const { message } = updatedUserResponse
            toast.error(`An error occurred. 
            Message:  ${message}`)
        }
        else {
            toast.success('Data sent successfully!')
            setTimeout(() => { router.back() }, 3000)
        }
    }, [router, id])

    const handleGoBack = useCallback(() => router.back(), [router])

    return (
        <>
            <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3, minHeight: '100vh' }}>
                <Stack alignItems='center' spacing={3} sx={{ width: '70%' }}>
                    <Typography component='h1' variant='h6' align='center'>Edit user details</Typography>
                    <FormProvider {...methods}>
                        <Stack sx={{ width: '70%' }}
                            component='form'
                            direction={'column'}
                            spacing={3}
                            onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormInputText name='name' label="Name" />
                            <FormInputText name='email' label="E Mail" />
                            <FormInputDropdown name='gender' label='Gender'
                                options={[Gender.female, Gender.male]} />
                            <FormInputDropdown name='status' label="Status"
                                options={[Status.inactive, Status.active]} />
                            <Stack spacing={3} direction='row-reverse' justifyContent='flex-end' >
                                <Button type='submit' variant='contained' color='success'>
                                    Submit
                                </Button>
                                <Button variant='outlined' color='inherit' onClick={handleGoBack}>
                                    Go Back
                                </Button>
                            </Stack>
                        </Stack>
                    </FormProvider>
                </Stack>
            </Paper >
            <ToastContainer />
        </>
    )
}

export default UserInfo