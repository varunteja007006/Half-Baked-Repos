"use client";

import React from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { BankDetailsCard, KycDocuments, ProfileCard } from "./cards";
import { useParams, useRouter } from "next/navigation";

export default function DisplayUserInfo() {
  const router = useRouter();
  const params = useParams();
  const appUserId = params.userId as Id<"app_users">;

  const appUser = useQuery(api.appUser.adminGetUser, { appUserId });

  const appUserDetails = appUser?.appUser;
  const userDetails = appUser?.user;
  const bankDetails = useQuery(api.bank.listUserBankDetails, { appUserId });
  const uploadedDocs = useQuery(api.documentList.listUserDocuments, {
    appUserId,
  });

  return (
    <div className="space-y-6">
      <ProfileCard
        name={appUserDetails?.name ?? userDetails?.name ?? "—"}
        onEditClick={() => {
          router.push(`/dashboard/user/${appUserId}/edit`);
        }}
      />

      <BankDetailsCard bankDetails={bankDetails} grid={3} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <KycDocuments uploadedDocs={uploadedDocs} />
      </div>
    </div>
  );
}
