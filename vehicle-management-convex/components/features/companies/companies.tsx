import { AddCompanyDialogForm } from "./dialog-form";
import { CompanyTable } from "./company-table";

export default function Companies() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Companies</h2>
          <p className="text-muted-foreground">
            Manage and monitor all registered companies in your fleet network.
          </p>
        </div>
        <AddCompanyDialogForm />
      </div>
      <CompanyTable />
    </div>
  );
}
