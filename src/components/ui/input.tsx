import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-[#E8E8E8] placeholder:text-[#707070] selection:bg-[#D4AF37] selection:text-[#0F1419]",
        "flex h-12 w-full min-w-0 rounded-lg border border-[rgba(232,232,232,0.2)]",
        "bg-[rgba(255,255,255,0.05)] backdrop-blur-sm",
        "px-4 py-3 text-base text-[#E8E8E8]",
        "transition-all duration-300 outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1419] focus-visible:shadow-[0_0_16px_rgba(212,175,55,0.3)]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        "hover:border-[rgba(232,232,232,0.3)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
