import { authClient } from "@/lib/auth-client";

export const signUp = async ({
	email,
	password,
	name,
	image,
}: {
	email: string;
	password: string;
	name: string;
	image?: string;
}) => {
	return await authClient.signUp.email(
		{
			email,
			password,
			name,
			image,
			callbackURL: "/dashboard",
		},
		{
			onRequest: (_ctx) => {},
			onSuccess: (_ctx) => {},
			onError: (ctx) => {
				alert(ctx.error.message);
			},
		},
	);
};
