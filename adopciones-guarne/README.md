# Adopciones Guarne — Proyecto Angular

Migración completa del sitio estático HTML/CSS/Bootstrap a Angular 17 con arquitectura standalone components.

## 🚀 Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [Angular CLI](https://angular.io/cli) v17

```bash
npm install -g @angular/cli@17
```

## 📦 Instalación

```bash
# Clonar / descomprimir el proyecto
cd adopciones-guarne

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

Abre [http://localhost:4200](http://localhost:4200) en tu navegador.

## 🗂️ Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/            → Barra de navegación (shared)
│   │   ├── footer/            → Pie de página (shared)
│   │   └── whatsapp-button/   → Botón flotante de WhatsApp
│   ├── pages/
│   │   ├── home/              → Página de inicio
│   │   ├── adopta/            → Catálogo de mascotas con filtros reactivos
│   │   ├── quienes-somos/     → Historia, misión, visión y valores
│   │   ├── contactanos/       → Formulario con validación (Reactive Forms)
│   │   ├── login/             → Panel de acceso administrador
│   │   └── admin-panel/       → Panel administrativo (protegido)
│   ├── services/
│   │   └── auth.service.ts    → Manejo de sesión admin con localStorage
│   ├── guards/
│   │   └── auth.guard.ts      → Protección de ruta /admin
│   ├── models/
│   │   └── animal.model.ts    → Interface Animal
│   ├── app.routes.ts          → Configuración de rutas
│   └── app.config.ts          → Providers de la aplicación
├── assets/
│   └── img/                   → ⚠️ Copiar las imágenes del proyecto original aquí
└── styles.css                 → Estilos globales
```

## 🖼️ Imágenes

Copia la carpeta `img/` del proyecto original dentro de `src/assets/`:

```
src/assets/img/
├── icon.ico
├── icon.jpg
├── Astro.jpeg
├── Mango.jpeg
├── Laika.jpeg
├── gato1.jpg
├── gato2.jpg
├── gato3.jpg
├── Fotogrupal.jpeg
├── jornada.png
├── Carousel2.png
├── guarne.png
├── whatsapp.svg
├── whatsapp-color.svg
└── instagram.svg
```

## 🔐 Acceso al panel de administración

- **Ruta:** `/login`
- **Usuario por defecto:** `admin`
- **Contraseña por defecto:** `admin123`

> Las credenciales se guardan en `localStorage` bajo la clave `adminUser`.

## 🛣️ Rutas disponibles

| Ruta            | Descripción                          |
|-----------------|--------------------------------------|
| `/`             | Página de inicio                     |
| `/adopta`       | Catálogo de mascotas con filtros     |
| `/quienes-somos`| Quiénes somos                        |
| `/contactanos`  | Formulario de contacto               |
| `/login`        | Login administrador                  |
| `/admin`        | Panel admin (requiere autenticación) |

## ✅ Mejoras respecto al original

- **Routing con Angular Router** → sin recargas de página
- **Componentes reutilizables** → Navbar, Footer y botón WhatsApp compartidos
- **Filtros reactivos con Signals** → `computed()` de Angular 17
- **Formulario con validación** → Reactive Forms en la página de Contacto
- **Auth Guard** → Protección real de la ruta `/admin`
- **TypeScript tipado** → Interface `Animal` para el catálogo

## 🏗️ Compilar para producción

```bash
ng build
```

Los archivos de producción quedan en `dist/adopciones-guarne/`.
