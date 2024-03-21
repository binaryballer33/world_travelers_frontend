export type FlightResponse = {
	results: {
		status: string
		status_code: number
		result: {
			sid: string
			page_number: string
			itinerary_count: string
			search_type: string
			search_data: {
				code: string // example 'TPA'
				search_0: {
					origin: AirportLocation
					destination: AirportLocation
					departure_date: string
				}
				search_01: {
					origin: AirportLocation
					destination: AirportLocation
					departure_date: string
				}
			}
			itinerary_data: {
				price_details: PriceDetails
				slice_data: {
					info: {
						duration: string // example flight duration format "DD:HH:MM" example from tpa to mia 00:01:10
						connection_count: number // example 0
					}
					airline: {
						code: string // format "AA"
						name: string // example "American Airlines"
						logo: string // image url to the logo
					}
					departure: {
						airport: Airport
						datetime: DateTime
					}
					arrival: {
						airport: Airport
						datetime: DateTime
					}
					flight_data: {
						flight_0: {
							info: FlightInfo
							departure: {
								airport: Airport
								datetime: DateTime
							}
							arrival: {
								airport: Airport
								datetime: DateTime
							}
						}
					}
				}
			}
		}
	}
}

export type Airport = {
	code: string // example "TPA"
	name: string // example "Tampa Intl"
	city: string // example "Tampa"
	state: string // example "FL"
	country: string // example "United States"
}

export type FlightInfo = {
	cabin_name: string // example 'Basic Economy'
	marketing_airline: string // example 'American Airlines'
	marketing_airline_code: string // example 'AA'
	operating_airline: string // example 'American Airlines'
	operating_airline_code: string // example 'AA'
	flight_number: string // example '2503'
	stop_count: number // example 0
	aircraft: string // example 'Airbus A319'
	aircraft_type: string // example 'Jet'
	duration: string // example '00:01:10'
}

export type DateTime = {
	date: string // example '2024-05-01'
	date_display: string // example 'Wednesday, May 1st, 2024'
	time_24h: string // example '14:45'
	time_12h: string // example '2:45pm'
	date_time: string // example '2024-05-01T14:45:00'
}

export type PriceDetails = {
	number_of_passengers: number
	number_of_tickets: number
	display_base_fare: number
	display_taxes: number
	display_fees: number
	display_pcln_fees: number
	display_ppn_fees: number
	display_taxes_and_ppn_fees: number
	display_total_fare_per_ticket: number
	display_total_fare: number
	display_currency: string
	display_symbol: string
}

export type AirportLocation = {
	isAirport: boolean
	name: string
	city: string
	state: string
	country: string
}
