import { AddCompanyDialogForm } from "../companies";
import { CreateRouteDialog, CreateRouteTypeDialog } from "../routes";
import { TripTypeDialogForm } from "../trips-management";
import { AddUserFormDialog } from "../users";
import {
  VehicleDialogForm,
  VehicleManufacturerDialogForm,
  VehicleModelDialogForm,
} from "../vehicle";

export default function AllAddForms() {
  return (
    <div className="space-y-4 flex flex-col">
      <AddCompanyDialogForm />
      <CreateRouteDialog />
      <TripTypeDialogForm />
      <CreateRouteTypeDialog />
      <VehicleManufacturerDialogForm />
      <VehicleModelDialogForm />
      <VehicleDialogForm />
      <AddUserFormDialog />
    </div>
  );
}
