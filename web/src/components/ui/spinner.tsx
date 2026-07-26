import { cn } from "@/lib/utils"
import { SpinnerIcon } from "@phosphor-icons/react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <SpinnerIcon data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

function GlobalSpinner() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Spinner className="size-8" />
    </div>
  )
}

export { Spinner, GlobalSpinner }
