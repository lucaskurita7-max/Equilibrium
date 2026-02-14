import React from 'react'

export function Card({ title, right, children, className }: { title?: string; right?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={"rounded-2xl border border-stroke bg-panel shadow-soft p-4 md:p-5 " + (className ?? '')}>
      {(title || right) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title ? <div className="font-extrabold">{title}</div> : <div />}
          {right}
        </div>
      )}
      {children}
    </div>
  )
}

export function Input({ label, value, onChange, type='text', placeholder }: { label: string; value: any; onChange: (v: any) => void; type?: string; placeholder?: string }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-white/75">{label}</span>
      <input
        className="w-full rounded-xl border border-stroke2 bg-panel2 px-3 py-2 outline-none focus:border-white/30"
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
      />
    </label>
  )
}

export function Select({ label, value, onChange, children }: { label: string; value: any; onChange: (v: any) => void; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-white/75">{label}</span>
      <select
        className="w-full rounded-xl border border-stroke2 bg-panel2 px-3 py-2 outline-none focus:border-white/30"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </label>
  )
}

export function Button({ children, onClick, variant='primary', type='button' }: { children: React.ReactNode; onClick?: () => void; variant?: 'primary'|'ghost'|'danger'; type?: 'button'|'submit' }) {
  const base = 'rounded-xl px-4 py-2 text-sm font-bold transition border';
  const styles = {
    primary: 'bg-white text-bg border-white hover:opacity-90',
    ghost: 'bg-transparent text-white border-stroke hover:border-white/30',
    danger: 'bg-red-500 text-white border-red-500 hover:opacity-90'
  }[variant];

  return (
    <button type={type} onClick={onClick} className={base + ' ' + styles}>
      {children}
    </button>
  )
}
