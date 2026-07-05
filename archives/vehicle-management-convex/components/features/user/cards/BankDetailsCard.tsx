import { ListUserBankDetailsResult } from "@/lib/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building2, MapPin, CircleUserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BankDetailsCard({
  bankDetails,
  grid = 1,
}: Readonly<{
  bankDetails: ListUserBankDetailsResult;
  grid?: number;
}>) {
  return (
    <div className="space-y-4">
      {bankDetails && bankDetails.length > 0 ? (
        bankDetails.map((detail) => (
          <Card key={detail._id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CircleUserRound className="size-6 text-primary" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {detail.account_holder_name}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={cn(
                  "grid gap-4 grid-cols-1",
                  grid === 1 ? "grid-cols-1" : grid === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
                )}
              >
                <Block label="Account Number" value={detail.account_number} />
                <Block label="Account Type" value={detail.account_type} />
                <Block label="IFSC" value={detail.ifsc_code} />
              </div>
              <div className="border-t pt-2">
                <div className="flex flex-col items-start gap-2">
                  <div className="text-sm flex items-center  gap-1 font-medium text-gray-900 dark:text-gray-100">
                    <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5" />
                    {detail.branch_name}
                  </div>
                  <div className="text-sm flex items-center  gap-1 font-medium text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5" />
                    {detail.branch_city}, {detail.branch_pincode}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <CreditCard className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No bank details found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const Block = ({ label, value }: { label: string; value: string | number | undefined }) => {
  return (
    <div className="flex flex-col items-start w-full space-y-2">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
      </div>
      <div className="text-lg w-full font-mono bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-md border dark:border-gray-700">
        {value || "-"}
      </div>
    </div>
  );
};
