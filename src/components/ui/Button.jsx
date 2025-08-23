import React from 'react'
export function Button({children, className='', variant='solid', size='md', ...props}){
  const base = 'rounded-2xl px-4 py-2 transition'
  const variants = {
    solid: 'bg-sky-600 text-white hover:bg-sky-700',
    outline: 'border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900',
    ghost: 'hover:bg-zinc-100 dark:hover:bg-zinc-900'
  }
  const sizes = { sm:'text-sm', md:'text-sm', lg:'text-base' }
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>
}
