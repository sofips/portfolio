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
  - *The pros and cons of using deep reinforcement learning or genetic algorithms to design control schemes for quantum state transfer on qubit chains* — Physica Scripta, vol. 101, 265101 (26 junio 2026). DOI: 10.1088/1402-4896/ae7cc1. Primera autora.
  - *Solving the Qubit Transmission Problem with Biologically Inspired Neural Networks and Reinforcement Learning* (A. Fiuri, M. Domínguez, S. Perón Santana, O. Osenda) — SIMBig 2025, Communications in Computer and Information Science vol. 2895, pp. 60–78, Springer (2026). DOI: 10.1007/978-3-032-20322-9_5. Coautora (no primera autora). **Corrección (octubre 2026):** en una sesión anterior se asumió erróneamente que el contenido de `dynamic-control-noise-robustness.html` (la robustez frente a ruido) fue presentado en SIMBig 2025 — Sofi aclaró que no es así. Esa página ya no hace esa afirmación; no reintroducir un "dónde se presentó" para ese trabajo sin confirmarlo con ella primero.
- **Audiencia objetivo del portfolio:** industria broad — data science y AI/LLM, sin cerrar academia. El doctorado es el diferenciador, no el frame principal.

## Stack técnico

- HTML/CSS/JS vanilla, sin framework.
- Bilingüe (ES/EN) vía atributos `data-es` / `data-en` + `switchLanguage()` en `script.js`. Cualquier link cuyo destino también deba cambiar por idioma usa `data-href-es` / `data-href-en` (mismo mecanismo genérico, ej. el CV en `#contact`).
- Animación de fondo: canvas ripple grid en `script.js`. No queda ningún asset SVG muerto en el root (sí hay un `favicon.svg` intencional, ver abajo).
- CSS: una sola hoja `style.css`, compartida por todas las páginas. Las páginas de detalle la referencian con `../style.css` (o `../../style.css` desde `Diplomatura/`).
- Botones CTA de las páginas de detalle (repo de GitHub / video) usan las clases `.cta-btn` + `.cta-btn--github` / `.cta-btn--video` en `style.css`, con `.links-row--centered` para el contenedor. No usar `style=""` inline para esto — agregar variantes de `.cta-btn` si aparece un tercer estilo de link.
- **Thumbnails de `.entry .media img` usan `object-fit: contain`, no `cover`.** Decisión deliberada (octubre 2026): las imágenes de proyecto vienen de fuentes muy distintas (capturas de paper, gráficos de resultados, miniaturas de YouTube) con aspect ratios que no son 16:9, y recortarlas con `cover` cortaba contenido real (valores de gráficos, paneles enteros). Con `contain` la imagen se ve completa, enmarcada sobre el fondo oscuro de la card — el "margen" lateral/vertical que queda es parte del look, no un bug. Si se agrega un nuevo tipo de card, mantener esta regla en vez de volver a `cover`.
- `favicon.svg` en el root (rect oscuro + `>` rosa, mismo motivo que `.section-title::before`), linkeado desde las 8 páginas con la profundidad relativa correspondiente (`favicon.svg` / `../favicon.svg` / `../../favicon.svg` desde `Diplomatura/`).
- `.gitignore` en el root excluye `.claude/`, `.agents/`, `skills-lock.json` y cualquier clon anidado de un repo de proyecto (ver nota sobre `menu-chatbot-hybrid` más abajo).

## Estructura de archivos

