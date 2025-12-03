"use client";

import { useRouter } from "next/navigation";
import AllAddForms from "../actions/AllAddForms";
import TripV1Form from "./TripV1Form";

export default function TripManagementAdd() {
  const router = useRouter();

  const handleOnSuccess = () => {
    router.push("/dashboard/super/trips-management");
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="col-span-2">
        <TripV1Form onSuccess={handleOnSuccess} />
      </div>
      <div className="w-full p-4 space-y-2 border rounded-lg">
        <h2 className="text-base">Add Data</h2>
        <p className="text-sm text-muted-foreground">Add new trip data using the forms below:</p>
        <AllAddForms />
      </div>
    </div>
  );
}
