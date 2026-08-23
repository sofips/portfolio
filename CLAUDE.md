# Portfolio — CLAUDE.md

Portfolio personal de Sofía "Sofi" Perón Santana. Sitio estático en `sofips.dev.ar`, hosteado en GitHub Pages.

## Quién es Sofi

- **Rol actual (desde mayo 2026):** AI Developer — RAG pipelines y soluciones basadas en LLMs.
- **Formación doctoral:** Becaria CONICET en UNC-FAMAF (desde abril 2023), investigando ML aplicado a mecánica cuántica (Deep RL + algoritmos genéticos para transferencia de estados cuánticos). Está muy orgullosa de esta formación y no quiere que quede minimizada.
- **Diplomatura:** Ciencia de Datos, Aprendizaje Automático y sus Aplicaciones — UNC-FAMAF (marzo–diciembre 2025).
- **Grado:** Licenciada en Física — UNC-FAMAF (promedio 8.86).
- **Tecnologías:** Python (avanzado), PyTorch, TensorFlow, scikit-learn, NumPy, Pandas, Bash/Shell, Fortran, SLURM.
- **Idiomas:** Español (nativo), Inglés (C1), Alemán (A2).
- **Publicaciones:**
  - *Quantum state transfer performance of Heisenberg spin chains...* — Physica Scripta, vol. 100, 055110 (abril 2025).
  - *The pros and cons of using deep reinforcement learning or genetic algorithms to design control schemes for quantum state transfer on qubit chains* — Physica Scripta, vol. 101, 265101 (26 junio 2026). DOI: 10.1088/1402-4896/ae7cc1.
- **Audiencia objetivo del portfolio:** industria broad — data science y AI/LLM, sin cerrar academia. El doctorado es el diferenciador, no el frame principal.

## Stack técnico

- HTML/CSS/JS vanilla, sin framework.
- Bilingüe (ES/EN) vía atributos `data-es` / `data-en` + `switchLanguage()` en `script.js`. Cualquier link cuyo destino también deba cambiar por idioma usa `data-href-es` / `data-href-en` (mismo mecanismo genérico, ej. el CV en `#contact`).
- Animación de fondo: canvas ripple grid en `script.js`. No queda ningún asset SVG muerto en el root.
- CSS: una sola hoja `style.css`, compartida por todas las páginas. Las páginas de detalle la referencian con `../style.css` (o `../../style.css` desde `Diplomatura/`).
- Botones CTA de las páginas de detalle (repo de GitHub / video) usan las clases `.cta-btn` + `.cta-btn--github` / `.cta-btn--video` en `style.css`, con `.links-row--centered` para el contenedor. No usar `style=""` inline para esto — agregar variantes de `.cta-btn` si aparece un tercer estilo de link.
- `.gitignore` en el root excluye `.claude/`, `.agents/`, `skills-lock.json` y cualquier clon anidado de un repo de proyecto (ver nota sobre `menu-chatbot-hybrid` más abajo).

## Estructura de archivos

```
index.html                          ← página principal
style.css                           ← estilos globales
script.js                           ← ripple grid + language switcher + scroll-reveal
sitemap.xml                         ← incluye las 8 páginas de detalle actuales
robots.txt
me.jpg                              ← foto de perfil (usada en OG image también)
CNAME                               ← sofips.dev.ar

machine-learning-in-physics/
  quantum-state-transfer-ga.html    ← paper publicado (Physica Scripta, abril 2025)
  dynamic-control-comparison.html   ← paper publicado (Physica Scripta, junio 2026, vol. 101, 265101). Tiene 4 comentarios <!-- TODO --> marcando figuras del paper que todavía no se agregaron (dense vs sparse reward, WCN vs SSN, robustez ante desorden estático x2)
  quantum-circuit-learning.html     ← página propia. Cubre paper de clasificación (Jornada IA UNC 2024) + póster de regresión (RAFA 2024). El tercer "talk" de la sección Charlas (QCL) todavía no tiene video propio — placeholder en index.html
  Quantum-Circuit-Learning/         ← PDFs fuente + imagen de matriz de confusión, sin duplicados
  Dynamic-Control/, Genetic-Algorithm/  ← imágenes (y un par de PDFs de referencia/pósters) usadas por las páginas de detalle de ML en Física

ai-projects/
  menu-chatbot-hybrid.html          ← chatbot RAG (menú de restaurante), linkea a github.com/sofips/menu-chatbot-hybrid. Vive en la sección #nlp del home (id histórico, cubre tanto NLP como RAG/LLM)

data-science-projects/
  canciones.html                    ← NLP + LDA sobre ~30k letras argentinas
  decision-transformers.html        ← Decision Transformers para recomendación (Netflix). Solo trae del proyecto original results/, src/, scripts/, models/ y reference_code/ — el dataset crudo y los notebooks de entrenamiento (~285MB) NO están acá, viven en github.com/sofips/Decision-Transformer-Recomendaciones
  Diplomatura/
    diplomatura.html                ← proyectos de la diplomatura (carpeta con mayúscula — sigue siendo una inconsistencia de naming menor, ver Pendientes). Linkea directo a los notebooks en github.com/sofips/diplodatos_2025, no a páginas locales

peron_sofia_en2026.pdf              ← CV en inglés (versión actual, linkeado en #contact)
peron_sofia_2026.pdf                ← CV en español (versión actual, linkeado en #contact)
```

