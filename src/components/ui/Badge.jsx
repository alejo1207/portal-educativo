import React from 'react'
export function Badge({children, variant='solid', className=''}){
  const base = 'inline-flex items-center px-2 py-0.5 rounded-xl text-xs'
  const styles = {
    solid: 'bg-zinc-200 dark:bg-zinc-800',
    outline: 'border border-zinc-300 dark:border-zinc-700',
    secondary: 'bg-emerald-200/60 dark:bg-emerald-900/40'
  }
  return <span className={`${base} ${styles[variant]} ${className}`}>{children}</span>
}
