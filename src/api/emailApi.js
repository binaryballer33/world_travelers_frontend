import {
	getPurchaseConfirmationEmailRoute,
	getUserRegistrationConfirmationEmailRoute,
} from "../utils/constants";
import api from "./api";

// email api endpoints
const emailApi = api.injectEndpoints({
	endpoints: (builder) => ({
		// email endpoints
		registrationConfirmationEmail: builder.mutation({
			query: (email) => ({
				url: getUserRegistrationConfirmationEmailRoute(),
				method: "POST",
				body: email,
			}),
		}),
		purchaseConfirmationEmail: builder.mutation({
			query: (email) => ({
				url: getPurchaseConfirmationEmailRoute(),
				method: "POST",
				body: email,
			}),
		}),
	}),
});

export default emailApi;

export const {
	useRegistrationConfirmationEmailMutation,
	usePurchaseConfirmationEmailMutation,
} = emailApi;
