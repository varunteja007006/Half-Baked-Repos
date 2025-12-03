import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/** Common literals */
const Role = v.union(v.literal("driver"), v.literal("admin"), v.literal("super"));

const TripStatus = v.union(
  v.literal("Placed"),
  v.literal("In-Progress"), // Trip started
  v.literal("In-Transit"),
  v.literal("Destination"),
  v.literal("Completed"), // Trip ended
  v.literal("Closed"), // Approved and payment processed
);

const TripFileDocuments = v.union(v.literal("StartGatePass"), v.literal("EndGatePass"));

export const UserDocKind = v.union(
  v.literal("Aadhaar"),
  v.literal("PAN"),
  v.literal("Driver License"),
  v.literal("BankPassbook"),
);

export const VehicleDocKind = v.union(
  v.literal("VehicleRC"),
  v.literal("Insurance"),
  v.literal("Permit"),
  v.literal("Fitness"),
  v.literal("PollutionCertificate"),
  v.literal("TaxDocument"),
  v.literal("GoodsPermit"),
  v.literal("NationalPermit"),
);

const VehicleType = v.union(
  v.literal("car"),
  v.literal("truck"),
  v.literal("maxi-cab"),
  v.literal("van"),
  v.literal("bus"),
  v.literal("motorcycle"),
  v.literal("pickup"),
  v.literal("suv"),
);

const PaymentMethod = v.union(v.literal("manual"), v.literal("bulk"), v.literal("external"));

