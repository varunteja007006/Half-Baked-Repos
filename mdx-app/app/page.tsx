import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen" >
      <Link href="/mdx-sample" className="text-3xl">MDX sample</Link>
    </div>
  );
}
