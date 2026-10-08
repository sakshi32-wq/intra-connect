import { Link } from '@tanstack/react-router'
import { FileQuestion } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '#/components/ui/empty'

// Not in the Figma; built from the design tokens.
export function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-background p-gutter">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion />
          </EmptyMedia>
          <EmptyTitle className="text-heading">Page not found</EmptyTitle>
          <EmptyDescription>
            The page you are looking for doesn’t exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link to="/">Go to home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
