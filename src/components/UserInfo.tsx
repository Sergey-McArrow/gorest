import { NextPage } from 'next'
import { Stack, Button, Paper, MenuItem } from '@mui/material'
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




    const methods = useForm<UserType>({ defaultValues })
    const { handleSubmit, reset, control, setValue, watch } = methods
    const onSubmit = async (data: UserType) => {
        const updatedUser = await updateUser({ ...data, id: user.id })
        updatedUser ? toast.success('Data submitted successfully!') : toast.error('An error occurred')
    }

    return (
        <>
            <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3, minHeight: '100vh', minWidth: 1 / 1 }}>
                <FormProvider {...methods}>
                    <Stack
                        component='form'
                        direction={'column'}
                        spacing={3}
                        sx={{ width: 7 / 10 }}
                        onSubmit={handleSubmit(onSubmit)}>

                        <FormInputText name='name' label="Name" />
                        <FormInputText name='email' label="E Mail" />
                        <FormInputDropdown name='gender' label='Gender'
                            options={[Gender.female, Gender.male]} />
                        <FormInputDropdown name='status' label="Status"
                            options={[Status.inactive, Status.active]} />

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Submit
                        </Button>
                    </Stack>
                </FormProvider>
            </Paper >
            <ToastContainer />
        </>
    )
}

export default UserInfo