# Enum Migration Guide

This document outlines the migration strategy from hardcoded v.union enums to metadata tables in the Convex schema.

## Overview

We've transformed hardcoded enums into metadata tables to provide better maintainability, audit trails, and dynamic configuration capabilities. This migration maintains backward compatibility while allowing gradual transition.

## Migration Strategy

### Phase 1: Schema Update (✅ Completed)
- Added new enum metadata tables
- Added optional ID references to existing tables
- Maintained original enum fields for backward compatibility

### Phase 2: Seed Initial Data
- Populate enum tables with initial values
- Ensure proper sort orders and metadata

### Phase 3: Application Code Updates
- Update Convex functions to support both old and new fields
- Modify frontend components to use metadata tables
- Implement migration utilities

### Phase 4: Data Migration
- Migrate existing data to use new ID references
- Validate data consistency

### Phase 5: Cleanup (Future)
- Remove original enum fields once migration is complete
- Update schema to make ID references required

## Enum Tables Created

### 1. `roles`
**Purpose**: User role management
**Fields**: 
- `code`: "driver", "admin", "super"
- `name`: Display name
- `permissions`: Array of permission strings
- `sortBy`: Display order

**Migration Impact**: 
- `userRoles.roleId` references this table
- `payments.byRoleId` references this table

### 2. `trip_statuses`
**Purpose**: Trip lifecycle status management
**Fields**:
- `code`: "Placed", "In-Progress", "In-Transit", "Destination", "Completed", "Closed"
- `name`: Display name
- `color`: UI color code
- `sortBy`: Display order

**Migration Impact**:
- `trips.statusId` references this table

### 3. `trip_file_document_types`
**Purpose**: Trip document type management
**Fields**:
- `code`: "StartGatePass", "EndGatePass"
- `name`: Display name
- `sortBy`: Display order

**Migration Impact**:
- `trip_pass_photos.photoTypeId` references this table

### 4. `user_document_kinds`
**Purpose**: User document type management
**Fields**:
- `code`: "Aadhaar", "PAN", "Driver License", "BankPassbook"
- `name`: Display name
- `hasExpiry`: Whether document expires
- `isRequired`: Whether document is mandatory
- `validationRegex`: Validation pattern
- `sortBy`: Display order

**Migration Impact**:
- `user_docs.kindId` references this table

### 5. `vehicle_document_kinds`
**Purpose**: Vehicle document type management
**Fields**:
- `code`: "VehicleRC", "Insurance", "Permit", "Fitness", "PollutionCertificate", "TaxDocument", "GoodsPermit", "NationalPermit"
- `name`: Display name
- `hasExpiry`: Whether document expires
- `isRequired`: Whether document is mandatory
- `validationRegex`: Validation pattern
- `sortBy`: Display order

**Migration Impact**:
- `vehicle_docs.kindId` references this table

### 6. `vehicle_types`
**Purpose**: Vehicle category management
**Fields**:
- `code`: "car", "truck", "maxi-cab", "van", "bus", "motorcycle", "pickup", "suv"
- `name`: Display name
- `category`: Grouping (commercial, personal)
- `sortBy`: Display order

**Migration Impact**:
- `vehicle_models.typeId` references this table

### 7. `payment_methods`
**Purpose**: Payment method management
**Fields**:
- `code`: "manual", "bulk", "external"
- `name`: Display name
- `requiresScreenshot`: Whether screenshot is required
- `sortBy`: Display order

**Migration Impact**:
- `payments.methodId` references this table

### 8. `account_types`
**Purpose**: Bank account type management
**Fields**:
- `code`: "savings", "current"
- `name`: Display name
- `sortBy`: Display order

**Migration Impact**:
- `user_bank_details.accountTypeId` references this table

### 9. `company_types`
**Purpose**: Company registration type management
**Fields**:
- `code`: "Private Limited", "Public Limited", "LLP", "Partnership", "Sole Proprietorship", "Other"
- `name`: Display name
- `requiresCIN`: Whether CIN is required
- `requiresGST`: Whether GST is required
- `sortBy`: Display order

**Migration Impact**:
- `companies.companyTypeId` references this table

### 10. `priority_levels`
**Purpose**: Priority level management for notes
**Fields**:
- `code`: "low", "medium", "high", "urgent"
- `name`: Display name
- `color`: UI color code
- `level`: Numeric level for sorting
- `sortBy`: Display order

**Migration Impact**:
- `notes.priorityId` references this table

### 11. `approval_statuses`
**Purpose**: Approval workflow status management
**Fields**:
- `code`: "pending", "approved", "rejected"
- `name`: Display name
- `color`: UI color code
- `isFinal`: Whether status is final
- `sortBy`: Display order

**Migration Impact**:
- `user_docs.approvalStatusId` references this table
- `vehicle_docs.approvalStatusId` references this table
- `notes.approvalStatusId` references this table

