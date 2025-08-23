import React from 'react'
export function Input({className='', ...props}){
  return <input className={`h-9 rounded-xl border px-3 outline-none bg-white dark:bg-zinc-900 ${className}`} {...props}/>
}
