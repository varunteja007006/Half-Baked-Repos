import { authClient } from "@/lib/auth-client";

export const signIn = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	return await authClient.signIn.email(
		{
			email,
			password,
			callbackURL: "/dashboard",
			rememberMe: true,
		},
		{
			//callbacks
		},
	);
};
