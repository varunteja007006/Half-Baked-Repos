"use client";

import React from "react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/features/auth";
import dynamic from "next/dynamic";

import { BankDetailsCard, KycDocuments, ProfileCard } from "@/components/features/user/cards";
import { useRouter } from "next/navigation";

const MapComponent = dynamic(() => import("@/components/features/maps/react-map"), {
  ssr: false,
});

interface Location {
  lat: number;
  lng: number;
}

export default function Profiles() {
  const [location, setLocation] = React.useState<Location | null>(null);

  const router = useRouter();

  const { user: loggedInUser } = useAuth();
  const userDetails = loggedInUser?.appUser;
  const appUserDetails = loggedInUser?.appUser;
  const bankDetails = useQuery(api.bank.listUserBankDetails, { appUserId: undefined });
  const uploadedDocs = useQuery(api.documentList.listUserDocuments, {
    appUserId: undefined,
  });
  return (
    <div className="w-full space-y-6">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Map / Trip control */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border p-4 shadow-sm bg-card">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Trip Control</h3>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            const location: Location = {
                              lat: position.coords.latitude,
                              lng: position.coords.longitude,
                            };
                            setLocation(location);
                          },
                          (error) => {
                            console.error("Error fetching location:", error);
                          },
                        );
                      }
                    }}
                  >
                    Show Current Location
                  </button>
                </div>
              </div>

              <div className="mt-4 h-72 rounded overflow-hidden bg-card flex items-center justify-center">
                {location ? (
                  <MapComponent lat={location.lat} lng={location.lng} />
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Map preview will appear here when location is available.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border p-4 shadow-sm bg-card">
              <h3 className="text-lg font-semibold mb-3">Trip Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <div className="font-medium">Advance</div>
                  <div>$1000</div>
                </div>
                <div>
                  <div className="font-medium">Balance</div>
                  <div>$1000</div>
                </div>
                <div>
                  <div className="font-medium">Assigned Vehicle</div>
                  <div>ABC123</div>
                </div>
                <div>
                  <div className="font-medium">Status</div>
                  <div>Approved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Profile / Bank / KYC */}
          <div className="space-y-6">
            <ProfileCard
              name={appUserDetails?.name ?? userDetails?.name ?? "—"}
              onEditClick={() => {
                router.push("/dashboard/driver/profile/edit");
              }}
            />

            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">Bank Details</h4>
            <BankDetailsCard bankDetails={bankDetails} />

            <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-3">KYC Documents</h4>
            <KycDocuments uploadedDocs={uploadedDocs} />
          </div>
        </div>
      </div>
    </div>
  );
}
