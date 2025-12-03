export const VEHICLE_DOC_KINDS = [
  "VehicleRC",
  "Insurance",
  "Permit",
  "Fitness",
  "PollutionCertificate",
  "TaxDocument",
  "GoodsPermit",
  "NationalPermit",
] as const;

export type VehicleDocKind = (typeof VEHICLE_DOC_KINDS)[number];

export const VEHICLE_DOC_DISPLAY_NAMES: Record<VehicleDocKind, string> = {
  VehicleRC: "Vehicle Registration Certificate (RC)",
  Insurance: "Insurance Certificate",
  Permit: "Permit",
  Fitness: "Fitness Certificate",
  PollutionCertificate: "Pollution Under Control Certificate",
  TaxDocument: "Tax Document",
  GoodsPermit: "Goods Permit",
  NationalPermit: "National Permit",
};

export const VEHICLE_DOC_DESCRIPTIONS: Record<VehicleDocKind, string> = {
  VehicleRC: "Vehicle registration certificate issued by RTO",
  Insurance: "Valid vehicle insurance certificate",
  Permit: "Vehicle permit document",
  Fitness: "Fitness certificate for commercial vehicles",
  PollutionCertificate: "Pollution under control certificate",
  TaxDocument: "Vehicle tax payment document",
  GoodsPermit: "Permit for carrying goods",
  NationalPermit: "National permit for interstate transport",
};
