import { SuccessState } from '#/components/success-state'

/**
 * SuccessState spaced as drawn on 24, 33 and 51: icon 179px under the header,
 * 72px to the title, ~22px to the text and ~37px to the button.
 */
export function DetailSuccess(props: React.ComponentProps<typeof SuccessState>) {
  return (
    <SuccessState
      {...props}
      className="gap-0 pt-[166px] [&>a]:mt-[37px] [&>h2]:mt-[72px] [&>h2+div]:mt-[22px]"
    />
  )
}
