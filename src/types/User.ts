export type UserInfo = {
	id: string
	email: string
	firstName: string
	lastName: string
	createdAt: string
	updatedAt: string
	trips: Trip[]
	cart: Cart
}

export type Cart = {
	createdAt: string
	updatedAt: string
	id: string
	total: number
	userId: string
	items: CartItem[]
}

export type CartItem = {
	id: string
	name: string
	description: string
	price: number
	quantity: number
	createdAt: string
	updatedAt: string
}

export type Trip = {
	id: string
	name: string
	description: string
	price: number
	startDate: string
	endDate: string
	street: string
	city: string
	state: string
	country: string
	imageUrl: string
	createdAt: string
	updatedAt: string
	userId: string
}
