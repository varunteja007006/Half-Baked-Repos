"use client";

import React from "react";
import { toast } from "sonner";

import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";

import { authClient } from "~/auth/client";

export function OtpForm() {
  const [code, setCode] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const { data } = authClient.useSession();

  if (data?.user) {
    return (
      <div className="space-y-4 p-4 text-left">
        <p className="text-2xl">Welcome, </p>
        <p className="text-lg">{data.user.name}</p>
      </div>
    );
  }

  return (
    <div className="my-4 space-y-4">
      <Input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value ?? "")}
        placeholder="Phone number"
      />
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value ?? "")}
        placeholder="Verification Code"
      />
      <div className="flex items-center gap-5">
        <Button
          type="button"
          onClick={() => {
            authClient.phoneNumber
              .sendOtp({
                phoneNumber,
              })
              .then((res) => {
                const { data, error } = res;
                if (error) {
                  toast.error(error.message);
                  return;
                }
                toast.success(data.message);
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        >
          TRIGGER
        </Button>
        <Button
          type="button"
          onClick={() => {
            authClient.phoneNumber
              .verify({
                phoneNumber,
                code,
              })
              .then((res) => {
                const { data, error } = res;
                if (error) {
                  toast.error(error.message);
                  return;
                }
                toast.success(data.status);
                console.log(data.token, data.user);
              })
              .catch((err) => {
                console.error(err);
                toast.error(err);
              });
          }}
        >
          VERIFY
        </Button>
      </div>
    </div>
  );
}