```
index.html                          ← página principal
style.css                           ← estilos globales
script.js                           ← ripple grid + language switcher + scroll-reveal
favicon.svg                         ← favicon del sitio (octubre 2026)
sitemap.xml                         ← incluye las 9 páginas de detalle actuales
robots.txt
me.jpg                              ← foto de perfil (usada en OG image también)
CNAME                               ← sofips.dev.ar

machine-learning-in-physics/
  quantum-state-transfer-ga.html    ← paper publicado (Physica Scripta, abril 2025)
  dynamic-control-comparison.html   ← paper publicado (Physica Scripta, junio 2026, vol. 101, 265101), recortado en octubre 2026 al régimen ideal/sin ruido (ver split abajo)
  dynamic-control-noise-robustness.html ← página nueva (octubre 2026): la mitad "robustez frente a ruido" que antes vivía en dynamic-control-comparison.html, separada porque esa página se había vuelto demasiado larga y porque en realidad son dos papers distintos (ver nota de split abajo). Tiene 4 comentarios <!-- TODO --> marcando figuras que todavía no se agregaron (dense vs sparse reward, WCN vs SSN, robustez ante desorden estático x2). No afirma dónde se presentó este trabajo — ver corrección en Publicaciones arriba
  quantum-circuit-learning.html     ← página propia, reescrita en octubre 2026: ya no es "clasificación y regresión" sino "clasificación y ruido en hardware real" — la sección de regresión se reemplazó por una línea de trabajo abierta sobre ruido en hardware real (ibm_brisbane) y tomografía de procesos cuánticos, todavía en desarrollo. El tercer "talk" de la sección Charlas (QCL) sigue sin video propio — placeholder de texto en index.html (sin el bug visual que tenía antes, ver Pendiente)
  Quantum-Circuit-Learning/         ← PDFs fuente + figuras (circuit.png, nubes_puntos.png, qcl-confusion-matrices.png, loss_tomografia.png), sin duplicados ni espacios/typos en los nombres
  Dynamic-Control/, Genetic-Algorithm/  ← imágenes (y un par de PDFs de referencia/pósters) usadas por las páginas de detalle de ML en Física. `optuna-reward-noise.png` y `ga-physical-params.png` son dos mitades de una sola figura vieja (`hyper-parameter-opt.png`, todavía en el repo mezclaba un resultado de ruido con uno sin ruido) partida con PIL en octubre 2026 — cada mitad fue a la página que le corresponde

ai-projects/
  menu-chatbot-hybrid.html          ← chatbot RAG (menú de restaurante), linkea a github.com/sofips/menu-chatbot-hybrid. Vive en la sección #nlp del home (id histórico, cubre tanto NLP como RAG/LLM)
  rag-pipeline-diagram.jpeg         ← miniatura de la card RAG en el home (octubre 2026, reemplaza el placeholder plano "RAG"): diagrama propio de la arquitectura híbrida (ruta determinística de lookup SQL vs. ruta RAG con ChromaDB, combinadas en la síntesis de respuesta del LLM)
  (dos assets sin usar: un SVG de diagrama RAG y un .webp de Shutterstock — quedaron sin usar porque `rag-pipeline-diagram.jpeg` los reemplazó como miniatura de la card. Decidir si se borran o se guardan para otro uso; si en algún momento se usa el de Shutterstock, confirmar licencia antes de publicarlo.)

data-science-projects/
  canciones.html                    ← NLP + LDA sobre ~30k letras argentinas
  decision-transformers.html        ← Decision Transformers para recomendación (Netflix). Solo trae del proyecto original results/, src/, scripts/, models/ y reference_code/ — el dataset crudo y los notebooks de entrenamiento (~285MB) NO están acá, viven en github.com/sofips/Decision-Transformer-Recomendaciones. `results/hit-rate-thumb.png` es un recorte del panel "Hit Rate @ 20" de `model_comparison_plots.png`, generado para la card del home (la imagen completa tiene 3 paneles y es demasiado ancha para un thumbnail 16:9 legible)
  Diplomatura/
    diplomatura.html                ← proyectos de la diplomatura (carpeta con mayúscula — sigue siendo una inconsistencia de naming menor, ver Pendientes). Linkea directo a los notebooks en github.com/sofips/diplodatos_2025, no a páginas locales

peron_sofia_en2026.pdf              ← CV en inglés (versión actual, linkeado en #contact)
peron_sofia_2026.pdf                ← CV en español (versión actual, linkeado en #contact)
```

Nota sobre proyectos de código fuente completo (chatbots, notebooks, etc.): este repo es el del *sitio*, no el de cada proyecto. Cuando se suma un proyecto nuevo, traer del repo original solo lo que la página de detalle necesita mostrar (imágenes de resultados, código de referencia liviano) — no el dataset ni los checkpoints de modelo. Si en algún momento aparece una carpeta con su propio `.git` adentro (como pasó con `menu-chatbot-hybrid/`), no la trackees en este repo: o va a `.gitignore`, o se copia solo el HTML/assets finales a `ai-projects/`.

## Estado del proyecto (octubre 2026)

Trabajo actual en la rama `redesign-retro-arcade` (commit `dd7e0ac`, "redesign: retro-arcade visual direction + content restructure", más commits posteriores sin mergear a `main` todavía).

