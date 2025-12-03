import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export type Role = "driver" | "admin" | "super";

export type DocumentType = "Aadhaar" | "PAN" | "DL" | "BankPassbook" | "VehicleRC" | "Insurance";
export type TripStatus = "Draft" | "InProgress" | "Completed" | "Approved";

export type ListUserBankDetailsResult = ReturnType<
  typeof useQuery<typeof api.bank.listUserBankDetails>
>;
export type LoggedInUser = ReturnType<typeof useQuery<typeof api.auth.loggedInUser>>;
export type ListUserDocuments = ReturnType<
  typeof useQuery<typeof api.documentList.listUserDocuments>
>;

export type TripsV1ById = ReturnType<typeof useQuery<typeof api.trip_v1.getTripV1>>;
