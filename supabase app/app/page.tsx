import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 sm:p-16 container">
      <header className="hero mb-8 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Image src="/next.svg" alt="Next.js logo" width={180} height={36} />
            <p className="muted hidden sm:block">
              A small demo app with simple, consistent styles.
            </p>
          </div>

          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-3">
              <li>
                <Link href="/" className="btn">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/login" className="btn">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/private" className="btn">
                  Private
                </Link>
              </li>
              <li>
                <a
                  className="btn"
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  Docs
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="grid gap-6" role="main">
        <section className="card">
          <h2>Welcome</h2>
          <p className="muted">Welcome — customize this demo in <code>app/page.tsx</code>.</p>
        </section>

        <section className="card">
          <h3>Quick links</h3>
          <div className="flex gap-3 mt-3">
            <a
              className="btn primary"
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
            >
              Deploy
            </a>
            <a
              className="btn"
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
          </div>
        </section>
      </main>

      <footer className="muted mt-12 text-center">
        Made with Next.js • Demo styles applied
      </footer>
    </div>
  );
}