### Hecho ✓
- Meta tags SEO (`description`, `canonical`, OG, Twitter Card) en las 9 páginas del sitio; `sitemap.xml`/`robots.txt` al día.
- Sección `#nlp` (Procesamiento de Lenguaje Natural) en el home, con el chatbot RAG y el proyecto de canciones.
- Repo saneado (agosto 2026): ~345MB de contenido no usado por el sitio eliminados (ver historial si hace falta el detalle).
- Inline styles consolidados en `.cta-btn` / `.links-row--centered`.
- `quantum-circuit-learning.html` reescrita con la línea de ruido en hardware real (ver Estructura de archivos arriba).
- **Revisión visual completa (octubre 2026)**, hecha renderizando el sitio real en browser (no solo leyendo CSS) a desktop y mobile:
  - **Bug de overflow horizontal en mobile, afectaba las 9 páginas.** El nav (`.nav`), al pasar a `flex-direction: column` en `@media max-width:768px`, no tenía `width` propio y con `white-space: nowrap` en los links terminaba más ancho que el viewport — eso empujaba todo el documento, y como `body` tiene `overflow-x:hidden`, el excedente se recortaba en vez de scrollear (párrafos cortados a mitad de palabra, switcher ES/EN fuera de pantalla, nav con forma de óvalo con texto saliéndose). Arreglado: `.nav` ahora tiene `width:100%` + radio de rectángulo en mobile, y `.hero-row` tiene `align-items:stretch` en vez de `flex-start` (no estiraba `.header-text` a todo el ancho). Verificado con `scrollWidth == clientWidth` en las 8 páginas a 390px.
  - **Bug visual "Q▶L"**: el ícono ▶ (`.talk-media::after`) se superponía al texto del placeholder "QCL" en el tercer talk card, centrados ambos en el mismo punto. Fix: `.talk-media.placeholder::after { content: none }`.
  - **Thumbnails unificados**: `.entry .media img` pasó de `object-fit: cover` a `contain` (ver nota en Stack técnico) — resuelve a la vez la ilegibilidad de figuras académicas densas recortadas y el recorte literal del gráfico de Decision Transformers (su imagen fuente tiene 3 paneles, AR 3.76:1; con `cover` en una caja 16:9 se perdían valores en los bordes).
  - Card de QCL en `#publications` ahora tiene el flag "Con charla · RAFA 2024" (antes solo lo tenía la de Control Dinámico, pese a que QCL también tiene una charla embebida) y su descripción se actualizó para reflejar el contenido real de la página (ya no dice "clasificación y regresión").
  - Favicon agregado (no existía ninguno).
  - Switcher ES/EN más chico en mobile (`@media max-width:700px`) para tapar menos contenido al hacer scroll — sigue siendo `position:fixed`, así que algo de superposición ocasional es esperable, no se eliminó del todo.
  - Renombrado `confussion matrices.png` (typo + espacio, pedía `%20` en el link) a `qcl-confusion-matrices.png`.
  - Sacado el tratamiento `.entry--featured` (fila horizontal de ancho completo) de la card de Control Dinámico — pedido explícito de Sofi porque desentonaba con el resto de la grilla. Las 4 reglas CSS de `.entry--featured` se borraron del todo; ya no existe ese modificador.
- **Split de `dynamic-control-comparison.html` en dos páginas (octubre 2026).** La página se había vuelto demasiado larga, y al revisar las Referencias se encontró que en realidad mezclaba dos papers distintos: el de Physica Scripta (régimen ideal/sin ruido, Sofi primera autora) y el trabajo de robustez frente a ruido (Sofi coautora pero no primera autora). Se separó siguiendo esa frontera real, no solo por tamaño. **Ojo:** inicialmente se asumió que el trabajo de robustez correspondía al paper de SIMBig 2025 (A. Fiuri et al., ver Publicaciones) y así se documentó en la página nueva — Sofi corrigió que esa charla/presentación no es la de ese trabajo. La página ya no hace esa afirmación; no reintroducir un "presentado en X" para el trabajo de ruido sin confirmarlo con ella.
  - `dynamic-control-comparison.html` quedó con: Control Dinámico, Estrategias de Control, Resultados sin Ruido, Comparación de Desempeño y Costo Computacional, Distribución de Acciones del GA, GA para Cadenas Largas, Conclusiones (ítems sin ruido), Charla, Tecnologías, Estado del Trabajo, Referencias [1][2], Links.
  - `dynamic-control-noise-robustness.html` (nueva) quedó con: Optimización de Hiperparámetros con Optuna (Tabla II — esa sección en realidad ya estaba optimizada *bajo ruido al 25%*, no era parte del caso ideal como parecía a primera vista), Robustez frente al Ruido Dinámico, Recompensa Densa vs. Dispersa, WCN vs SSN, Entrenamiento con Desorden Estático, Conclusiones (ítems de ruido), Tecnologías, Estado del Trabajo (colaborativo, sin afirmar dónde se presentó), Referencias, Links.
  - Una figura vieja (`hyper-parameter-opt.png`) mezclaba panel (a) ruido + panel (b) sin ruido en una sola imagen — se partió en dos PNGs nuevos, uno para cada página (ver nota en Estructura de archivos).
  - Cada página linkea a la otra ("trabajo complementario") desde el resumen, las conclusiones y Estado del Trabajo.
