export interface Weather {
	location: {
		name: string
		country: string
		localtime: string
	}
	current: {
		last_updated: string
		temp_c: number
		temp_f: number
		condition: {
			text: string
			icon: string
		}
		wind_mph: number
		wind_kph: number
		wind_degree: number
		wind_dir: string
		precip_in: number
		humidity: number
		cloud: number
		feelslike_c: number
		feelslike_f: number
		uv: number
		gust_mph: number
		gust_kph: number
	}
}

export interface ForecastDay {
	date: string
	day: {
		maxtemp_c: number
		maxtemp_f: number
		mintemp_c: number
		mintemp_f: number
		avgtemp_c: number
		avgtemp_f: number
		maxwind_mph: number
		maxwind_kph: number
		totalprecip_in: number
		totalsnow_cm: number
		avghumidity: number
		daily_chance_of_rain: number
		daily_chance_of_snow: number
	}
	astro: {
		sunrise: string
		sunset: string
		moonrise: string
		moonset: string
		moon_phase: string
	}
	hour: {
		time: string
		temp_c: number
		temp_f: number
		condition: {
			text: string
			icon: string
		}
		wind_mph: number
		wind_kph: number
		wind_degree: number
		wind_dir: string
		precip_in: number
		snow_cm: number
		humidity: number
		cloud: number
		feelslike_c: number
		feelslike_f: number
		windchill_c: number
		windchill_f: number
		heatindex_c: number
		heatindex_f: number
		chance_of_rain: number
		chance_of_snow: number
		gust_mph: number
		gust_kph: number
	}[]
}

export interface WeatherForecast extends Weather {
	forecast: {
		forecastday: ForecastDay[]
	}
}
