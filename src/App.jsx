import React, { useEffect, useMemo, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs.jsx'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card.jsx'
import { Badge } from './components/ui/Badge.jsx'
import { Button } from './components/ui/Button.jsx'
import { Input } from './components/ui/Input.jsx'
import { Progress } from './components/ui/Progress.jsx'
import { GraduationCap, Search, Sun, Moon, ChevronRight, Globe, Check } from './components/icons.jsx'
import { loadIndex, loadLessonMd } from './lib/content.js'

const CATEGORIES = [
  { id: 'primaria', label: 'Primaria' },
  { id: 'secundaria', label: 'Secundaria' },
  { id: 'universidad', label: 'Universidad' },
]

export default function App(){
  const [theme, setTheme] = useState('light')
  const [tab, setTab] = useState('primaria')
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState({ courses: [] })
  const [openCourse, setOpenCourse] = useState(null)
  const [view, setView] = useState(null)
  const [progress, setProgress] = useState({})

  useEffect(()=>{ loadIndex().then(setIndex).catch(console.error) },[])

  function toggleTheme(){
    setTheme(t => t==='light' ? 'dark':'light')
    document.documentElement.classList.toggle('dark')
  }

  const courses = useMemo(()=> index.courses.filter(c => c.level===tab), [index, tab])
  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    if(!q) return courses
    return courses.filter(c => c.title.toLowerCase().includes(q)
      || (c.desc||'').toLowerCase().includes(q)
      || (c.tags||[]).some(t => t.toLowerCase().includes(q)))
  },[courses, query])

  async function openLesson(course, lesson){
    const html = await loadLessonMd(lesson.path)
    setView({ course, lesson, html })
    window.scrollTo({top:0, behavior:'smooth'})
  }

  function markLesson(answerCorrect){
    if(!view) return
    const cid = view.course.id
    const lid = view.lesson.id
    setProgress(prev => {
      const existing = prev[cid]?.completed || []
      const completed = answerCorrect && !existing.includes(lid) ? [...existing, lid] : existing
      return { ...prev, [cid]: { completed } }
    })
    alert(answerCorrect ? '¡Correcto! Lección completada.' : 'No es correcto. Intenta de nuevo.')
  }

  const percent = (course)=>{
    const p = progress[course.id]?.completed?.length || 0
    const total = course.lessons?.length || 1
    return Math.round(p/total*100)
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-500 grid place-items-center text-white">
              <GraduationCap/>
            </div>
            <div>
              <div className="text-sm text-zinc-500">Portal Educativo</div>
              <div className="font-semibold -mt-1">Aprendizaje Multinivel</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-2xl border px-2 py-1 bg-white dark:bg-zinc-900">
              <Search/>
              <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar cursos, temas, etiquetas…" className="border-none h-8 w-[220px]"/>
            </div>
            <Button variant="outline" className="hidden sm:inline-flex" onClick={()=>alert('Demo: conecta auth con Supabase/Firebase si lo necesitas.')}>
              Iniciar sesión
            </Button>
            <Button variant="ghost" onClick={toggleTheme} aria-label="Alternar tema">
              {theme==='light' ? <Moon/> : <Sun/>}
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-sky-100 via-white to-emerald-100 dark:from-slate-900 dark:via-slate-950 dark:to-zinc-900 border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs sm:text-sm bg-white/70 dark:bg-black/30 backdrop-blur-sm">
                GH Pages + Decap CMS (admin)
              </div>
              <h1 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight">
                Aprende desde <span className="text-sky-600 dark:text-sky-400">Primaria</span> hasta <span className="text-emerald-600 dark:text-emerald-400">Universidad</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl">
                Contenido en Markdown administrado en <code>/admin</code>, compilado como sitio estático y publicado en GitHub Pages.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Button>Explorar cursos</Button>
                <Button variant="outline" onClick={toggleTheme}>{theme==='light'?'Modo oscuro':'Modo claro'}</Button>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="rounded-2xl border bg-white/70 dark:bg-black/30 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2"><Globe/><span className="text-sm font-medium">Multinivel</span></div>
                <ul className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 space-y-1">
                  <li>• Primaria: fundamentos y juegos</li>
                  <li>• Secundaria: ciencias y programación</li>
                  <li>• Universidad: cálculo, estructuras, ciberseguridad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border p-3 sm:p-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="rounded-2xl grid grid-cols-3 w-full">
              {CATEGORIES.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id} className="rounded-2xl">{cat.label}</TabsTrigger>
              ))}
            </TabsList>
            {CATEGORIES.map(cat => (
              <TabsContent key={cat.id} value={cat.id} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {index.courses.filter(c => c.level === cat.id)
                    .filter(c => {
                      const q = query.trim().toLowerCase()
                      if(!q) return true
                      return c.title.toLowerCase().includes(q) || (c.desc||'').toLowerCase().includes(q) || (c.tags||[]).some(t => t.toLowerCase().includes(q))
                    })
                    .map(c => (
                    <Card key={c.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader><CardTitle>{c.title}</CardTitle></CardHeader>
                      <CardContent>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 min-h-[40px]">{c.desc||''}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {(c.tags||[]).map(t => <Badge key={t} variant="solid" className="rounded-xl">{t}</Badge>)}
                        </div>
                        <div className="mt-4">
                          <Progress value={(progress[c.id]?.completed?.length||0) / (c.lessons?.length||1) * 100} className="h-2"/>
                          <div className="mt-1 text-xs text-zinc-500">
                            Progreso: {Math.round(((progress[c.id]?.completed?.length||0) / (c.lessons?.length||1)) * 100)}%
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button onClick={()=>setOpenCourse(c)}>
                            Abrir curso <span className="inline-block ml-1"><ChevronRight/></span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {openCourse && (
          <div className="border rounded-3xl p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm"><Button variant="ghost" onClick={()=>setOpenCourse(null)}>← Volver</Button></div>
              <Badge variant="outline" className="rounded-xl">{openCourse.title}</Badge>
            </div>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">{openCourse.desc}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {openCourse.lessons.map((l, idx)=>{
                const done = (progress[openCourse.id]?.completed||[]).includes(l.id)
                return (
                  <div key={l.id} className="rounded-2xl border p-3">
                    <div className="text-sm font-medium flex items-center justify-between">
                      <span>{idx+1}. {l.title}</span>
                      {done && <span title="Completada"><Check/></span>}
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{l.preview||''}</p>
                    <div className="mt-2 flex justify-end">
                      <Button size="sm" onClick={()=>openLesson(openCourse, l)}>Abrir lección</Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {view && (
          <div className="rounded-3xl border p-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={()=>setView(null)}>← Volver</Button>
              <Badge variant="secondary" className="rounded-xl">{view.course.title}</Badge>
            </div>
            <h3 className="mt-3 text-xl sm:text-2xl font-semibold">{view.lesson.title}</h3>
            <div className="prose dark:prose-invert max-w-none mt-2" dangerouslySetInnerHTML={{__html: view.html}}/>
            {view.lesson.quiz && (
              <div className="mt-6 rounded-2xl border p-4">
                <h4 className="font-medium">Quiz rápido</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{view.lesson.quiz.q}</p>
                <div className="mt-3 grid gap-2">
                  {view.lesson.quiz.options.map((opt, idx)=>(
                    <Button key={idx} variant="outline" className="justify-start" onClick={()=>{
                      const ok = idx===view.lesson.quiz.answer
                      if(ok){
                        const cid = view.course.id
                        const lid = view.lesson.id
                        setProgress(prev=>{
                          const done = prev[cid]?.completed || []
                          return { ...prev, [cid]: { completed: done.includes(lid)? done : [...done, lid] } }
                        })
                      }
                      alert(ok ? '¡Correcto! Lección completada.' : 'No es correcto. Intenta de nuevo.')
                    }}>
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 text-xs text-zinc-500">Completa todos los quizzes para finalizar el curso.</div>
          </div>
        )}

        <footer className="pt-6 text-xs text-zinc-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Portal Educativo. GH Pages + Decap CMS.</div>
          <div>/admin para editar contenido (requiere OAuth GitHub).</div>
        </footer>
      </div>
    </div>
  )
}
