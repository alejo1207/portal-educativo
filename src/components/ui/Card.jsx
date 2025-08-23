import React from 'react'
export function Card({children, className=''}){
  return <div className={`border rounded-3xl bg-white dark:bg-zinc-950 ${className}`}>{children}</div>
}
export function CardHeader({children, className=''}){
  return <div className={`p-4 sm:p-5 ${className}`}>{children}</div>
}
export function CardTitle({children, className=''}){
  return <div className={`font-semibold ${className}`}>{children}</div>
}
export function CardContent({children, className=''}){
  return <div className={`p-4 sm:p-5 pt-0 sm:pt-0 ${className}`}>{children}</div>
}
