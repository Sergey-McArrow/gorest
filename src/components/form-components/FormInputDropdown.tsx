import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormContext, Controller } from "react-hook-form"
import { FormInputProps } from '@/types/FormInputProps'
import { NextPage } from 'next'


export const FormInputDropdown: NextPage<FormInputProps> = ({
    name,
    label,
    options
}) => {
    const { control } = useFormContext()
    const generateSingleOptions = () => {
        return options.map((option: any) => {
            return (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            )
        })
    }

    return (
        <FormControl size='small' variant='standard' >
            <InputLabel>{label}</InputLabel>
            <Controller
                render={({ field: { onChange, value } }) => (
                    <Select onChange={onChange} value={value} required>
                        {generateSingleOptions()}
                    </Select>
                )}
                name={name}
                control={control}
            />
        </FormControl>
    )
}
