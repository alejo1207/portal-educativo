import React from 'react'
export function Progress({value=0, className=''}){
  return (
    <div className={`w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden ${className}`}>
      <div className="h-full bg-emerald-500" style={{width: `${value}%`}}></div>
    </div>
  )
}
