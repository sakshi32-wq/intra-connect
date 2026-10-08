import { Link } from '@tanstack/react-router'
import { Unplug } from 'lucide-react'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { Button } from '#/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'

/** Unknown `$connectionId` (not in the design). */
export function ConnectionNotFound() {
  return (
    <>
      <PageHeader title="Connections" breadcrumbs={[{ label: 'Connections', to: '/connections' }, { label: 'Not found' }]} />
      <PageContent>
        <Empty className="flex-1">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Unplug />
            </EmptyMedia>
            <EmptyTitle className="text-heading">Connection not found</EmptyTitle>
            <EmptyDescription>This connection doesn’t exist or has been removed.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link to="/connections">Back to Connections</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </PageContent>
    </>
  )
}
