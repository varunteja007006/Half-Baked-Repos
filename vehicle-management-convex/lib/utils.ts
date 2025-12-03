import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const fileLocalDownload = async (fileUrl: string, fileName?: string, docKind?: string) => {
  if (typeof window === "undefined") {
    // Handle server-side download
    return;
  }

  try {
    if (!fileUrl) return;

    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}` || `${docKind || "file"}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success("Download successful!");
  } catch (err) {
    console.error("Download failed", err);
    toast.error("Download failed. Please try again.");
  }
};
