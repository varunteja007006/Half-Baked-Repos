import { AddUserForm } from "@/components/features/users/AddUserForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddUserCard() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Create a new user account.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddUserForm />
        </CardContent>
      </Card>
    </div>
  );
}
