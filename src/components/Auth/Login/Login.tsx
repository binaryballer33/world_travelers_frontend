/* eslint-disable react/prop-types */
import React, { SyntheticEvent, useState } from 'react'
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Stack,
    InputAdornment,
    Tooltip,
    IconButton,
    BoxProps,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { useLoginMutation } from '../../../api/backendApis/userApi'
import { Error, Loading } from '../../StateIndicators'
import { transformTextField } from '../../../utils/helperFunctions/stringTransformations'

type LoginProps = BoxProps & {
    clearFormButton?: boolean
}

type FormData = {
    email: string
    password: string
}

const initialFormState = {
    email: '',
    password: '',
}

const Login = ({ width, height, clearFormButton }: LoginProps) => {
    const textFields = Object.keys(initialFormState) // get the text fields from the initial form state
    const [formData, setFormData] = useState<FormData>(initialFormState) // create state to hold the form data

    /* create a state to hold the focused text field
    * focusedField is used to determine if the clear icon should be shown
    */
    const [focusedField, setFocusedField] = useState('')

    // get the mutation functions and the state of the mutation functions
    const [login, { isError, error, isLoading }] = useLoginMutation()

    // clear the form when the clear button is clicked
    const handleClearForm = () => {
        setFormData(initialFormState)
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        const authData = await login(formData)
        console.log(formData);

        console.log({ authData });

        handleClearForm() // clear the form after submitting
    }
    console.log({ formData });

    // enhanced onChangeHandler to check if the confirm password matches the password
    const onChangeHandler = (event, textfield: string) => {
        const value = event.target.value
        setFormData({
            ...formData,
            [textfield]: value,
        })
    }

    return (
        isLoading ? (
            <Loading />
        ) : (
            <Stack
                sx={{
                    width: '100%',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Paper container for the entire form. Height and width can be modified through props  */}
                <Paper
                    elevation={3}
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: 2,
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: width ? width : { xs: 250, sm: 500, md: 800 },
                        height: height && textFields.length < 5 ? height : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {/* Header For The Form */}
                    <Typography textAlign="center" variant="h4" color="primary">
                        Sign In
                    </Typography>

                    {/* Text Fields For The Form */}
                    {textFields.map((textfield) => {
                        const transformedTextField =
                            transformTextField(textfield)
                        return (
                            <TextField
                                key={textfield}
                                id={transformedTextField}
                                label={transformedTextField}
                                placeholder={`Type Your ${transformedTextField} Here`}
                                value={formData[textfield]}
                                required
                                type={textfield === 'password' ? 'password' : 'text'}
                                onChange={(event) => onChangeHandler(event, textfield)}
                                onFocus={() => setFocusedField(textfield)}
                                // adds the clear icon to the textfield
                                InputProps={{
                                    endAdornment:
                                        // only show the clear icon if the textfield is focused and the textfield is not empty
                                        focusedField === textfield &&
                                        formData[textfield] !==
                                        '' && (
                                            <InputAdornment position="end">
                                                <Tooltip
                                                    title={`Clear ${textfield}`}
                                                >
                                                    <IconButton
                                                        onClick={() =>
                                                            setFormData({
                                                                ...formData,
                                                                [textfield]:
                                                                    '',
                                                            })
                                                        }
                                                    >
                                                        <ClearIcon color="primary" />
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        ),
                                }}
                                sx={{
                                    width: '90%',
                                    ml: 'auto',
                                    mr: 'auto',
                                }}
                            />
                        )
                    })}

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            placeItems: { xs: 'center', md: 'normal' },
                            justifyContent: { md: 'center' },
                        }}
                        gap={1}
                    >
                        {/* Clear Button Render Conditionally Based On Props */}
                        {clearFormButton && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    mb: { xs: 0, md: 2 },
                                    width: { xs: '90%', md: '45%' },
                                    ':hover': { bgcolor: 'primary.dark' },
                                }}
                                onClick={handleClearForm}
                            >
                                Clear Form
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            sx={{
                                mb: { xs: 0, md: 2 },
                                width: { xs: '90%', md: '45%' },
                                ':hover': { bgcolor: 'primary.dark' },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>

                    {/* Error Message Renders If An Error Is Returned From The Backend */}
                    {isError && <Error error={error} height="auto" />}
                </Paper>
            </Stack>
        )
    )
};

export default Login;

