"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { LuX, LuPencil, LuCheck } from "react-icons/lu";

const EditCell = ({ row, table }: { row: any; table: any }) => {
  const meta = table.options.meta;
  const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  return meta?.editedRows[row.id] ? (
    <>
      <Button
        variant="destructive"
        onClick={setEditedRows}
        name="cancel"
        size={"icon"}
      >
        <LuX className="w-4 h-4" />
      </Button>{" "}
      <Button
        variant="success"
        onClick={setEditedRows}
        name="done"
        size={"icon"}
      >
        <LuCheck className="w-4 h-4" />
      </Button>
    </>
  ) : (
    <>
      <Button
        variant={"outline"}
        onClick={setEditedRows}
        name="edit"
        size={"icon"}
      >
        <LuPencil className="w-4 h-4" />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="ml-2 cursor-default hover:bg-transparent"
      >
        <span className="size-4"></span>
      </Button>
    </>
  );
};

export default EditCell;
