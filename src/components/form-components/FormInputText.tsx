import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { FormInputProps } from '@/types/FormInputProps'
import TextField from '@mui/material/TextField'

export const FormInputText = ({ name, label }: FormInputProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextField
                    variant='filled'
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    required
                />
            )}
        />
    )
}