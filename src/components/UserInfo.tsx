import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Stack, Button, Paper, Typography } from '@mui/material'
import { FormProvider, useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { Gender, Status, UserType } from '@/types/UserTypes'
import { FormInputText } from '@/components/form-components/FormInputText'
import { FormInputDropdown } from '@/components/form-components/FormInputDropdown'
import { updateUser } from '@/utils/api'

type UserInfoProps = { user: UserType }

const UserInfo: NextPage<UserInfoProps> = ({ user }) => {
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
        const updatedUser = await updateUser({ ...newUser, id: user.id }, process.env.API_TOKEN || '')
        const { data } = updatedUser
        if (data instanceof Array) {
            const { field, message } = data[0]
            toast.error(`An error occurred. 
            Message: ${field} ${message} `)
        }
        else {
            toast.success('Data sent successfully!')
            setTimeout(() => { router.back() }, 3000)
        }
    }

    return (
        <>
            <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3, minHeight: '100vh', minWidth: 1 / 1 }}>
                <Stack alignItems='center' spacing={3} sx={{ width: '70%' }}>
                    <Typography component='h1' variant='h6' align='center'>Edit user details and click <strong>SUBMIT</strong> button</Typography>
                    <FormProvider {...methods}>
                        <Stack
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
                            <Button type='submit' variant='contained' color='primary'>
                                Submit
                            </Button>
                            <Button type='reset' variant='contained' color='secondary' onClick={() => reset()}>
                                Reset
                            </Button>
                            <Button variant='contained' color='info' onClick={() => router.back()}>
                                Go Back
                            </Button>
                        </Stack>
                    </FormProvider>
                </Stack>
            </Paper >
            <ToastContainer />
        </>
    )
}

export default UserInfo