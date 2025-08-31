'use client'

export default function ErrorPage() {
  return (
    <div className="min-h-screen p-8 container grid place-items-center">
      <div className="card text-center">
        <h2>Something went wrong</h2>
        <p className="muted mt-2">Sorry, something went wrong. Try refreshing or come back later.</p>
      </div>
    </div>
  )
}