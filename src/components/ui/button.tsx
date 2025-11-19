import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1419] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#D4AF37] to-[#2C3E50] text-[#0F1419] shadow-[0_8px_24px_rgba(212,175,55,0.15)] hover:shadow-[0_12px_32px_rgba(212,175,55,0.25)] hover:scale-[1.02] active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] font-heading",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-[#E8E8E8] bg-transparent text-[#E8E8E8] hover:bg-[rgba(232,232,232,0.1)] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-[0_0_16px_rgba(212,175,55,0.2)]",
        secondary:
          "bg-[#2C3E50] text-[#E8E8E8] hover:bg-[#2C3E50]/80 hover:shadow-[0_0_16px_rgba(44,62,80,0.3)]",
        ghost:
          "hover:bg-[rgba(232,232,232,0.05)] hover:text-[#D4AF37]",
        link: "text-[#D4AF37] underline-offset-4 hover:underline hover:text-[#F0E68C]",
      },
      size: {
        default: "h-12 px-6 py-3 has-[>svg]:px-4",
        sm: "h-10 rounded-lg gap-1.5 px-4 has-[>svg]:px-3 text-xs",
        lg: "h-14 rounded-lg px-8 has-[>svg]:px-6 text-base",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
