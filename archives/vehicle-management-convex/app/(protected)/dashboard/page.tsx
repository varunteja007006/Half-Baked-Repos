import React from "react";

import DashboardTemplate from "@/components/templates/dashboard.template";
import { ContentLayout } from "@/components/features/admin-panel/content-layout";

export default function Page() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardTemplate />
    </ContentLayout>
  );
}
