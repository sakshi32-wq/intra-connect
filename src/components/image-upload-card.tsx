import { useEffect, useId, useState } from 'react'
import { CloudUpload, UserRound } from 'lucide-react'

interface ImageUploadCardProps {
  caption: string
  uploadLabel: string
  /** Shown when nothing has been chosen (the caduceus / silhouette images were not exported). */
  placeholder?: React.ReactNode
}

/** 208×242 logo/photo picker with a grey upload strip (Setting, 10, 14). UI-only: previews locally. */
export function ImageUploadCard({ caption, uploadLabel, placeholder }: ImageUploadCardProps) {
  const id = useId()
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview)
  }, [preview])

  return (
    <figure className="flex w-[208px] shrink-0 flex-col items-center gap-2.5">
      <div className="flex h-[242px] w-full flex-col overflow-hidden rounded-lg border border-muted-foreground bg-white">
        <div className="grid flex-1 place-items-center">
          {preview ? (
            <img src={preview} alt="" className="size-full object-cover" />
          ) : (
            (placeholder ?? <UserRound className="size-28 stroke-1 text-muted-foreground" aria-hidden />)
          )}
        </div>
        <label
          htmlFor={id}
          className="flex h-[46px] cursor-pointer items-center justify-center gap-2 bg-strip text-base text-foreground hover:bg-muted focus-within:outline-2 focus-within:outline-ring"
        >
          <CloudUpload className="size-5 stroke-[1.5]" aria-hidden />
          {uploadLabel}
          <input
            id={id}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) setPreview(URL.createObjectURL(file))
            }}
          />
        </label>
      </div>
      <figcaption className="text-lg text-muted-foreground">{caption}</figcaption>
    </figure>
  )
}
