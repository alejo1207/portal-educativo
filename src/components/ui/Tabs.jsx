import React from 'react'
export function Tabs({value, onValueChange, children}){
  return <div data-value={value}>{React.Children.map(children, child => {
    if (child.type.displayName === 'TabsContent') {
      return React.cloneElement(child, { active: child.props.value === value })
    }
    if (child.type.displayName === 'TabsList') {
      return React.cloneElement(child, { value, onValueChange })
    }
    return child
  })}</div>
}
export function TabsList({children, className='', value, onValueChange}){
  return <div className={`flex gap-2 ${className}`}>{React.Children.map(children, child => React.cloneElement(child, {value, onValueChange}))}</div>
}
TabsList.displayName = 'TabsList'
export function TabsTrigger({children, value:tabValue, value, onValueChange, className=''}){
  const active = value===tabValue
  return <button onClick={()=>onValueChange(tabValue)} className={`rounded-2xl px-4 py-2 text-sm border ${active?'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900':'bg-white dark:bg-zinc-900'} ${className}`}>{children}</button>
}
TabsTrigger.displayName = 'TabsTrigger'
export function TabsContent({children, value, active, className=''}){
  if(!active) return null
  return <div className={className}>{children}</div>
}
TabsContent.displayName = 'TabsContent'
