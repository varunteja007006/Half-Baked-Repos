import DriverProfileForm from "@/components/features/user/UserProfile";
import DriverBankDetails from "@/components/features/user/UserBankDetails";
import DriverFileUpload from "@/components/features/user/UserFileUpload";

export default function EditProfile() {
  return (
    <main>
      <div className="space-y-6">
        <section className="bg-card rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Profile</h2>
          <div>
            <DriverProfileForm className="grid grid-cols-3 gap-5" />
          </div>
        </section>

        <section className="bg-card rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Bank details</h2>
          <div>
            <DriverBankDetails className="grid grid-cols-3 gap-5" />
          </div>
        </section>

        <section className="bg-card rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Documents</h2>
          <div>
            <DriverFileUpload className="grid grid-cols-2 gap-5 space-y-0" />
          </div>
        </section>
      </div>
    </main>
  );
}