- **Miniatura de la card RAG (octubre 2026).** El placeholder plano "RAG" de `#nlp` en el home se reemplazó por `ai-projects/rag-pipeline-diagram.jpeg`, un diagrama propio de la arquitectura del chatbot (no el SVG ni el `.webp` de Shutterstock que estaban sin usar — esos quedaron descartados para este uso, ver Estructura de archivos). Verificado renderizando a desktop y ~390px: la imagen queda bien enmarcada con `object-fit: contain` y no rompe el grid.
- **Bug de los links "Con charla" aterrizando en el lugar equivocado (octubre 2026).** Los talk cards de `#talks` (y los flags "Con charla" de `#publications`) linkean a `<página>.html#charla`. En `dynamic-control-comparison.html` y `quantum-circuit-learning.html` esas páginas tienen varias figuras (`<img>`) sin `width`/`height`, así que el navegador hacía el salto nativo al ancla antes de que esas imágenes terminaran de cargar y expandir su alto real — el layout se corría después del salto y el scroll quedaba desalineado (reproducible solo con latencia de red real, ej. el sitio en producción; en local con todo cacheado no se notaba). Confirmado con Playwright contra `sofips.dev.ar`, no solo leyendo el CSS. Fix: se agregaron `width`/`height` (dimensiones reales del archivo) a los 13 `<img>` de esas dos páginas — `.figure-block img` ya usa `max-width:100%; height:auto`, así que esto no cambia el tamaño renderizado, solo le da al navegador el aspect ratio para reservar el espacio antes de que la imagen cargue. **Si se agrega una figura nueva a cualquier página de detalle, poner `width`/`height` con las dimensiones reales del archivo** para no reintroducir este bug.

### Pendiente

- [ ] **Video para el tercer talk de QCL:** sigue siendo un placeholder de texto ("QCL", sin el bug de superposición) en vez de una miniatura real — falta el link al video cuando esté disponible.
- [ ] **Figuras faltantes en `dynamic-control-noise-robustness.html`:** 4 comentarios `<!-- TODO -->` en el HTML marcan dónde van (dense vs sparse reward, WCN vs SSN, robustez ante desorden estático x2) — se movieron ahí junto con el resto de esa sección, ver split arriba.
- [ ] **Assets huérfanos en `ai-projects/`:** el SVG de diagrama RAG y el `.webp` de Shutterstock quedaron sin usar una vez que `rag-pipeline-diagram.jpeg` cubrió la miniatura de la card — decidir si se borran del repo o se guardan para otra pieza de contenido.
- [ ] **Normalizar paths:** la carpeta `Diplomatura/` tiene mayúscula, el resto no. Puede dar problemas en servidores case-sensitive.
- [ ] **Reescribir historial de git** para bajar el peso real de `.git` (quedó ~220MB después del saneamiento de agosto) — opcional, requiere coordinar un force-push.
- [ ] **Mergear `redesign-retro-arcade` a `main`** cuando el contenido/diseño esté cerrado — por ahora el trabajo vive solo en la rama.

## Decisiones de diseño a respetar

- **Estética retro neon:** paleta oscura, acento rosa/violeta. Se mantiene como base, aunque en junio/agosto 2026 se relajó deliberadamente por pedido de Sofi: más contraste, más aire entre secciones, jerarquía tipográfica más marcada. El grid de proyectos usa `grid-template-columns: repeat(2, 1fr)` (sin `nth-child`/`grid-template-areas`, era frágil) y, desde octubre 2026, **todas las cards tienen el mismo formato** — no hay más variante "destacada" de ancho completo (`.entry--featured` se eliminó a pedido de Sofi: desentonaba con el resto de la grilla). Si un proyecto necesita destacarse, usar `.entry-flag` (ya disponible) en vez de reintroducir un layout distinto.
- **Thumbnails en `contain`, no `cover`** (ver Stack técnico) — no revertir a `cover` aunque alguna imagen puntual se vea "chica" dentro del marco oscuro; es preferible a recortar contenido.
- **Glitch effect** en el nombre del header: mantener.
- **Ripple grid canvas**: mantener.
- **Personalidad del about**: "nostálgica de internet y entusiasta de las pelis noventeras" — encaja con la estética, no eliminar.
- El sitio es bilingüe ES/EN. Cualquier texto nuevo necesita ambas versiones en `data-es` / `data-en`.
- **Scroll-reveal:** `.reveal`/`.reveal.in-view` en `style.css` anima solo `opacity`, nunca `transform` — a propósito, para que nunca compita con el `transform` de hover en `.entry`/`.talk` (lift + scale). Si se reintroduce una animación de entrada con transform, hacerlo en un selector que no se superponga con elementos hover-ables.
- **Verificar cambios de layout/CSS renderizando el sitio, no solo leyendo el código** — el bug de overflow mobile de octubre 2026 no era visible leyendo el CSS aislado, solo renderizando a un ancho angosto real. Para cambios de layout, levantar un server estático local y mirar con un browser (headless está bien) a desktop y ~390px antes de dar algo por resuelto.
