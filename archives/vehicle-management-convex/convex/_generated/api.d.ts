/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as appUser from "../appUser.js";
import type * as audit from "../audit.js";
import type * as auditAdmin from "../auditAdmin.js";
import type * as auth from "../auth.js";
import type * as bank from "../bank.js";
import type * as company from "../company.js";
import type * as documentApproval from "../documentApproval.js";
import type * as documentList from "../documentList.js";
import type * as documentUpload from "../documentUpload.js";
import type * as download from "../download.js";
import type * as gps from "../gps.js";
import type * as http from "../http.js";
import type * as node_trip_v1_export from "../node_trip_v1_export.js";
import type * as route from "../route.js";
import type * as routeType from "../routeType.js";
import type * as tripType from "../tripType.js";
import type * as trip_v1 from "../trip_v1.js";
import type * as trip_v1_export from "../trip_v1_export.js";
import type * as utils from "../utils.js";
import type * as vehicle from "../vehicle.js";
import type * as vehicleDocuments from "../vehicleDocuments.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  appUser: typeof appUser;
  audit: typeof audit;
  auditAdmin: typeof auditAdmin;
  auth: typeof auth;
  bank: typeof bank;
  company: typeof company;
  documentApproval: typeof documentApproval;
  documentList: typeof documentList;
  documentUpload: typeof documentUpload;
  download: typeof download;
  gps: typeof gps;
  http: typeof http;
  node_trip_v1_export: typeof node_trip_v1_export;
  route: typeof route;
  routeType: typeof routeType;
  tripType: typeof tripType;
  trip_v1: typeof trip_v1;
  trip_v1_export: typeof trip_v1_export;
  utils: typeof utils;
  vehicle: typeof vehicle;
  vehicleDocuments: typeof vehicleDocuments;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
