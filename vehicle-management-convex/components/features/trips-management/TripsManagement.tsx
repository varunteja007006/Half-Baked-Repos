import Link from "next/link";
import TripTypeTable from "./trip-type-table/TripTypeTable";
import TripV1Table from "./trip-v1-table/TripV1Table";
import { TripTypeDialogForm } from "./TripTypeDialog";
import { Button } from "@/components/ui/button";

export default function TripsManagement() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Trips</h3>
          <div>
            <Link href={"/dashboard/super/trips-management/add"}>
              <Button>Add Trip</Button>
            </Link>
          </div>
        </div>
        <TripV1Table />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Trip Types</h3>
          <div>
            <TripTypeDialogForm />
          </div>
        </div>
        <TripTypeTable />
      </div>
    </div>
  );
}
