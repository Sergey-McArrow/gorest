
import { Dispatch, SetStateAction, useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Gender, UserType } from '@/types/UserTypes'
import { NextPage } from 'next'


type ToggleButtonThreeElProps = { setUsers: Dispatch<SetStateAction<UserType[] | null>>, users: UserType[] | null }

export const ToggleButtonThreeEl: NextPage<ToggleButtonThreeElProps> = ({ setUsers, users }) => {
    const [alignment, setAlignment] = useState('all')

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (users) {
            const filteredUsers = users.filter(user => user.gender === newAlignment)
            setUsers(filteredUsers)
            setAlignment(newAlignment)
        }
    }

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value={Gender.female}>{Gender.female}</ToggleButton>
            <ToggleButton value={Gender.male}>{Gender.male}</ToggleButton>
        </ToggleButtonGroup>
    )
}