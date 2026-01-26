export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl bg-white shadow-sm border border-slate-100 ${className}`.trim()}>
      {children}
    </div>
  )
}

export function CardContent({ className = '', children }) {
  return <div className={`p-4 ${className}`.trim()}>{children}</div>
}