### 12. `fuel_types`
**Purpose**: Fuel type management
**Fields**:
- `code`: "Diesel", "Petrol", "CNG", "Electric"
- `name`: Display name
- `unit`: Measurement unit
- `sortBy`: Display order

**Migration Impact**:
- `vehicle_models.fuelTypeId` references this table
- `trips.fuelTypeId` references this table

## Phase 2: Seed Data Script

Create `convex/seedEnums.ts`:

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedAllEnums = mutation({
  args: {},
  handler: async (ctx) => {
    // Seed roles
    await seedRoles(ctx);
    
    // Seed trip statuses
    await seedTripStatuses(ctx);
    
    // Seed other enums...
    // Add all enum seeding functions
    
    return "All enums seeded successfully";
  },
});

async function seedRoles(ctx: any) {
  const roles = [
    { code: "driver", name: "Driver", description: "Vehicle driver", permissions: ["view_trips", "update_trip_status"], sortBy: 1 },
    { code: "admin", name: "Administrator", description: "System administrator", permissions: ["manage_users", "manage_vehicles", "approve_documents"], sortBy: 2 },
    { code: "super", name: "Super User", description: "System super user", permissions: ["*"], sortBy: 3 }
  ];

  for (const role of roles) {
    await ctx.db.insert("roles", {
      ...role,
      isActive: true,
      createdAt: Date.now()
    });
  }
}

async function seedTripStatuses(ctx: any) {
  const statuses = [
    { code: "Placed", name: "Placed", description: "Trip order placed", color: "#6B7280", sortBy: 1 },
    { code: "In-Progress", name: "In Progress", description: "Trip started", color: "#3B82F6", sortBy: 2 },
    { code: "In-Transit", name: "In Transit", description: "Vehicle in transit", color: "#F59E0B", sortBy: 3 },
    { code: "Destination", name: "At Destination", description: "Reached destination", color: "#8B5CF6", sortBy: 4 },
    { code: "Completed", name: "Completed", description: "Trip ended", color: "#10B981", sortBy: 5 },
    { code: "Closed", name: "Closed", description: "Approved and payment processed", color: "#059669", sortBy: 6 }
  ];

  for (const status of statuses) {
    await ctx.db.insert("trip_statuses", {
      ...status,
      isActive: true,
      createdAt: Date.now()
    });
  }
}

// Add similar functions for other enums...
```

## Phase 3: Migration Utilities

Create `convex/migrationUtils.ts`:

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Helper to get enum ID by code
export const getEnumIdByCode = query({
  args: {
    table: v.string(),
    code: v.string()
  },
  handler: async (ctx, { table, code }) => {
    const result = await ctx.db
      .query(table as any)
      .withIndex("by_code", (q) => q.eq("code", code))
      .first();
    return result?._id;
  },
});

// Migrate specific record
export const migrateRecord = mutation({
  args: {
    table: v.string(),
    recordId: v.id("any"),
    enumField: v.string(),
    enumIdField: v.string(),
    enumTable: v.string()
  },
  handler: async (ctx, { table, recordId, enumField, enumIdField, enumTable }) => {
    // Get the record
    const record = await ctx.db.get(recordId);
    if (!record) return false;

    // Get the enum value
    const enumValue = record[enumField];
    if (!enumValue) return false;

    // Find corresponding enum ID
    const enumRecord = await ctx.db
      .query(enumTable as any)
      .withIndex("by_code", (q) => q.eq("code", enumValue))
      .first();
    
    if (!enumRecord) return false;

    // Update the record with the enum ID
    await ctx.db.patch(recordId, {
      [enumIdField]: enumRecord._id,
      updatedAt: Date.now()
    });

    return true;
  },
});

// Batch migration for a table
export const migrateTable = mutation({
  args: {
    table: v.string(),
    enumField: v.string(),
    enumIdField: v.string(),
    enumTable: v.string(),
    batchSize: v.optional(v.number())
  },
  handler: async (ctx, { table, enumField, enumIdField, enumTable, batchSize = 100 }) => {
    const records = await ctx.db.query(table as any).take(batchSize);
    let migrated = 0;

    for (const record of records) {
      if (record[enumIdField]) continue; // Already migrated

      const enumValue = record[enumField];
      if (!enumValue) continue;

      const enumRecord = await ctx.db
        .query(enumTable as any)
        .withIndex("by_code", (q) => q.eq("code", enumValue))
        .first();
      
      if (enumRecord) {
        await ctx.db.patch(record._id, {
          [enumIdField]: enumRecord._id,
          updatedAt: Date.now()
        });
        migrated++;
      }
    }

    return { migrated, total: records.length };
  },
});
```

## Phase 4: Data Migration Scripts

Create migration scripts in `convex/migrations/`:

