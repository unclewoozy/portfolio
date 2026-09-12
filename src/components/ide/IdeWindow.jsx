export default function IdeWindow({ id, children, className = '' }) {
  return (
    <section
      id={id}
      data-parallax
      className={`ide-window reveal relative ${className}`}
    >
      {children}
    </section>
  )
}
