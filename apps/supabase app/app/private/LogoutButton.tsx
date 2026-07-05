"use client"

import React from "react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const logoutHandler = async () => {
    try {
      const res = await fetch('/auth/sign-out', { method: 'POST' })
      if (res.redirected) {
        window.location.href = res.url
        return
      }

      router.replace('/login')
    } catch {
      router.replace('/')
    }
  }

  return (
    <button type="button" className="btn" onClick={logoutHandler}>
      Log out
    </button>
  )
}
