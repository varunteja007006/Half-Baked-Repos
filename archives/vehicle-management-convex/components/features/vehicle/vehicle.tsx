import {
  VehicleManufacturerDialogForm,
  VehicleModelDialogForm,
  VehicleDialogForm,
  ManufacturerTable,
  VehicleTable,
  VehicleInstanceTable,
} from "@/components/features/vehicle";

export default function Vehicle() {
  return (
    <div className="flex flex-col gap-6">
      <section id="vehicles" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Vehicle Fleet</h2>
          <VehicleDialogForm />
        </div>
        <VehicleInstanceTable />
      </section>

      <section id="vehicle-models" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Vehicle Models</h2>
          <VehicleModelDialogForm />
        </div>
        <VehicleTable />
      </section>

      <section id="manufacturers" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Vehicle Manufacturers</h2>
          <VehicleManufacturerDialogForm />
        </div>
        <ManufacturerTable />
      </section>
    </div>
  );
}
