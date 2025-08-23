import { marked } from 'marked'
const BASE = (import.meta?.env?.BASE_URL) ? import.meta.env.BASE_URL : '/';

export async function loadIndex(){
  const res = await fetch(`${BASE}content/index.json?_=${Date.now()}`)
  if(!res.ok) throw new Error('No se pudo cargar content/index.json')
  return res.json()
}

export async function loadLessonMd(path){
  const clean = path.replace(/^\.\//, '').replace(/^content\//, 'content/')
  const res = await fetch(`${BASE}${clean}`)
  if(!res.ok) throw new Error('No se pudo cargar ' + path)
  const md = await res.text()
  return marked.parse(md)
}
