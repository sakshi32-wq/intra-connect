import { cn } from '#/lib/utils'

interface CenteredFormCardProps extends Omit<React.ComponentProps<'section'>, 'title'> {
  title: string
  subtitle?: React.ReactNode
}

/** ~648px bordered card centred in the content (15, 18, 36, 42, 59, 64). */
export function CenteredFormCard({ title, subtitle, className, children, ...props }: CenteredFormCardProps) {
  return (
    <section
      className={cn('mx-auto flex w-[648px] max-w-full flex-col gap-6 rounded-lg border border-input bg-card px-10 py-8 shadow-tile', className)}
      {...props}
    >
      <header className="text-center">
        <h2 className="text-heading font-semibold text-foreground">{title}</h2>
        {subtitle ? <p className="mt-1.5 text-lg text-muted-foreground">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}
