"use server";

import { signOut } from "@/auth";
import fetchDataAuth from "@/fetches/fetchDataAuth";
import endpoints from "@/utils/endpoints";

export const logoutForm = async (redirectTo?: string) => {
	await signOut({
		redirectTo,
		redirect: true,
	});
	await fetchDataAuth({
		api: endpoints.auth.logout,
		method: 'POST',
	})
};