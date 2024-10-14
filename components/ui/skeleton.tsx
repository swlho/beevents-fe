import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-full bg-muted w-8 h-8 bg-yellow-400", className)}
      {...props}
    />
  )
}

export { Skeleton }
