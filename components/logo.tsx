"use client"

import Link from "next/link"
import { Brain } from "@phosphor-icons/react"

const Logo = ({ url = "/" }: { url?: string }) => {
  return (
    <Link href={url} className="flex items-center gap-x-3 pl-4">
      <Brain size={30} weight="duotone" className="text-primary" />
      <h1 className="text-2xl font-bold tracking-wide text-primary">
        Verbally
      </h1>
    </Link>
  )
}

export default Logo