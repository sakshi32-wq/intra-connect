import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui/input-group'

interface AuthInputProps extends React.ComponentProps<'input'> {
  icon: LucideIcon
}

/** 48px auth field with a leading icon; password fields get a show/hide toggle. */
export function AuthInput({ icon: Icon, type, ...props }: AuthInputProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <InputGroup className="h-12 border-auth-input-border shadow-none">
      {/* icon at 23px, text at 67px (frame 1); the group adds 8px input padding */}
      <InputGroupAddon className="pr-3 pl-[23px]">
        <Icon className="size-6 stroke-[1.25] text-muted-foreground" aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        type={isPassword && visible ? 'text' : type}
        className="h-full text-base text-foreground placeholder:text-muted-foreground md:text-base"
        {...props}
      />
      {isPassword ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((value) => !value)}
          >
            {visible ? <Eye /> : <EyeOff />}
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}
