import { marked } from 'marked'
export async function loadIndex(){
  const res = await fetch('./content/index.json?_=' + Date.now())
  if(!res.ok) throw new Error('No se pudo cargar content/index.json')
  return res.json()
}
export async function loadLessonMd(path){
  const res = await fetch(path)
  if(!res.ok) throw new Error('No se pudo cargar ' + path)
  const md = await res.text()
  const html = marked.parse(md)
  return html
}
