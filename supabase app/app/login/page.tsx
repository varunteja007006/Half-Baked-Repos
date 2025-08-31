import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen p-8 container grid place-items-center">
      <form className="card w-full max-w-sm" method="post">
        <h2>Sign in</h2>

        <label className="mt-4 block" htmlFor="email">Email</label>
        <input className="input mt-1 w-full" id="email" name="email" type="email" required />

        <label className="mt-3 block" htmlFor="password">Password</label>
        <input className="input mt-1 w-full" id="password" name="password" type="password" required />

        <div className="flex gap-3 mt-6">
          <button className="btn primary" formAction={login} type="submit">Log in</button>
          <button className="btn" formAction={signup} type="submit">Sign up</button>
        </div>
      </form>
    </div>
  )
}