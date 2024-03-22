/*  used to calculate the amount of time it takes given a string like "00:13:34" */
export function getTimeDetails(timeString: string) {
	const [days, hours, minutes] = timeString.split(':').map(Number)

	const dayString =
		days === 0 ? '' : days > 1 ? `${days} Days` : `${days} Day`
	const hourString =
		hours === 0 ? '' : hours > 1 ? `${hours} Hours` : `${hours} Hour`
	const minuteString =
		minutes === 0 ? '' : minutes > 1 ? `${minutes} Mins` : `${minutes} Min`

	return `${dayString} ${hourString} ${minuteString}`
}
