import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/ui/tooltip'
import { useCopyToClipboard } from '#/hooks/use-copy-to-clipboard'

/** Grey copy icon placed before a value (table names, client IDs, token IDs). */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const { copied, copy } = useCopyToClipboard()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`Copy ${label}`}
          onClick={async () => {
            if (!(await copy(value))) toast.error('Could not copy to the clipboard')
          }}
          className="grid size-6 shrink-0 place-items-center rounded-sm text-foreground/80 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
        >
          {copied ? <Check className="size-[18px] text-success" /> : <Copy className="size-[18px] stroke-[1.5]" />}
        </button>
      </TooltipTrigger>
      <TooltipContent>{copied ? 'Copied' : `Copy ${label}`}</TooltipContent>
    </Tooltip>
  )
}

/** Copy icon + value, as in the "ID : Name" and Client ID columns. */
export function CopyableText({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <CopyButton value={value} label={label} />
      <span className={className ?? 'truncate'}>{value}</span>
    </span>
  )
}
