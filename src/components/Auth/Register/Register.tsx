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
import { useRegisterMutation } from '../../../api/backendApis/userApi'
import { Error, Loading } from '../../StateIndicators'
import { transformTextField } from '../../../utils/helperFunctions/stringTransformations'
import { useRegistrationConfirmationEmailMutation } from '../../../api/backendApis/emailApi'

type RegisterProps = BoxProps & {
    clearFormButton?: boolean
}

type FormState = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

const initialFormState: FormState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Register = ({ width, height, clearFormButton }: RegisterProps) => {
    const textFields = Object.keys(initialFormState)
    const [formData, setFormData] = useState<FormState>(initialFormState) // create state to hold the form data
    const [register, { isError, error, isLoading }] = useRegisterMutation()
    const [registrationConfirmationEmail] = useRegistrationConfirmationEmailMutation() // mutation to send purchase confirmation email
    /* create a state to hold the focused text field
    * focusedField is used to determine if the clear icon should be shown
    */
    const [focusedField, setFocusedField] = useState('')

    const handleClearForm = () => {
        setFormData(initialFormState) // clear the form when the clear button is clicked
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        const authData = await register(formData)

        // Check if error exists
        if ('error' in authData) {
            // Handle error here
            console.error(authData.error)
        } else {
            // only sending welcome email if registration is successful
            if (authData.data?.user) {
                const email = {
                    from: 'shaqmandy@resend.dev',
                    to: formData.email,
                    subject: 'Welcome to the M.A.S Fruit Market',
                    html: `<p>Thank you for registering with us, ${formData.firstName} ${formData.lastName}! We hope you enjoy your shopping experience with us.</p>`,
                }

                // send registration confirmation email
                await registrationConfirmationEmail(email)
            }
            handleClearForm() // clear the form after submitting
        }
    }

    const [passwordsMatch, setPasswordsMatch] = useState(true)
    // enhanced onChangeHandler to check if the confirm password matches the password
    const onChangeHandler = (event, textfield: string) => {
        const value = event.target.value
        setFormData({
            ...formData,
            [textfield]: value,
        })

        // check if the confirm password matches the password for the register form
        if (textfield === 'confirmPassword' && value !== formData.password) {
            setPasswordsMatch(false)
        } else {
            setPasswordsMatch(true)
        }
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
            // Stack that centers the form in the middle of the page
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
                        width: width
                            ? width
                            : { xs: 250, sm: 500, md: 800 },
                        height:
                            height && textFields.length < 5
                                ? height
                                : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {/* Header For The Form */}
                    <Typography textAlign="center" variant="h4" color="primary">
                        Create An Account
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
                                type={textfield === 'password' || textfield === 'confirmPassword' ? 'password' : 'text'}
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

                    {/* Passwords Do Not Match Error Message */}
                    {!passwordsMatch && formData?.confirmPassword && (
                        <Typography
                            color="error"
                            variant="body2"
                            textAlign="center"
                        >
                            Passwords Do Not Match
                        </Typography>
                    )}

                    {/* Submit and Clear Buttons Render Conditionally Based On Props */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            placeItems: { xs: 'center', md: 'normal' },
                            justifyContent: { md: 'center' },
                        }}
                        gap={1}
                    >
                        {/* Optional Button to Add To The Form */}
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
    }
};

export default Register;

