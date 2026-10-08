const EHR_LOGOS = [
  { name: 'athenahealth', src: '/images/ehr-athenahealth.svg', className: 'h-[37px] w-[122px]' },
  { name: 'Epic', src: '/images/ehr-epic.svg', className: 'h-[22px] w-[58px]' },
  { name: 'Cerner', src: '/images/ehr-cerner.svg', className: 'h-[23px] w-[93px]' },
  { name: 'NextGen', src: '/images/ehr-nextgen.svg', className: 'h-[29px] w-[61px]' },
] as const

// The exported 2x illustrations already contain their captions (and, for the
// laptop, the bordered white tile), so they are shown as-is at 1x.
function Illustration({ src, caption, width, height }: { src: string; caption: string; width: number; height: number }) {
  return <img src={src} alt={caption} width={width} height={height} className="justify-self-center" />
}

/** Bottom-middle tile: the export only has the "unified format" caption, so frame and caption are drawn here. */
function EhrFormatTile() {
  return (
    <figure className="flex h-[160px] w-[202px] flex-col items-center overflow-hidden rounded-lg border-2 border-overview-tile-border bg-white">
      <div className="h-[103px] w-[192px] shrink-0 overflow-hidden">
        <img src="/images/illustration-convert-laptop.png" alt="" width={202} height={160} className="-mt-[3px] -ml-[5px] max-w-none" />
      </div>
      <figcaption className="mt-[6px] w-[136px] text-center text-sm leading-4 text-foreground">
        Convert data into EHR format
      </figcaption>
    </figure>
  )
}

/** EHRs → Intraconnects → Practice diagram (Overview frame, 1392px wide at 1920). */
export function HowItWorksDiagram() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-y-8 xl:flex-nowrap xl:justify-between">
      <section
        aria-label="EHRs"
        className="flex w-[211px] shrink-0 flex-col gap-3 rounded-lg bg-sidebar px-[15px] pt-5 pb-[21px] shadow-panel"
      >
        <ul className="flex flex-col gap-3">
          {EHR_LOGOS.map((logo) => (
            <li key={logo.name} className="grid h-[49px] place-items-center rounded-sm bg-white">
              <img src={logo.src} alt={logo.name} className={logo.className} />
            </li>
          ))}
        </ul>
        <p className="grid h-9 place-items-center rounded-md bg-primary text-lg font-medium text-primary-foreground">
          EHRs
        </p>
      </section>

      {/* 100px gap on the left and 65px on the right in the design: nudge right of centre. */}
      <section
        aria-label="Intraconnects"
        className="mx-10 grid w-full max-w-[696px] min-w-[600px] grid-cols-[143px_202px_151px] grid-rows-[160px_48px_160px] content-start justify-between rounded-2xl bg-overview-panel px-[55px] py-[26px] shadow-panel xl:mx-0 xl:translate-x-[17.5px]"
      >
        <Illustration src="/images/illustration-convert-data.png" caption="Convert data into unified format" width={136} height={160} />
        <Illustration src="/images/illustration-convert-laptop.png" caption="Convert data into unified format" width={202} height={160} />
        <Illustration src="/images/illustration-push-data.png" caption="Push data by webhook" width={138} height={149} />
        <p className="col-span-3 self-center text-center text-lg font-semibold text-foreground">Intraconnects</p>
        <Illustration src="/images/illustration-transfer-data.png" caption="Transfer the data from practice" width={142} height={149} />
        <EhrFormatTile />
        <Illustration src="/images/illustration-pull-data.png" caption="Pull the data from practice" width={151} height={149} />
      </section>

      <section
        aria-label="Practice"
        className="flex w-[320px] shrink-0 flex-col items-center gap-3 rounded-lg bg-overview-practice-card px-5 pt-[5px] pb-2.5 shadow-practice-card"
      >
        <img src="/images/practice-hospital.png" alt="" className="h-[250px] w-[281px] object-cover" />
        <p className="grid h-11 w-[281px] place-items-center rounded-md bg-overview-practice-button text-lg font-medium text-white">
          Practice
        </p>
      </section>
    </div>
  )
}
