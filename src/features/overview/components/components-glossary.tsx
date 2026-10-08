// Copy from the Overview frame, with its typos corrected (SCREEN_MAP §6.2).
const TERMS = [
  { term: 'EHR', definition: 'This is the Electronic Health Record system.' },
  { term: 'Healthcare Platform', definition: 'This is your own software or system.' },
  {
    term: 'Practice',
    definition: 'This refers to any hospital, clinic, or healthcare provider you wish to integrate with.',
  },
  {
    term: 'Intraconnects',
    definition: 'This consists of two parts - the Unified API and EHR Connection Adapters.',
  },
] as const

export function ComponentsGlossary() {
  return (
    <section aria-labelledby="glossary-heading" className="flex flex-col gap-[20px]">
      <h2 id="glossary-heading" className="text-heading font-medium text-foreground">
        Let’s understand how Intraconnect works by breaking down its key components: Practice, Healthcare
        Platform, Intraconnect, and EHR.
      </h2>
      <dl className="grid grid-cols-1 gap-x-[30px] gap-y-[22px] rounded-sm border-2 border-primary px-[63px] py-[31px] lg:grid-cols-2">
        {TERMS.map(({ term, definition }) => (
          <div key={term} className="flex flex-col gap-[5px]">
            <dt className="text-lg font-semibold text-foreground">{term}</dt>
            <dd className="text-[15px] leading-[18px] text-foreground">{definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