const schema = defineSchema({
  ...authTables,

  // ========== Enum Metadata Tables ==========
  // Roles enumeration table
  roles: defineTable({
    code: v.string(), // "driver", "admin", "super"
    name: v.string(), // "Driver", "Administrator", "Super User"
    description: v.optional(v.string()), // Description of the role
    permissions: v.optional(v.array(v.string())), // Array of permission strings
    sortBy: v.number(), // Sort order for display
    isActive: v.optional(v.boolean()),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // Trip status enumeration table
  trip_statuses: defineTable({
    code: v.string(), // "Placed", "In-Progress", "In-Transit", etc.
    name: v.string(), // Display name
    description: v.optional(v.string()),
    color: v.optional(v.string()), // Hex color for UI display
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // Trip file document types
  trip_file_document_types: defineTable({
    code: v.string(), // "StartGatePass", "EndGatePass"
    name: v.string(), // Display name
    description: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // Trip types enumeration table
  trip_types: defineTable({
    code: v.string(), // e.g., "Regular", "Adhoc"
    name: v.string(),
    description: v.optional(v.string()),
    sortBy: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // User document kinds enumeration table
  user_document_kinds: defineTable({
    code: v.string(), // "Aadhaar", "PAN", "Driver License", "BankPassbook"
    name: v.string(), // Display name
    description: v.optional(v.string()),
    hasExpiry: v.optional(v.boolean()), // Whether this document type has expiry
    isRequired: v.optional(v.boolean()), // Whether this document is required
    validationRegex: v.optional(v.string()), // Regex for document number validation
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"])
    .index("by_required", ["isRequired"]),

  // Vehicle document kinds enumeration table
  vehicle_document_kinds: defineTable({
    code: v.string(), // "VehicleRC", "Insurance", "Permit", etc.
    name: v.string(), // Display name
    description: v.optional(v.string()),
    hasExpiry: v.optional(v.boolean()), // Whether this document type has expiry
    isRequired: v.optional(v.boolean()), // Whether this document is required
    validationRegex: v.optional(v.string()), // Regex for document number validation
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"])
    .index("by_required", ["isRequired"]),

  // Vehicle types enumeration table
  vehicle_types: defineTable({
    code: v.string(), // "car", "truck", "maxi-cab", "van", etc.
    name: v.string(), // Display name
    description: v.optional(v.string()),
    category: v.optional(v.string()), // Category grouping (e.g., "commercial", "personal")
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"])
    .index("by_category", ["category"]),

  // Payment methods enumeration table
  payment_methods: defineTable({
    code: v.string(), // "manual", "bulk", "external"
    name: v.string(), // Display name
    description: v.optional(v.string()),
    requiresScreenshot: v.optional(v.boolean()), // Whether this method requires screenshot
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // Account types enumeration table
  account_types: defineTable({
    code: v.string(), // "savings", "current"
    name: v.string(), // Display name
    description: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // Company types enumeration table
  company_types: defineTable({
    code: v.string(), // "Private Limited", "Public Limited", "LLP", etc.
    name: v.string(), // Display name
    description: v.optional(v.string()),
    requiresCIN: v.optional(v.boolean()), // Whether this type requires CIN
    requiresGST: v.optional(v.boolean()), // Whether this type requires GST
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // Priority levels enumeration table
  priority_levels: defineTable({
    code: v.string(), // "low", "medium", "high", "urgent"
    name: v.string(), // Display name
    description: v.optional(v.string()),
    color: v.optional(v.string()), // Hex color for UI display
    level: v.number(), // Numeric level for sorting (1=low, 4=urgent)
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_level", ["level"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // Approval statuses enumeration table
  approval_statuses: defineTable({
    code: v.string(), // "pending", "approved", "rejected"
    name: v.string(), // Display name
    description: v.optional(v.string()),
    color: v.optional(v.string()), // Hex color for UI display
    isFinal: v.optional(v.boolean()), // Whether this status is final (approved/rejected)
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"])
    .index("by_final", ["isFinal"]),

  // Fuel types enumeration table
  fuel_types: defineTable({
    code: v.string(), // "Diesel", "Petrol", "CNG", "Electric"
    name: v.string(), // Display name
    description: v.optional(v.string()),
    unit: v.optional(v.string()), // "Liters", "kWh", etc.
    isActive: v.optional(v.boolean()),
    sortBy: v.number(),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_code", ["code"])
    .index("by_sort", ["sortBy"])
    .index("by_active_sort", ["isActive", "sortBy"]),

  // Your other tables...

  // App users - separate entity to have customized columns for users
  app_users: defineTable({
    // app_users must reference a base `users` document
    userId: v.id("users"),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    // Additional contact/identity fields requested
    phoneNumber: v.optional(v.string()),
    whatsappNumber: v.optional(v.string()),
    aadhar: v.optional(v.string()),
    pan: v.optional(v.string()),
    bloodGroup: v.optional(v.string()),
    balance: v.optional(v.number()), // Driver balance for payments
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_userId", ["userId"])
    .index("by_email", ["email"]),

  // user_roles - mapping between users and their roles
  userRoles: defineTable({
    userId: v.id("app_users"),
    role: Role,
    roleId: v.optional(v.id("roles")), // Optional reference to roles table
    createdAt: v.optional(v.number()),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_user_id", ["userId"])
    .index("by_role", ["role"])
    .index("by_role_id", ["roleId"]),

  // generic user bank details
  user_bank_details: defineTable({
    userId: v.id("app_users"),
    account_number: v.string(),
    account_holder_name: v.string(),
    account_type: v.optional(v.union(v.literal("savings"), v.literal("current"))),
    accountTypeId: v.optional(v.id("account_types")), // Optional reference to account_types table
    ifsc_code: v.string(),
    branch_name: v.string(),
    branch_address: v.string(),
    branch_city: v.string(),
    branch_pincode: v.string(),
    createdAt: v.optional(v.number()),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_user_id", ["userId"])
    .index("by_account_number", ["account_number"])
    .index("by_ifsc_code", ["ifsc_code"])
    .index("by_account_type_id", ["accountTypeId"]),

  // user KYC docs
  user_docs: defineTable({
    userId: v.id("app_users"),
    kind: UserDocKind,
    kindId: v.optional(v.id("user_document_kinds")), // Optional reference to user_document_kinds table
    fileId: v.id("_storage"),
    expiry: v.optional(v.number()), // for Driver License etc

    // Approval workflow
    approvalStatus: v.optional(
      v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    ), // Default to pending if not specified
    approvalStatusId: v.optional(v.id("approval_statuses")), // Optional reference to approval_statuses table
    approvedBy: v.optional(v.id("app_users")), // Who approved/rejected
    approvedAt: v.optional(v.number()), // When approved/rejected
    approvalNotes: v.optional(v.string()), // Notes from approver

    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_user", ["userId"])
    .index("by_user_kind", ["userId", "kind"])
    .index("by_user_kind_id", ["userId", "kindId"])
    .index("by_expiry", ["expiry"])
    .index("by_approval_status", ["approvalStatus"])
    .index("by_approval_status_id", ["approvalStatusId"])
    .index("by_user_approval", ["userId", "approvalStatus"]),

  // ========== Vehicles ==========
  // Vehicle manufacturers (e.g., Toyota, Ford, Tata, etc.)
  vehicle_manufacturers: defineTable({
    name: v.string(), // e.g., "Toyota", "Ford", "Tata Motors"
    country: v.optional(v.string()), // e.g., "Japan", "USA", "India"
    website: v.optional(v.string()),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_name", ["name"])
    .index("by_country", ["country"]),

  // Vehicle models (e.g., Camry, F-150, Ace, etc.)
  vehicle_models: defineTable({
    manufacturerId: v.id("vehicle_manufacturers"),
    name: v.string(), // e.g., "Camry", "F-150", "Ace"
    type: VehicleType, // car, truck, maxicab, etc.
    typeId: v.optional(v.id("vehicle_types")), // Optional reference to vehicle_types table
    capacity: v.optional(v.number()), // passenger capacity or cargo capacity in kg
    fuelType: v.optional(v.string()), // "Petrol", "Diesel", "Electric", "Hybrid"
    fuelTypeId: v.optional(v.id("fuel_types")), // Optional reference to fuel_types table
    engineSize: v.optional(v.string()), // e.g., "2.0L", "1500cc"
    year: v.optional(v.number()), // model year or year range start
    description: v.optional(v.string()),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_manufacturer", ["manufacturerId"])
    .index("by_type", ["type"])
    .index("by_type_id", ["typeId"])
    .index("by_fuel_type_id", ["fuelTypeId"])
    .index("by_manufacturer_name", ["manufacturerId", "name"])
    .index("by_manufacturer_type", ["manufacturerId", "type"]),

  vehicles: defineTable({
    modelId: v.id("vehicle_models"), // Reference to vehicle model
    // Optional human-friendly name for quick access
    name: v.optional(v.string()),
    plate: v.string(), // License plate number
    vin: v.optional(v.string()), // Vehicle Identification Number
    registrationNumber: v.optional(v.string()), // Alternative to plate for different regions
    color: v.optional(v.string()), // Vehicle color
    year: v.optional(v.number()), // Manufacturing year (can override model year)
    purchaseDate: v.optional(v.number()), // When the vehicle was purchased
    mileage: v.optional(v.number()), // Current odometer reading
    fuelEfficiency: v.optional(v.number()), // km/L or mpg
    insuranceExpiryDate: v.optional(v.number()), // Insurance expiry timestamp
    lastServiceDate: v.optional(v.number()), // Last maintenance date
    nextServiceDue: v.optional(v.number()), // Next service due date
    active: v.boolean(), // Whether vehicle is active in fleet
    notes: v.optional(v.string()), // Additional notes about the vehicle
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_model", ["modelId"])
    .index("by_plate", ["plate"])
    .index("by_vin", ["vin"])
    .index("by_insurance_expiry", ["insuranceExpiryDate"])
    .index("by_service_due", ["nextServiceDue"]),

  // Vehicle documents with expiries
  vehicle_docs: defineTable({
    vehicleId: v.id("vehicles"),
    kind: VehicleDocKind,
    kindId: v.optional(v.id("vehicle_document_kinds")), // Optional reference to vehicle_document_kinds table
    fileId: v.id("_storage"),
    expiry: v.optional(v.number()), // ms epoch

    // Approval workflow
    approvalStatus: v.optional(
      v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    ), // Default to pending if not specified
    approvalStatusId: v.optional(v.id("approval_statuses")), // Optional reference to approval_statuses table
    approvedBy: v.optional(v.id("app_users")), // Who approved/rejected
    approvedAt: v.optional(v.number()), // When approved/rejected
    approvalNotes: v.optional(v.string()), // Notes from approver

    createdBy: v.id("app_users"),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_vehicle", ["vehicleId"])
    .index("by_vehicle_kind", ["vehicleId", "kind"])
    .index("by_vehicle_kind_id", ["vehicleId", "kindId"])
    .index("by_expiry", ["expiry"])
    .index("by_approval_status", ["approvalStatus"])
    .index("by_approval_status_id", ["approvalStatusId"])
    .index("by_vehicle_approval", ["vehicleId", "approvalStatus"]),

  // ========== Companies, Groups & Routes ==========
  // Companies - separate entity to allow multi-tenant usage
  companies: defineTable({
    name: v.string(),
    contactPersonName: v.optional(v.string()),
    contactPersonPhone: v.optional(v.string()),
    contactPersonEmail: v.optional(v.string()),

    // Company address
    addressLine1: v.optional(v.string()),
    addressLine2: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    pincode: v.optional(v.string()),
    country: v.optional(v.string()),

    // Company registration and tax details
    companyRegistrationNumber: v.optional(v.string()),
    gstNumber: v.optional(v.string()),
    panNumber: v.optional(v.string()),
    cinNumber: v.optional(v.string()), // Corporate Identification Number

    // Company details
    companyType: v.optional(
      v.union(
        v.literal("Private Limited"),
        v.literal("Public Limited"),
        v.literal("LLP"),
        v.literal("Partnership"),
        v.literal("Sole Proprietorship"),
        v.literal("Other"),
      ),
    ),
    companyTypeId: v.optional(v.id("company_types")), // Optional reference to company_types table
    incorporationDate: v.optional(v.number()),
    website: v.optional(v.string()),

    // Subsidiary relationship
    parentCompanyId: v.optional(v.id("companies")), // Reference to parent company if this is a subsidiary

    createdBy: v.optional(v.id("app_users")),
    createdAt: v.number(),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
  })
    .index("by_name", ["name"])
    .index("by_parent_company", ["parentCompanyId"])
    .index("by_company_type_id", ["companyTypeId"])
    .index("by_gst_number", ["gstNumber"])
    .index("by_pan_number", ["panNumber"])
    .index("by_registration_number", ["companyRegistrationNumber"]),

  // Route types for categorizing different kinds of routes
  route_types: defineTable({
    name: v.string(), // e.g., "Local/Zonal", "Regional", "Line haul"
    description: v.optional(v.string()), // Optional description of the route type
    companyId: v.optional(v.id("companies")), // Optional company-specific route types
    isDefault: v.optional(v.boolean()), // Whether this is a system default route type
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_name", ["name"])
    .index("by_company", ["companyId"])
    .index("by_company_name", ["companyId", "name"])
    .index("by_default", ["isDefault"]),

  routes: defineTable({
    companyId: v.optional(v.id("companies")),
    name: v.string(),
    routeTypeId: v.optional(v.id("route_types")), // Reference to route type
    baseAmount: v.optional(v.number()), // fixed amount added to virtual amount

    // Route details
    startLocation: v.optional(v.string()), // Starting point GPS coordinates
    endLocation: v.optional(v.string()), // Ending point GPS coordinates
    distance: v.optional(v.number()), // Distance in kilometers
    estimatedDuration: v.optional(v.number()), // Estimated duration in minutes

    // Start address details
    startAddress: v.optional(v.string()),
    startPincode: v.optional(v.string()),
    startState: v.optional(v.string()),

    // End address details
    endAddress: v.optional(v.string()),
    endPincode: v.optional(v.string()),
    endState: v.optional(v.string()),

    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_company", ["companyId"])
    .index("by_company_name", ["companyId", "name"])
    .index("by_route_type", ["routeTypeId"])
    .index("by_company_route_type", ["companyId", "routeTypeId"]),

  // ========== Trips ==========
  // First iteration trip table (experimental - subject to change)
  trip_v1: defineTable({
    date: v.number(), // ms epoch date/time of trip
    companyId: (v.id("companies")),
    routeId: (v.id("routes")),
    touchPoint: v.optional(v.string()), // free text for touch point / location notes
    // Type: reference to trip_types table
    typeId: (v.id("trip_types")),
    // Route Type: reference to route_types table
    routeTypeId: (v.id("route_types")),
    vehicleId: (v.id("vehicles")),
    driverId: (v.id("app_users")),
    tripId: v.optional(v.string()), // Trip ID / reference
    tripSheet: v.optional(v.boolean()), // checkbox flag
    cost: v.optional(v.number()), // allow decimal values

    // Audit columns
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_company", ["companyId"])
    .index("by_driver", ["driverId"])
    .index("by_vehicle", ["vehicleId"])
    .index("by_date", ["date"])
    .index("by_route_type_id", ["routeTypeId"])
    .index("by_type_id", ["typeId"]),

  trips: defineTable({
    driverId: v.id("app_users"),
    vehicleId: v.optional(v.id("vehicles")),
    companyId: v.optional(v.id("companies")),
    routeId: v.optional(v.id("routes")),

    status: TripStatus,
    statusId: v.optional(v.id("trip_statuses")), // Optional reference to trip_statuses table

    // Location data
    startLocation: v.optional(v.string()), // Human readable address
    endLocation: v.optional(v.string()), // Human readable address
    startLatitude: v.optional(v.number()),
    startLongitude: v.optional(v.number()),
    endLatitude: v.optional(v.number()),
    endLongitude: v.optional(v.number()),

    startKm: v.optional(v.number()),
    endKm: v.optional(v.number()),

    // File storage IDs for gate passes
    startGatePassId: v.optional(v.id("_storage")),
    endGatePassId: v.optional(v.id("_storage")),
    startTimestamp: v.optional(v.number()),
    endTimestamp: v.optional(v.number()),

    // Cost and payment details
    estimatedCost: v.optional(v.number()), // Driver's estimated cost for the trip
    actualCost: v.optional(v.number()), // Final cost of the trip
    advanceAmount: v.optional(v.number()), // Advance payment requested/given
    advanceRequested: v.optional(v.boolean()), // Whether advance was requested
    advanceApproved: v.optional(v.boolean()), // Whether advance was approved
    advanceApprovedBy: v.optional(v.id("app_users")),
    advanceApprovedAt: v.optional(v.number()),

    // Cost breakdown
    fuelCost: v.optional(v.number()),
    tollCost: v.optional(v.number()),
    driverAllowance: v.optional(v.number()),
    maintenanceCost: v.optional(v.number()),
    otherExpenses: v.optional(v.number()),
    expenseNotes: v.optional(v.string()),

    // Fuel/mileage
    fuelLiters: v.optional(v.number()),
    fuelBillId: v.optional(v.id("_storage")),
    fuelType: v.optional(v.union(v.literal("Diesel"), v.literal("Petrol"), v.literal("CNG"))), // e.g., Diesel, Petrol, CNG
    fuelTypeId: v.optional(v.id("fuel_types")), // Optional reference to fuel_types table
    mileage: v.optional(v.number()), // km/L (derived but cached)

    // Earnings
    ratePerKm: v.optional(v.number()), // Rate per kilometer for this trip
    virtualAmount: v.optional(v.number()), // computed endKm-startKm * rate + route.baseAmount
    approved: v.boolean(),
    approvedBy: v.optional(v.id("app_users")),
    approvedAt: v.optional(v.number()),

    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
  })
    .index("by_company", ["companyId"])
    .index("by_driver", ["driverId"])
    .index("by_vehicle", ["vehicleId"])
    .index("by_route", ["routeId"])
    .index("by_status", ["status"])
    .index("by_status_id", ["statusId"])
    .index("by_fuel_type_id", ["fuelTypeId"])
    .index("by_approval", ["approved"])
    .index("by_createdAt", ["createdAt"]),

  // ========== Trip Pass Photos ==========
  trip_pass_photos: defineTable({
    tripId: v.id("trips"),
    photoType: TripFileDocuments, // start or end pass photo
    photoTypeId: v.optional(v.id("trip_file_document_types")), // Optional reference to trip_file_document_types table
    fileId: v.id("_storage"), // File storage ID
    createdBy: v.id("app_users"), // User who created the photo record
    createdAt: v.number(), // Timestamp of creation
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_trip", ["tripId"])
    .index("by_trip_photoType", ["tripId", "photoType"])
    .index("by_trip_photoType_id", ["tripId", "photoTypeId"]),

  // High-frequency GPS stream (separate table for scalable writes)
  gps_pings: defineTable({
    tripId: v.id("trips"),
    driverId: v.id("app_users"),
    lat: v.number(),
    lng: v.number(),
    t: v.number(), // ms epoch (server time preferred)
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_trip_time", ["tripId", "t"])
    .index("by_driver_time", ["driverId", "t"]),

  // Diesel uploads can also be split out if you expect multiple entries per trip
  diesel_logs: defineTable({
    tripId: v.id("trips"),
    liters: v.number(),
    billId: v.id("_storage"),
    odometerAtFill: v.optional(v.number()),
    loggedAt: v.number(),
    loggedBy: v.id("app_users"),
    createdBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  }).index("by_trip_time", ["tripId", "loggedAt"]),

  // ========== Finance ==========
  // payments: store amounts in smallest currency unit (e.g., cents) to avoid floating point errors
  payments: defineTable({
    userId: v.id("app_users"), // driver who receives money (or debit)
    // Canonical amount stored as integer in smallest currency unit. Keep `amount` as legacy field during migration.
    amountCents: v.optional(v.number()),
    currency: v.optional(v.string()),
    amount: v.optional(v.number()), // legacy float amount
    screenshotId: v.optional(v.id("_storage")),
    method: PaymentMethod,
    methodId: v.optional(v.id("payment_methods")), // Optional reference to payment_methods table
    note: v.optional(v.string()),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    byUserId: v.id("app_users"), // admin/super who made it
    byRole: Role,
    byRoleId: v.optional(v.id("roles")), // Optional reference to roles table
    // Optional linkage to a trip (if this was a per-trip payout)
    tripId: v.optional(v.id("trips")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_user", ["userId"])
    .index("by_method_id", ["methodId"])
    .index("by_role_id", ["byRoleId"])
    .index("by_createdAt", ["createdAt"]),

  // Trip events to track status transitions, approvals and notes for timeline
  trip_events: defineTable({
    tripId: v.id("trips"),
    eventType: v.string(), // e.g., "status_change", "approval", "note"
    fromStatus: v.optional(TripStatus),
    toStatus: v.optional(TripStatus),
    at: v.number(),
    byUserId: v.optional(v.id("app_users")),
    meta: v.optional(v.any()),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  }).index("by_trip_at", ["tripId", "at"]),

  // ========== Ops & automation ==========
  reminders: defineTable({
    // Expiry reminders etc.
    kind: v.union(v.literal("vehicleDocExpiry"), v.literal("userDocExpiry"), v.literal("custom")),
    companyId: v.optional(v.id("companies")),
    targetTable: v.union(
      v.literal("vehicle_docs"),
      v.literal("user_docs"),
      v.literal("trips"),
      v.literal("vehicles"),
      v.literal("app_users"),
    ),
    targetId: v.id("any"), // Corrected from v.idAny() to v.id("any")
    dueAt: v.number(),
    createdForUserId: v.optional(v.id("app_users")), // who to notify
    sentAt: v.optional(v.number()),
    createdAt: v.number(),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_dueAt", ["dueAt"])
    .index("by_company", ["companyId"])
    .index("by_target", ["targetTable", "targetId"]),

  // Files metadata for quick lookups and search (references Convex _storage ids)
  // Trip exports (XLSX/CSV) - stores the filters used to generate an export, the storage id
  // where the generated file is stored, and sharing information so other users can
  // download the exported file.
  trip_exports: defineTable({
    companyId: v.optional(v.id("companies")),
    driverId: v.optional(v.id("app_users")),
    routeId: v.optional(v.id("routes")),
    routeTypeId: v.optional(v.id("route_types")),
    typeId: v.optional(v.id("trip_types")),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),

    // File metadata
    name: v.optional(v.string()), // friendly name for the export
    filename: v.optional(v.string()), // original filename
    storageId: v.id("_storage"), // reference to Convex _storage
    contentType: v.optional(v.string()),
    size: v.optional(v.number()),

    // Sharing: allow owner to share the export with other app users
    sharedWith: v.optional(v.array(v.id("app_users"))),
    notes: v.optional(v.string()),

    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_company", ["companyId"])
    .index("by_createdBy", ["createdBy"])
    .index("by_storageId", ["storageId"]),

  files: defineTable({
    storageId: v.id("_storage"),
    filename: v.optional(v.string()),
    contentType: v.optional(v.string()),
    size: v.optional(v.number()),
    createdBy: v.optional(v.id("app_users")),
    createdAt: v.number(),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  }).index("by_storageId", ["storageId"]),

  // Audit operation types (e.g., download_user_file, download_vehicle_file)
  audit_operations: defineTable({
    code: v.string(), // short code like "download_user_file"
    name: v.string(), // human friendly name
    description: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    updatedAt: v.optional(v.number()),
    updatedBy: v.optional(v.id("app_users")),
  }).index("by_code", ["code"]),

  // Audit logs for recording operations like downloads
  audit_logs: defineTable({
    operationCode: v.string(), // e.g., "download_user_file"
    operationId: v.optional(v.id("audit_operations")), // optional ref to operation type
    performedBy: v.id("app_users"), // who performed the operation
    performedAt: v.number(), // timestamp

    // Target entity information (optional)
    targetTable: v.optional(v.string()), // e.g., "user_docs" or "vehicle_docs"
    targetRecordIds: v.optional(v.array(v.any())), // referenced record ids (allow arbitrary ids)

    // Files involved in the operation
    fileStorageIds: v.optional(v.array(v.id("_storage"))), // storage ids
    fileDetails: v.optional(v.any()), // optional JSON with filename/contentType/etc

    // Additional metadata
    ip: v.optional(v.string()),
    notes: v.optional(v.string()),

    createdAt: v.number(),
    createdBy: v.optional(v.id("app_users")),
    isActive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    deletedBy: v.optional(v.id("app_users")),
  })
    .index("by_performedBy", ["performedBy"])
    .index("by_performedAt", ["performedAt"]),
});

export default schema;