### `convex/migrations/001_migrate_user_roles.ts`
```typescript
import { mutation } from "../_generated/server";

export const migrateUserRoles = mutation({
  args: {},
  handler: async (ctx) => {
    const userRoles = await ctx.db.query("userRoles").collect();
    let migrated = 0;

    for (const userRole of userRoles) {
      if (userRole.roleId) continue; // Already migrated

      const role = await ctx.db
        .query("roles")
        .withIndex("by_code", (q) => q.eq("code", userRole.role))
        .first();

      if (role) {
        await ctx.db.patch(userRole._id, {
          roleId: role._id,
          updatedAt: Date.now()
        });
        migrated++;
      }
    }

    return { migrated, total: userRoles.length };
  },
});
```

### `convex/migrations/002_migrate_trips.ts`
```typescript
import { mutation } from "../_generated/server";

export const migrateTrips = mutation({
  args: {},
  handler: async (ctx) => {
    const trips = await ctx.db.query("trips").collect();
    let migrated = 0;

    for (const trip of trips) {
      const updates: any = { updatedAt: Date.now() };

      // Migrate status
      if (!trip.statusId && trip.status) {
        const status = await ctx.db
          .query("trip_statuses")
          .withIndex("by_code", (q) => q.eq("code", trip.status))
          .first();
        if (status) updates.statusId = status._id;
      }

      // Migrate fuel type
      if (!trip.fuelTypeId && trip.fuelType) {
        const fuelType = await ctx.db
          .query("fuel_types")
          .withIndex("by_code", (q) => q.eq("code", trip.fuelType))
          .first();
        if (fuelType) updates.fuelTypeId = fuelType._id;
      }

      if (Object.keys(updates).length > 1) { // More than just updatedAt
        await ctx.db.patch(trip._id, updates);
        migrated++;
      }
    }

    return { migrated, total: trips.length };
  },
});
```

## Frontend Updates

### Updated Dropdown Components

```typescript
// Example: StatusDropdown.tsx
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function StatusDropdown({ value, onChange }: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const statuses = useQuery(api.tripStatuses.list);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Status</option>
      {statuses?.map((status) => (
        <option key={status._id} value={status.code}>
          {status.name}
        </option>
      ))}
    </select>
  );
}
```

### Query Functions

Create `convex/tripStatuses.ts`:
```typescript
import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("trip_statuses")
      .withIndex("by_active_sort", (q) => q.eq("isActive", true))
      .collect();
  },
});

export const getByCode = query({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    return await ctx.db
      .query("trip_statuses")
      .withIndex("by_code", (q) => q.eq("code", code))
      .first();
  },
});
```

## Migration Checklist

### ✅ Phase 1: Schema Update
- [x] Create enum metadata tables
- [x] Add optional ID references to existing tables
- [x] Maintain backward compatibility

### 🔄 Phase 2: Seed Data
- [ ] Create seed data scripts
- [ ] Run initial data population
- [ ] Verify data integrity

### 🔄 Phase 3: Application Updates
- [ ] Update Convex query functions
- [ ] Update frontend components
- [ ] Create migration utilities
- [ ] Test both old and new code paths

### 🔄 Phase 4: Data Migration
- [ ] Create migration scripts for each table
- [ ] Run data migration in batches
- [ ] Validate migrated data
- [ ] Update applications to use new fields

### 🔄 Phase 5: Cleanup (Future)
- [ ] Remove original enum fields
- [ ] Make ID references required
- [ ] Update all remaining code
- [ ] Remove backward compatibility code

## Best Practices

1. **Gradual Migration**: Migrate one table at a time
2. **Data Validation**: Always validate data consistency after migration
3. **Rollback Plan**: Keep original fields until migration is fully validated
4. **Testing**: Test thoroughly in development before production migration
5. **Monitoring**: Monitor application performance during migration
6. **Documentation**: Keep this guide updated with migration progress

## Troubleshooting

### Common Issues
1. **Missing Enum Records**: Ensure all enum tables are properly seeded
2. **Data Inconsistency**: Validate that all enum codes have corresponding records
3. **Index Errors**: Ensure new indexes are properly created
4. **Performance**: Monitor query performance with new indexes

### Validation Queries
```typescript
// Check for unmigrated records
export const validateMigration = query({
  args: { table: v.string(), enumField: v.string(), enumIdField: v.string() },
  handler: async (ctx, { table, enumField, enumIdField }) => {
    const unmigrated = await ctx.db
      .query(table as any)
      .filter((q) => q.and(
        q.neq(q.field(enumField), undefined),
        q.eq(q.field(enumIdField), undefined)
      ))
      .collect();
    
    return { count: unmigrated.length, records: unmigrated };
  },
});
```

---

**Next Steps**: 
1. Run Phase 2 seed scripts
2. Begin frontend component updates
3. Test migration utilities
4. Plan production migration timeline