"use client";

import {
  ChevronDown,
  ChevronRight,
  File,
  FilePlus2,
  Folder,
  FolderPlus,
  Minus,
  Plus,
  X,
} from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FileFolder = {
  name: string;
  type: string;
  children?: FileFolder[];
  id: number | string;
};

const baseData: FileFolder[] = [
  {
    name: "Documents",
    type: "folder",
    id: 0,
    children: [
      {
        name: "Work",
        type: "folder",
        id: 1,
        children: [
          {
            name: "ProjectA",
            type: "folder",
            id: 2,
            children: [
              {
                name: "notes.txt",
                type: "file",
                id: 3,
              },
              {
                name: "presentation.pptx",
                type: "file",
                id: 4,
              },
            ],
          },
          {
            name: "ProjectB",
            type: "folder",
            id: 5,
            children: [
              {
                name: "data.csv",
                type: "file",
                id: 6,
              },
            ],
          },
        ],
      },
      {
        name: "Personal",
        type: "folder",
        id: 7,
        children: [
          {
            name: "Vacation",
            type: "folder",
            id: 8,
            children: [
              {
                name: "photos.zip",
                type: "file",
                id: 9,
              },
              {
                name: "itinerary.pdf",
                type: "file",
                id: 10,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Downloads",
    type: "folder",
    id: 11,
    children: [
      {
        name: "Software",
        type: "folder",
        id: 12,
        children: [
          {
            name: "installer.exe",
            type: "file",
            id: 13,
          },
        ],
      },
    ],
  },
  {
    name: "helloworld.c",
    type: "file",
    id: 14,
  },
  {
    name: "samplePython.py",
    type: "file",
    id: 15,
  },
];

export default function FileFolder() {
  const [files, setFiles] = React.useState<FileFolder[]>(baseData);

  const sortFileFolderData = (data: FileFolder[]) => {
    return data
      .map((item: FileFolder) => {
        if (item.children && Array.isArray(item.children)) {
          item.children = sortFileFolderData(item.children);
        }
        return item;
      })
      .sort((a: FileFolder, b: FileFolder) => {
        if (a.children && !b.children) {
          return -1;
        } else if (!a.children && b.children) {
          return 1;
        }
        return 0;
      });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold ">File Folder:</h1>
      {sortFileFolderData(files).map((item, index) => {
        return <RenderFileFolder key={index} {...item} setFiles={setFiles} />;
      })}
    </div>
  );
}

const RenderFileFolder = (
  props: FileFolder & { setFiles: Dispatch<SetStateAction<FileFolder[]>> }
) => {
  const setFiles = props.setFiles;
  const id = props.id;
  const isFolder = Array.isArray(props.children);

  const [isExpanded, setIsExpanded] = React.useState(false);

  const [name, setName] = React.useState("");
  const [createType, setCreateType] = React.useState<"file" | "folder" | "">(
    ""
  );
  const [open, setOpen] = React.useState(false);

  const handleDelete = (list: FileFolder[]): FileFolder[] => {
    return list.filter((item) => {
      if (item.children && Array.isArray(item.children)) {
        // if it's a folder then check its children and return true or false
        if (item.id === id) {
          // if deleting folder itself then return false
          return false;
        }

        item.children = handleDelete(item.children);
        return item;
      } else {
        // if it's a file then check its id and return true or false
        return item.id !== id;
      }
    });
  };

  const deleteFile = () => {
    setFiles((prev) => {
      const newFiles = [...prev];
      return handleDelete(newFiles);
    });
  };

  const handleNewFileFolder = (
    list: FileFolder[],
    type: "file" | "folder",
    name: string
  ): FileFolder[] => {
    return list.map((item) => {
      if (item.id === id && item.children && Array.isArray(item.children)) {
        // if ID matches and the children are present
        if (type === "file") {
          // if file type then no children
          return {
            ...item,
            children: [
              ...item.children,
              { name, type, id: new Date().toLocaleString() },
            ],
          };
        }
        if (type === "folder") {
          // if folder type then children
          return {
            ...item,
            children: [
              ...item.children,
              {
                name,
                type,
                id: new Date().toLocaleString(),
                children: [],
              },
            ],
          };
        }
      } else {
        // when does not match and the children are present check them
        if (item.children && Array.isArray(item.children)) {
          let res = handleNewFileFolder(item.children, type, name);
          return { ...item, children: res };
        }
      }
      return item;
    });
  };

  const handleOpen = (type: "file" | "folder") => {
    setOpen(true);
    setCreateType(type);
  };

  const handleSubmit = () => {
    if (!name) return;
    if (createType === "") return;

    setFiles((prev) => {
      const newFiles = [...prev];
      return handleNewFileFolder(newFiles, createType, name);
    });
    setCreateType("");
    setName("");
  };

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-row items-center gap-4 text-xl">
          {isFolder ? (
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="rounded-full"
            >
              {isExpanded ? <ChevronDown /> : <ChevronRight />}
            </button>
          ) : (
            <div className="size-5"></div>
          )}
          {isFolder ? <Folder /> : <File />} {props.name}{" "}
          {isFolder && (
            <DialogTrigger asChild>
              <button
                onClick={() => handleOpen("folder")}
                className="rounded-full"
              >
                <FolderPlus />
              </button>
            </DialogTrigger>
          )}
          {isFolder && (
            <DialogTrigger asChild>
              <button
                onClick={() => handleOpen("file")}
                className="rounded-full"
              >
                <FilePlus2 />
              </button>
            </DialogTrigger>
          )}
          <button onClick={deleteFile} className="rounded-full">
            <X />
          </button>
        </div>
        {isExpanded && (
          <div className="pl-5 space-y-4">
            {props.children &&
              isFolder &&
              props.children.map((item, index) => {
                return (
                  <div key={index}>
                    <RenderFileFolder {...item} setFiles={setFiles} />
                  </div>
                );
              })}
          </div>
        )}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {createType === "folder" ? "Folder" : "File"} Name:
            </DialogTitle>
            <DialogDescription>
              Enter the name of the{" "}
              {createType === "folder" ? "folder" : "file"}.
            </DialogDescription>
          </DialogHeader>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="success"
                onClick={handleSubmit}
                disabled={createType === "" || name === ""}
              >
                Submit
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
