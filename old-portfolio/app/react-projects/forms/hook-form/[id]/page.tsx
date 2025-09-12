import React from "react";
import ReactHookFormArray from "../../_components/react-hook-form-array";

export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  return (
    <div className="space-y-6">
      <h1 className="text-xl">Hook forms</h1>
      <div>
        <ReactHookFormArray id={params?.id} />
      </div>
    </div>
  );
}
