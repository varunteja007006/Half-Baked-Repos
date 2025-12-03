"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/components/atom/data-table/data-table";
import { columns, TripV1Row } from "./columns";
import {
  CompaniesFilter,
  RoutesFilter,
  DriversFilter,
} from "@/components/common/data-table-filters";
import { Id } from "@/convex/_generated/dataModel";
import { Funnel } from "lucide-react";
import { fileLocalDownload } from "@/lib/utils";
import { toast } from "sonner";

export type TripFilters = {
  companyId?: Id<"companies">;
  routeId?: Id<"routes">;
  driverId?: Id<"app_users">;
  date?: number;
};

export default function TripV1Table() {
  const [filters, setFilters] = React.useState<TripFilters>({});

  const trips = useQuery(api.trip_v1.listTripV1, {
    companyId: filters.companyId,
    routeId: filters.routeId,
    driverId: filters.driverId,
    date: filters.date,
  });

  const data = React.useMemo<TripV1Row[]>(
    () =>
      trips?.map((t) => ({
        id: t._id,
        date: t.date,
        companyId: t.companyId,
        companyName: t.companyName,
        routeId: t.routeId,
        routeName: t.routeName,
        tripId: t.tripId,
        typeId: t.typeId,
        routeTypeId: t.routeTypeId,
        vehicleId: t.vehicleId,
        driverId: t.driverId,
        driverName: t.driverName,
        vehicleName: t.vehicleName,
        cost: t.cost,
        createdAt: t.createdAt,
        isActive: t.isActive,
      })) ?? [],
    [trips],
  );

  return (
    <DataTable
      filterComponent={
        <div className="flex items-start gap-1">
          <FilterComponent filters={filters} setFilters={setFilters} />
          <ExportButton filters={filters} />
        </div>
      }
      columns={columns}
      data={data}
    />
  );
}

const FilterComponent = ({
  filters,
  setFilters,
}: {
  filters: TripFilters;
  setFilters: (filters: TripFilters) => void;
}) => {
  const [open, setOpen] = React.useState(false);

  const [companyFilterId, setCompanyFilterId] = React.useState<Id<"companies"> | undefined>(
    filters.companyId,
  );

  const [routeFilterId, setRouteFilterId] = React.useState<Id<"routes"> | undefined>(
    filters.routeId,
  );

  const [driverFilterId, setDriverFilterId] = React.useState<Id<"app_users"> | undefined>(
    filters.driverId,
  );

  const [dateFilter, setDateFilter] = React.useState<number | undefined>(filters.date);

  const handleApplyFilters = () => {
    setOpen(false);
    setFilters({
      companyId: companyFilterId,
      routeId: routeFilterId,
      driverId: driverFilterId,
      date: dateFilter,
    });
  };

  const handleOnClose = (flag: boolean) => {
    setOpen(flag);
    setCompanyFilterId(filters.companyId);
    setRouteFilterId(filters.routeId);
    setDriverFilterId(filters.driverId);
    setDateFilter(filters.date);
  };

  const handleClearFilters = () => {
    setCompanyFilterId(undefined);
    setRouteFilterId(undefined);
    setDriverFilterId(undefined);
    setDateFilter(undefined);
    setFilters({});
  };

  return (
    <Dialog open={open} onOpenChange={handleOnClose}>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Funnel /> Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply Filters</DialogTitle>
          <DialogDescription>
            Use the filters below to narrow down your search results.
          </DialogDescription>
        </DialogHeader>

        <CompaniesFilter
          value={companyFilterId}
          onSelect={(value) => setCompanyFilterId(value as Id<"companies">)}
        />

        <RoutesFilter
          value={routeFilterId}
          onSelect={(value: string) => setRouteFilterId(value as Id<"routes">)}
        />

        <DriversFilter
          value={driverFilterId}
          onSelect={(value: string) => setDriverFilterId(value as Id<"app_users">)}
        />

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateFilter && "text-muted-foreground",
                )}
              >
                {dateFilter ? format(new Date(dateFilter), "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter ? new Date(dateFilter) : undefined}
                onSelect={(selectedDate) => {
                  setDateFilter(selectedDate ? selectedDate.getTime() : undefined);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <DialogFooter className="flex w-full items-center justify-between gap-2">
          <Button type="button" variant="default" onClick={handleApplyFilters}>
            Apply
          </Button>
          <Button type="button" variant="outline" onClick={handleClearFilters}>
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ExportButton = ({ filters }: { filters: TripFilters }) => {
  const generateExport = useAction(api.node_trip_v1_export.generateTripV1XlsxExport);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleExport = async () => {
    setIsLoading(true);

    const exportFilename = `trips_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
    const exportArgs = {
      ...filters,
      filename: exportFilename,
    };

    try {
      const result = await generateExport(exportArgs);
      const data = result?.data;
      if (!result?.success || !data?.url) {
        toast.error(result?.message ? ` ${result.message}` : "Export failed. Please try again.");
        return;
      }

      const downloadUrl = data.url;

      await fileLocalDownload(downloadUrl, exportFilename, "Trip Export");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      disabled={isLoading}
      className="ml-2"
    >
      {isLoading ? "Exporting..." : "Export"}
    </Button>
  );
};
