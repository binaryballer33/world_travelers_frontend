// capitalize the first letter of each word
export const capitalize = (str: string) => {
	return str.replace(
		/\w\S*/g,
		(txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
	)
}

export const transformTextField = (textfield: string) => {
	if (textfield === 'firstName') {
		textfield = 'First Name'
	} else if (textfield === 'lastName') {
		textfield = 'Last Name'
	} else if (textfield === 'confirmPassword') {
		textfield = 'Confirm Password'
	} else {
		textfield = capitalize(textfield)
	}
	return textfield
}
