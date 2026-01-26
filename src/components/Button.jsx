import React from 'react'

export default function Button({ asChild = false, className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold ' +
    'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 transition'
  if (asChild) {
    const child = React.Children.only(props.children)
    return React.cloneElement(child, {
      className: `${base} ${child.props.className || ''} ${className}`.trim(),
    })
  }
  return (
    <button className={`${base} ${className}`.trim()} {...props}>
      {props.children}
    </button>
  )
}
