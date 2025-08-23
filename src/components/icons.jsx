import React from 'react'
function I({path}){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={path}/></svg>}
export const GraduationCap = () => <I path="M22 10l-10-5-10 5 10 5 10-5z M2 10v6a2 2 0 002 2h3" />
export const Search = () => <I path="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z" />
export const Sun = () => <I path="M12 4v-2M12 22v-2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 8a4 4 0 100 8 4 4 0 000-8z" />
export const Moon = () => <I path="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
export const ChevronRight = () => <I path="M9 18l6-6-6-6" />
export const Check = () => <I path="M20 6L9 17l-5-5" />
export const Globe = () => <I path="M12 2a10 10 0 100 20 10 10 0 000-20z M2 12h20M12 2c3 3 5 7 5 10s-2 7-5 10-5-7-5-10 2-7 5-10z" />
