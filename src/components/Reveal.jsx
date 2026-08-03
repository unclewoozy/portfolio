export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  return (
    <Tag className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </Tag>
  )
}
