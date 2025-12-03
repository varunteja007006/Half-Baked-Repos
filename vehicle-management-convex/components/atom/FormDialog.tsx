import { DialogContent } from "@/components/ui/dialog";

const FormContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-h-[80vh] overflow-y-auto pr-4 py-2 pl-2"> {children}</div>;
};

const FormDialogContent = ({ children }: { children: React.ReactNode }) => {
  return <DialogContent className="w-full md:min-w-xl">{children}</DialogContent>;
};

export { FormContent, FormDialogContent };
