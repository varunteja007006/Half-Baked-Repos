import RouteTypeManagement from "./RouteTypeManagement";
import RouteManagement from "./RouteManagement";

export default function Routes() {
  return (
    <div className="space-y-6">
      <RouteManagement />

      <RouteTypeManagement />
    </div>
  );
}
