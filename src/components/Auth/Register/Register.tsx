import React, { useState } from 'react'
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
import { TRegisterSchema, initialRegisterFormState } from '../../../types/Auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '../../../types/Auth'
import styles, { formContainerStyles } from './styles'
import { useNavigate } from 'react-router-dom'

const Register = ({ width, height }: BoxProps) => {
    const textFields = Object.keys(initialRegisterFormState) // get the text fields from the initial form state
    const [focusedField, setFocusedField] = useState('') // used to determine if the clear icon should be shown
    const [registerUser, { isError, error, isLoading }] = useRegisterMutation()
    const [registrationConfirmationEmail] = useRegistrationConfirmationEmailMutation() // mutation to send purchase confirmation email
    const navigate = useNavigate()

    const { // destructuring the useForm hook to get the register, watch, setValue, reset, handleSubmit, and formState properties
        register,
        watch,
        setValue,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = async (data: TRegisterSchema) => {
        try {
            const response = await registerUser(data)

            if ('data' in response && 'user' in response.data) {
                const email = {
                    from: 'shaqmandy@resend.dev',
                    to: data.email,
                    subject: 'Welcome Fellow World Traveler!',
                    html: `<p>Thank You For Registering With Us ${data.firstName} ${data.lastName}! We Strive To Make Your Traveling Experience Alot Smoother and Cheaper.</p>`,
                }
                await registrationConfirmationEmail(email) // send registration confirmation email
                navigate('/') // go to the home page
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <Stack sx={styles.stackContainer} >
                {/* Paper container for the entire form. Height and width can be modified through props  */}
                <Paper
                    elevation={3}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={formContainerStyles(width as number | string, height as number | string)}
                >
                    {/* Header For The Form */}
                    <Typography variant="h4" sx={styles.formHeader}>Create An Account</Typography>

                    {/* Text Fields For The Form */}
                    {textFields.map((textfield) => {
                        const transformedTextField =
                            transformTextField(textfield)
                        return (
                            <TextField
                                {...register(textfield as keyof TRegisterSchema)}
                                key={textfield}
                                id={transformedTextField}
                                label={transformedTextField}
                                placeholder={`Type Your ${transformedTextField} Here`}
                                required
                                type={textfield === 'password' || textfield === 'confirmPassword' ? 'password' : 'text'}
                                onFocus={() => setFocusedField(textfield)}
                                error={!!errors[textfield]} // add error state to the textfield
                                helperText={errors[textfield]?.message} // add error message to the textfield

                                InputProps={{ // adds clear icon to the textfield
                                    endAdornment:
                                        // only show clear icon if textfield is focused and textfield is not empty
                                        focusedField === textfield && watch(textfield as keyof TRegisterSchema) !== '' && (
                                            <InputAdornment position="end">
                                                <Tooltip title={`Clear ${textfield}`}>
                                                    <IconButton
                                                        onClick={() => setValue(textfield as keyof TRegisterSchema, '')}
                                                    >
                                                        <ClearIcon color="primary" />
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        ),
                                }}
                                sx={styles.textfield}
                            />
                        )
                    })}

                    {/* Form Buttons Container */}
                    <Box gap={1} sx={styles.buttonContainer}>
                        {/* Form Buttons */}
                        <Button
                            variant="contained"
                            onClick={() => reset()}
                            disabled={isSubmitting}
                            sx={styles.formButtons}
                        >
                            Clear Form
                        </Button>

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                            sx={styles.formButtons}
                        >
                            Submit
                        </Button>
                    </Box>

                </Paper>
                {/* Error Message Renders If An Error Is Returned From The Backend */}
                {isError && <Error error={error} height="auto" />}
            </Stack>
        )
    }
};

export default Register;

