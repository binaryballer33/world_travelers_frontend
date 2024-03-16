import { Libraries } from '@react-google-maps/api'

export const libraries: Libraries = ['places'] // have to keep this outside of component to avoid re-renders
export const defaultBounds = { ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } }

export const BACKEND_BASE_URL = 'http://localhost:3000'
export const TRIP_ADVISOR_BASE_URL = 'https://travel-advisor.p.rapidapi.com' // https://rapidapi.com/apidojo/api/travel-advisor
export const TRIP_ADVISOR_HOST_DOMAIN = 'travel-advisor.p.rapidapi.com'
export const WEATHER_BASE_URL = 'https://weatherapi-com.p.rapidapi.com' // https://rapidapi.com/weatherapi/api/weatherapi-com
export const WEATHER_API_HOST_DOMAIN = 'weatherapi-com.p.rapidapi.com'

/* ROUTES */

/* THIRD PARTY API ROUTES */

/* TRIP ADVISOR API ROUTES */
export function getPlacesByMapBoundsRoute(typeOfPlace: string) {
	return `/${typeOfPlace}/list-in-boundary`
}

/* OPEN WEATHER API ROUTES */
export function getWeatherThreeDayForecastRoute() {
	return '/forecast.json'
}

export function getCurrentWeatherRoute() {
	return '/current.json'
}

/* TRIPS ROUTES */
export function getTripsByUserIdRoute() {
	return '/trips/user'
}

export function getCreateTripRoute() {
	return '/trips/create/trip'
}

export function getUpdateTripRoute(id: string) {
	return `/trips/update/trip/${id}`
}

export function getDeleteTripRoute(id: string) {
	return `/trips/delete/trip/${id}`
}

/* PRODUCT ROUTES */

export function getAllProductsRoute() {
	return '/products'
}

export function getProductByIdRoute(id: string) {
	return `/products/product/${id}`
}

export function getCreateProductRoute() {
	return '/products/create/'
}

export function getUpdateProductRoute(id: string) {
	return `/products/update/${id}`
}

export function getRemoveProductRoute(id: string) {
	return `/products/delete/${id}`
}

/* USER ROUTES */

export function getAllUsersRoute() {
	return '/user/'
}

export function getUserRegisterRoute() {
	return '/user/register/'
}

export function getUserLoginRoute() {
	return '/user/login'
}

export function getUserProfileRoute() {
	return '/user/profile'
}

export function getUpdateUserRoute() {
	return '/user/update/user'
}
export function getDeleteUserRoute() {
	return '/user/delete/user'
}

export function getInCartRoute() {
	return '/cart/incart'
}

export function getCheckoutOrderRoute() {
	return '/cart/checkout'
}

export function getCancelOrderRotue() {
	return '/cart/cancel'
}

export function getRemoveItemRoute() {
	return '/cart/delete'
}

export function getIncreaseCountRoute() {
	return '/cart/updateUp'
}

export function getDecreaseCountRoute() {
	return '/cart/updateDown'
}

export function getAddToCartRoute() {
	return '/cart/add'
}

export function getInitialAddRoute() {
	return '/cart/addCart'
}

/* EMAIL ROUTES */

export function getPurchaseConfirmationEmailRoute() {
	return '/email/puchase/confirmation/mail'
}

export function getUserRegistrationConfirmationEmailRoute() {
	return '/email/registration/email'
}
