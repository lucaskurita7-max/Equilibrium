import React from 'react'

export function BrandMark({ small }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={
          `rounded-2xl border border-stroke bg-gradient-to-br from-brand to-brand2 ` +
          (small ? 'h-9 w-9' : 'h-10 w-10')
        }
      />
      <div>
        <div className={"font-black tracking-tight " + (small ? 'text-base' : 'text-lg')}>Equilibrium</div>
        <div className={"text-xs text-white/70 " + (small ? 'hidden sm:block' : '')}>Pro Start • Demo navegável</div>
      </div>
    </div>
  )
}
