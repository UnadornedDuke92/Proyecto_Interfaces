# Proyecto_Interfaces

# Sergio Mijangos — Portafolio Web

Portafolio personal desarrollado como proyecto de clase. Presenta mi trayectoria, proyectos y habilidades como estudiante de Ingeniería en Animación y Efectos Visuales.

## Demo en vivo
[sergio-mijangos.github.io/portafolio](https://unadornedduke92.github.io/Proyecto_Interfaces/)

## Tecnologías utilizadas
- HTML5 semántico (`<header>`, `<main>`, `<section>`, `<article>`, `<figure>`)
- CSS3 con variables personalizadas (`--red`, `--bg-dark`, etc.)
- Bootstrap 5.3 — grid, navbar, utilidades responsive
- Bootstrap Icons 1.11
- JavaScript vanilla — IntersectionObserver, animaciones, typing effect
- React 18 (UMD + Babel Standalone) — componente de formulario de contacto

## Características
- Diseño dark mode con paleta personalizada
- Navbar transparente que transita a vidrio esmerilado al hacer scroll
- Animaciones de entrada con `IntersectionObserver`
- Barras de habilidades animadas
- Galería con efecto hover
- Timeline de trayectoria
- Formulario de contacto React con validación y estado de envío
- Barra de progreso de lectura
- Accesibilidad: roles ARIA, skip link, `aria-label` en todos los elementos interactivos

## Estructura del proyecto
```
portafolio/
├── index.html
├── index.css
├── js/
│   ├── main.js
│   └── ContactForm.jsx
└── Images/
    ├── DeChill.jpg
    ├── lotus.jpg
    ├── ciberseguridad.jpg
    └── gal1-6.jpg
```

## Cómo correrlo localmente
Clona el repositorio y abre `index.html` en el navegador. No requiere instalación.

```bash
git clone https://github.com/UnadornedDuke92/Proyecto_Interfaces.git
cd Proyecto_Interfaces
# Abre index.html en tu navegador
```

> **Nota:** `ContactForm.jsx` usa Babel Standalone via CDN. Para que cargue correctamente en local, sirve los archivos con un servidor local (p.ej. VS Code Live Server).

## Autor
**Sergio Mijangos** — Ingeniería en Animación y Efectos Visuales  
[GitHub](https://github.com/UnadornedDuke92) · [LinkedIn](https://linkedin.com/in/sergio-carlos-mijangos-carbajal-a4878a26b)