Nota sobre proyectos de código fuente completo (chatbots, notebooks, etc.): este repo es el del *sitio*, no el de cada proyecto. Cuando se suma un proyecto nuevo, traer del repo original solo lo que la página de detalle necesita mostrar (imágenes de resultados, código de referencia liviano) — no el dataset ni los checkpoints de modelo. Si en algún momento aparece una carpeta con su propio `.git` adentro (como pasó con `menu-chatbot-hybrid/`), no la trackees en este repo: o va a `.gitignore`, o se copia solo el HTML/assets finales a `ai-projects/`.

## Estado del refactor (agosto 2026)

### Hecho ✓
- Meta tags SEO (`description`, `canonical`, OG, Twitter Card) en las 9 páginas del sitio.
- JSON-LD Person schema en `index.html`.
- `sitemap.xml` y `robots.txt` al día, incluyendo `quantum-circuit-learning.html` y `ai-projects/menu-chatbot-hybrid.html`.
- Sección `#nlp` (Procesamiento de Lenguaje Natural) agregada al home, con el chatbot RAG y el proyecto de canciones.
- Dead code de `script.js` (`loadProjects()` y afines, que buscaban un `projects.json` inexistente) eliminado.
- Inline styles (`style=""`) eliminados de las 4 páginas de detalle que los tenían — consolidados en `.cta-btn` / `.links-row--centered`.
- Repo saneado (agosto 2026): eliminados ~345MB de contenido no usado por el sitio — dataset y notebooks de Decision-Transformer, las 4 páginas de proyectos de diplomatura sin linkear (diabetes, fútbol, inmobiliarias, préstamos) con sus assets, CVs viejos sin linkear, PDFs duplicados en `Quantum-Circuit-Learning/`, y el clon anidado de `menu-chatbot-hybrid/`. El tamaño en disco del working tree bajó de ~410MB a ~70MB. **Pendiente:** el `.git` interno sigue pesando ~220MB porque esos archivos ya estaban en el historial — si se quiere recuperar ese espacio hace falta reescribir el historial (`git filter-repo` / BFG) y force-push, algo que no se hizo automáticamente por ser una operación destructiva sobre una rama ya pusheada.

### Pendiente

- [ ] **Video para el tercer talk de QCL:** en `index.html`, la sección Charlas tiene un placeholder de texto ("QCL") en vez de una miniatura real — falta el link al video cuando esté disponible.
- [ ] **Figuras faltantes en `dynamic-control-comparison.html`:** 4 comentarios `<!-- TODO -->` en el HTML marcan dónde van (dense vs sparse reward, WCN vs SSN, robustez ante desorden estático x2).
- [ ] **Normalizar paths:** la carpeta `Diplomatura/` tiene mayúscula, el resto no. Puede dar problemas en servidores case-sensitive.
- [ ] **Reescribir historial de git** para bajar el peso real de `.git` (~220MB) — opcional, requiere coordinar un force-push.

## Decisiones de diseño a respetar

- **Estética retro neon:** paleta oscura, acento rosa/violeta. Se mantiene como base, aunque en junio/agosto 2026 se relajó deliberadamente por pedido de Sofi: más contraste, más aire entre secciones, jerarquía tipográfica más marcada. El grid de proyectos usa `grid-template-columns: repeat(auto-fit, minmax(280px,1fr))` + `.entry--featured { grid-column: 1 / -1 }` en vez de `nth-child`/`grid-template-areas` (era frágil, dejaba espacio vacío al reordenar cards).
- **Glitch effect** en el nombre del header: mantener.
- **Ripple grid canvas**: mantener.
- **Personalidad del about**: "nostálgica de internet y entusiasta de las pelis noventeras" — encaja con la estética, no eliminar.
- El sitio es bilingüe ES/EN. Cualquier texto nuevo necesita ambas versiones en `data-es` / `data-en`.
- **Scroll-reveal:** `.reveal`/`.reveal.in-view` en `style.css` anima solo `opacity`, nunca `transform` — a propósito, para que nunca compita con el `transform` de hover en `.entry`/`.talk` (lift + scale). Si se reintroduce una animación de entrada con transform, hacerlo en un selector que no se superponga con elementos hover-ables.
