import { UserTable } from "@/components/features/users/user-table";
import { AddUserFormDialog } from "./AddUserFormDialog";

export default function Users() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-end">
        <AddUserFormDialog />
      </div>
      <UserTable />
    </div>
  );
}
