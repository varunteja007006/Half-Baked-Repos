import type { MutationCtx } from "./_generated/server";

/**
 * Helpers for creating and mutating records with audit metadata.
 * Use these in Convex mutations to keep createdAt/createdBy/updatedAt/updatedBy
 * and soft-delete fields consistent.
 */

export function nowMs() {
  return Date.now();
}

export async function createRecord(ctx: MutationCtx, table: any, doc: any) {
  const ts = nowMs();
  const base = {
    ...doc,
    createdAt: ts,
    createdBy: doc.createdBy ?? null,
    isActive: doc.isActive ?? true,
  };
  // use any to avoid TableNames generic restrictions in helper
  return await (ctx.db as any).insert(table, base);
}

export async function patchRecord(ctx: MutationCtx, id: any, patch: any, byUserId?: any) {
  const ts = nowMs();
  const fullPatch = {
    ...patch,
    updatedAt: ts,
    updatedBy: byUserId ?? patch.updatedBy ?? null,
  };
  return await ctx.db.patch(id, fullPatch);
}

export async function softDelete(ctx: MutationCtx, id: any, byUserId?: any) {
  const ts = nowMs();
  return await ctx.db.patch(id, {
    isActive: false,
    deletedAt: ts,
  deletedBy: byUserId ?? (null as any),
    updatedAt: ts,
  updatedBy: byUserId ?? (null as any),
  });
}

export async function restore(ctx: MutationCtx, id: any, byUserId?: any) {
  const ts = nowMs();
  return await ctx.db.patch(id, {
    isActive: true,
  deletedAt: null as any,
  deletedBy: null as any,
  updatedAt: ts,
  updatedBy: byUserId ?? (null as any),
  });
}
