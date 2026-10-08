import { Link } from '@tanstack/react-router'
import { Plus, Trash } from 'lucide-react'

import { ConfirmDialog } from '#/components/confirm-dialog'
import { Button } from '#/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'
import { cn } from '#/lib/utils'
import type { MfaDevice } from '../types'
import { formatDateTime } from './format'

function RegisterDeviceButton() {
  return (
    <Button asChild className="self-start px-5 text-base">
      <Link to="/settings/user-details/mfa" search={{ step: 'register' }}>
        <Plus className="size-5" aria-hidden />
        Register with New Device
      </Link>
    </Button>
  )
}

/** Frame 10: no device registered yet. A white shadowed card with a red title, not an alert. */
function MfaStatusCard() {
  return (
    <section
      aria-labelledby="mfa-status-title"
      className="flex flex-col bg-card px-[37px] pt-[21px] pb-[22px] shadow-[0_0_10px_rgb(0_0_0/0.12)]"
    >
      <h3 id="mfa-status-title" className="text-lg font-semibold text-destructive">
        Multi-factor Authentication is not complete yet!
      </h3>
      <p className="mt-[13px] mb-[27px] text-md text-muted-foreground">
        Register a new device below to complete authentication.
      </p>
      <RegisterDeviceButton />
    </section>
  )
}

const COLUMNS = [
  { label: 'Device Name', className: 'w-[17.5%] pl-10' },
  { label: 'App Name', className: 'w-[23.3%]' },
  { label: 'App Description', className: 'w-[22.4%]' },
  { label: 'Authentication Date & Time', className: '' },
  { label: 'Action', className: 'w-[120px] pr-10 text-center' },
] as const

/** Frame 14: bordered table, light-blue header, no row dividers, delete with confirmation. */
function MfaDevicesTable({ devices, onDelete }: { devices: ReadonlyArray<MfaDevice>; onDelete: (device: MfaDevice) => void }) {
  return (
    <div className="overflow-x-auto border border-input shadow-[0_4px_10px_rgb(0_0_0/0.06)]">
      <Table className="min-w-[960px] text-lg">
        <caption className="sr-only">Registered MFA devices</caption>
        <TableHeader>
          <TableRow className="border-0 bg-secondary hover:bg-secondary">
            {COLUMNS.map((column) => (
              <TableHead
                key={column.label}
                scope="col"
                className={cn('h-[56px] px-0 text-lg font-medium text-foreground', column.className)}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr]:border-0 [&_tr:last-child>td]:pb-2">
          {devices.map((device) => (
            <TableRow key={device.id} className="h-[59px] hover:bg-secondary/40">
              <TableCell className="pl-10 text-muted-foreground">{device.name}</TableCell>
              <TableCell className="px-0 text-muted-foreground">{device.appName ?? '-'}</TableCell>
              <TableCell className="px-0 text-muted-foreground">{device.description}</TableCell>
              <TableCell className="px-0 text-muted-foreground">{formatDateTime(device.authenticatedAt)}</TableCell>
              <TableCell className="pr-10 text-center">
                <ConfirmDialog
                  trigger={
                    <Button variant="ghost" size="icon" aria-label={`Delete ${device.name}`} className="text-text-strong">
                      <Trash className="size-6 stroke-[1.5]" />
                    </Button>
                  }
                  title={`Delete ${device.name}?`}
                  description="This device will no longer be able to authenticate your sign-in. You can register it again later."
                  confirmLabel="Delete device"
                  destructive
                  onConfirm={() => onDelete(device)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/** "Multi-factor Authentication device" block of User Details: status card (10) or device list (14). */
export function MfaSection({ devices, onDelete }: { devices: ReadonlyArray<MfaDevice>; onDelete: (device: MfaDevice) => void }) {
  return (
    <section aria-labelledby="mfa-heading" className="flex flex-col">
      <h2 id="mfa-heading" className="mb-[34px] text-heading font-semibold text-foreground">
        Multi-factor Authentication device
      </h2>
      {devices.length === 0 ? (
        <MfaStatusCard />
      ) : (
        <div className="-mt-[3px] flex flex-col gap-[15px]">
          <RegisterDeviceButton />
          <MfaDevicesTable devices={devices} onDelete={onDelete} />
        </div>
      )}
    </section>
  )
}
