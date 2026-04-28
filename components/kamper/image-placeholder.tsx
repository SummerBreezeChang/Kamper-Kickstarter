"use client"

type ImagePlaceholderProps = {
  title: string
  note?: string
  className?: string
}

export function ImagePlaceholder({ title, note, className }: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-foreground/25 bg-foreground/5 ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_75%_60%,rgba(0,0,0,0.08),transparent_45%)]" />
      <div className="absolute inset-0 border-2 border-dashed border-foreground/20 rounded-2xl m-3" />
      <div className="relative px-6 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-foreground/70">Image Placeholder</p>
        <p className="mt-2 text-lg md:text-xl font-serif font-semibold uppercase text-foreground">{title}</p>
        {note ? <p className="mt-2 text-xs text-foreground/70">{note}</p> : null}
      </div>
    </div>
  )
}
