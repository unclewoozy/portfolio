export default function SectionDivider() {
  return (
    <div className="reveal flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-paper/10" />
      <span className="h-1 w-1 rounded-full bg-paper/20" />
      <span className="h-px flex-1 bg-paper/10" />
    </div>
  )
}
