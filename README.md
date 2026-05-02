# DP Lab — Sitio web institucional

Sitio web público de DP Lab (Digital Process Lab).

## URL en producción

https://dprocesslab.com (después del deploy)

## Stack

- HTML5 semántico
- CSS3 (custom properties, grid, flexbox, responsive)
- JavaScript vanilla (IntersectionObserver para animaciones)
- Google Fonts: Space Grotesk + Inter + JetBrains Mono

## Características

- Hero con terminal animado simulando un workflow en vivo
- 4 servicios principales destacados
- Sección de proceso de trabajo
- Calculadora interactiva de ahorro por automatización
- Caso de estudio
- Formulario de contacto
- Diseño responsive
- Animaciones de revelado al hacer scroll

## Estructura

```
DP-Lab-Website/
├── index.html      Estructura y contenido
├── styles.css      Diseño y responsive
├── script.js       Interactividad
└── README.md       Este archivo
```

## Desarrollo local

Abrir `index.html` directamente en cualquier navegador moderno.

## Deploy

Conectado a Vercel. Cada push a `main` despliega automáticamente.
DNS gestionado en Hostinger: `dprocesslab.com` apunta a Vercel mediante registros A/CNAME.
