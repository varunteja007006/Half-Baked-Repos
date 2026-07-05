import { BRAND_NAME } from "@/lib/config/brand";

import { ContentLayout } from "@/components/features/admin-panel/content-layout";

import HomeTemplate from "@/components/templates/home.template";

export default function Page() {
  return (
    <ContentLayout title={BRAND_NAME}>
      <HomeTemplate />
    </ContentLayout>
  );
}
