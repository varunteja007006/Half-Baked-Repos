import { authClient } from "./auth-client";

export const signOut = async (cb: () => void) => {
	return await authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				cb();
			},
		},
	});
};
