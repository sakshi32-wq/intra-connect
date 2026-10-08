import { cn } from '#/lib/utils'

interface ContentCardProps extends Omit<React.ComponentProps<'section'>, 'title'> {
  title: React.ReactNode
  /** accent = light-blue header (detail cards); muted = grey header (wizards). */
  tone?: 'accent' | 'muted'
  actions?: React.ReactNode
}

/** White shadowed card with a 78px tinted header strip (frames 22, 28, 35, 58–66 …). */
export function ContentCard({ title, tone = 'accent', actions, className, children, ...props }: ContentCardProps) {
  return (
    <section className={cn('flex flex-col bg-card shadow-card', className)} {...props}>
      <header
        className={cn(
          'flex h-[78px] shrink-0 items-center justify-between gap-4',
          tone === 'accent' ? 'bg-secondary pr-[41px] pl-[29px]' : 'bg-muted px-[23px]',
        )}
      >
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </header>
      {children}
    </section>
  )
}
