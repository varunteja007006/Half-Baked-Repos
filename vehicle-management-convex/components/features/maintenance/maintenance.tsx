import { UnderDevelopment } from "@/components/common";

export default function Maintenance() {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">Maintenance</h3>
      <p className="text-muted-foreground">Report vehicle issues and maintenance requests.</p>
      <UnderDevelopment />
    </div>
  );
}
