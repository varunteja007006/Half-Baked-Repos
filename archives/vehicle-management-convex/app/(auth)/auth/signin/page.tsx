import { GoogleLoginBtn } from "@/components/features/auth";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center h-full justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-primary">Sign In</h1>
      <GoogleLoginBtn />
    </div>
  );
}
