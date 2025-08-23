# Portal Educativo — GitHub Pages + Decap CMS (para alejo1207)

**URL prevista**: https://alejo1207.github.io/portal-educativo/

- React + Vite + Tailwind
- Contenido en Markdown (`/content/lessons/**.md`) gestionado con **Decap CMS** en `/portal-educativo/admin/`
- Base de Vite configurada a `'/portal-educativo/'`
- 9 cursos iniciales (3 por nivel)

## Uso
```bash
npm install
npm run dev
npm run build
```

### Publicación en GitHub Pages
1. Crea el repo **portal-educativo** en tu cuenta (`alejo1207/portal-educativo`).
2. Sube estos archivos a la rama **main** y habilita **Pages → GitHub Actions**.
3. El sitio quedará en **/portal-educativo/**.

### CMS (Decap)
- Edita `public/admin/config.yml` si cambiaste el nombre del repo o si agregas tu **proxy OAuth** (requerido para login en GitHub Pages).
- Abre: `https://alejo1207.github.io/portal-educativo/admin/`

_Generado el 2025-08-23_
