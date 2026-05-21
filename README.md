# ⚡ Ángel Postigo Rodríguez — Definitive Cyberpunk Full-Stack Portfolio

Este es tu nuevo portfolio profesional interactivo con la estética ultra-premium definitiva: **cyberpunk oscura (ink, gold & fire)**. Está completamente desarrollado utilizando **React (Vite)**, estructurado con un robusto sistema de diseño mediante **Tailwind CSS**, animado con **Framer Motion** y cargado con sofisticados efectos interactivos y de rendimiento.

---

## 🎨 Estética & Diseño Signature (Ink, Gold & Fire)

- **Gama de Colores:** Diseñado sobre una base profunda `bg-ink` (`#050515`), contrastando con los tonos cálidos `ember` (`#ffba08`) e intensificados por acentos de fuego `fire` (`#d62828`).
- **Interactive Letter Physics:** El componente `Hero` implementa físicas de partículas y letras interactivas que siguen el movimiento del ratón en tiempo real, junto con una carga en cascada (`CascadeText`).
- **Organic Morphing SVG (InkBlob):** Un elemento visual fluido y dinámico en la portada que simula tinta flotando en suspensión, animado con trayectorias SVG continuas.
- **Marquee Sliding Ribbons:** Cintas deslizantes con movimiento infinito bidireccional en `About.jsx` que muestran tu stack y perfil tecnológico.
- **Dynamic Profile Avatar:** Un avatar en SVG animado interactivo en `ProfilePhoto` con anillos dobles concéntricos rotatorios, rejilla de radar y destello de luz lateral.
- **Active Digital Code Rain:** Un fondo animado sobre `<canvas>` en `CodeField` (integrado en `Contact.jsx`) que simula la caída de flujos de código digital extraídos de tus propios proyectos.

---

## 📂 Estructura del Proyecto

```text
portfolio/
├── index.html                  # Plantilla HTML con SEO y Google Fonts
├── package.json                # Dependencias (React, Tailwind, Framer Motion)
├── postcss.config.js           # Configuración de PostCSS
├── tailwind.config.js          # Configuración del Sistema de Diseño (Colores y Fuentes)
├── vite.config.js              # Configuración de Vite React
└── src/
    ├── App.jsx                 # Ensamblador principal de secciones
    ├── index.css               # Estilos globales, scrollbars doradas y clases de resplandor
    ├── main.jsx                # Punto de entrada de React
    └── components/
        ├── About.jsx           # Perfil Profesional (con ribbons deslizantes y ProfilePhoto)
        ├── CodeField.jsx       # Fondo animado canvas (lluvia de código)
        ├── Contact.jsx         # Formulario de contacto con popup telefónico y CodeField
        ├── Experience.jsx      # Trayectoria (Erasmus+ en Italia, IES Monroy DAW, TDFF)
        ├── Footer.jsx          # Pie de página y scroll-to-top
        ├── Header.jsx          # Navegación flotante y menú adaptativo (GitHub de puyi27)
        ├── Hero.jsx            # Cabecera interactiva con InkBlob y CascadeText
        ├── ProfilePhoto.jsx    # Avatar cyber vector animado
        ├── Projects.jsx        # Expositor técnico (Quavemind, StatusPage, TDFF, Agencia)
        └── animations/
            ├── ScrambleOnHover.jsx  # Animación de revelación hacker
            └── CascadeText.jsx      # Animación de cascada por letras
```

---

## 🚀 Cómo Ejecutarlo en Local

Para poner en marcha tu portfolio en tu ordenador local, sigue estos sencillos pasos:

1. **Abre tu terminal favorita** y navega a la carpeta de este espacio de trabajo:
   ```bash
   cd "C:\Users\angel\Desktop\DEV\portfolio"
   ```
2. **Instala las dependencias necesarias** con npm:
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo local**:
   ```bash
   npm run dev
   ```
4. Abre [http://localhost:5174](http://localhost:5174) (o el puerto que te asigne automáticamente) en tu navegador para ver tu nuevo portfolio funcionando.
