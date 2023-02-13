import type { FC } from 'react'
import { useRouter } from 'next/router'

import { Stack, Button, Paper, Typography } from '@mui/material'
import { FormProvider, useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { Gender, Status, UserType } from '@/types/UserTypes'
import { FormInputText } from '@/components/form/FormInputText'
import { FormInputDropdown } from '@/components/form/FormInputDropdown'
import { updateUser } from '@/utils/api'

type UserInfoProps = { user: UserType }

const UserInfo: FC<UserInfoProps> = ({ user }) => {
    const defaultValues = {
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status
    }
    const router = useRouter()

    const methods = useForm<UserType>({ defaultValues })
    const { handleSubmit, reset, control, setValue, watch } = methods
    const onSubmit = async (newUser: UserType) => {
        const updatedUser = await updateUser({ ...newUser, id: user.id })
        const { data } = updatedUser



        if (data instanceof Array) {
            const { field, message } = data[0]
            toast.error(`An error occurred. 
            Message: ${field} ${message} `)
        }
        else if ('message' in data) {
            const { message } = data
            toast.error(`An error occurred. 
            Message:  ${message} `)
        }
        else {
            toast.success('Data sent successfully!')
            setTimeout(() => { router.back() }, 3000)
        }
    }

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
                            onSubmit={handleSubmit(onSubmit)}>
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
                                <Button variant='outlined' color='inherit' onClick={() => router.back()}>
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