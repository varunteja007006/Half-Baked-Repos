import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div>Dashboard Page</div>
      <div>Only shown when authenticated</div>
      <div>
        <Link href="/">
          <button className="p-5 text-black rounded-full bg-amber-300">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
