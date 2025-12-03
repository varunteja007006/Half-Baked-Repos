// List of user document kinds for upload
export const USER_DOC_KINDS = ["Aadhaar", "PAN", "Driver License", "BankPassbook"] as const;

export type UserDocKind = (typeof USER_DOC_KINDS)[number];
