import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import { SquarePen } from "lucide-react";

export default function ProfileCard({
  name,
  onEditClick,
}: Readonly<{
  name: string;
  onEditClick: () => void;
}>) {
  return (
    <Card className="flex items-center justify-between">
      <CardContent className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg font-semibold text-slate-700 dark:text-slate-300">
            {getInitials(name)}
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Profile</div>
            <div className="font-medium">{name}</div>
          </div>
        </div>
        <div>
          <Button onClick={onEditClick} size={"icon"} aria-label="Edit profile">
            <SquarePen />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
