# Guía de Deployment

Esta guía describe cómo desplegar la aplicación en diferentes entornos.

## 📋 Tabla de Contenidos

- [Preparación](#preparación)
- [Build para Producción](#build-para-producción)
- [Vercel](#vercel)
- [Netlify](#netlify)
- [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [Docker](#docker)
- [Variables de Entorno](#variables-de-entorno)

## 🔧 Preparación

### 1. Verificar que todo funcione localmente

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Verificar linting
npm run lint

# Build local
npm run build

# Preview del build
npm run preview
```

### 2. Configurar Variables de Entorno

Crear archivo `.env.production`:

```env
VITE_API_URL=https://api.tu-dominio.com/api
VITE_USE_MOCK_API=false
NODE_ENV=production
```

## 📦 Build para Producción

```bash
# Build optimizado
npm run build

# La carpeta 'dist' contiene los archivos estáticos
```

### Optimizaciones Incluidas

- ✅ Minificación de JS/CSS
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Source maps (opcional)

## 🚀 Vercel

### Opción 1: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Opción 2: GitHub Integration

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno
3. Deploy automático en cada push

### Configuración (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "@api-url"
  }
}
```

## 🌐 Netlify

### Opción 1: Netlify CLI

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

### Opción 2: Drag & Drop

1. Build local: `npm run build`
2. Ir a [netlify.com](https://netlify.com)
3. Arrastrar carpeta `dist`

### Configuración (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_API_URL = "https://api.tu-dominio.com/api"
```

## ☁️ AWS S3 + CloudFront

### 1. Crear Bucket S3

```bash
aws s3 mb s3://tu-bucket-name
```

### 2. Configurar Bucket para Hosting

```bash
aws s3 website s3://tu-bucket-name \
  --index-document index.html \
  --error-document index.html
```

### 3. Upload Build

```bash
# Build
npm run build

# Sync a S3
aws s3 sync dist/ s3://tu-bucket-name \
  --delete \
  --cache-control max-age=31536000,public
```

### 4. Configurar CloudFront

1. Crear distribución CloudFront
2. Origen: S3 bucket
3. Default root object: `index.html`
4. Error pages: 404 → `/index.html` (200)

### 5. Invalidar Cache

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

## 🐳 Docker

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=https://api.tu-dominio.com/api
    restart: unless-stopped
```

### Comandos Docker

```bash
# Build image
docker build -t task-manager-frontend .

# Run container
docker run -p 80:80 task-manager-frontend

# Docker Compose
docker-compose up -d
```

## 🔐 Variables de Entorno

### Desarrollo

```env
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK_API=true
NODE_ENV=development
```

### Staging

```env
VITE_API_URL=https://api-staging.tu-dominio.com/api
VITE_USE_MOCK_API=false
NODE_ENV=staging
```

### Producción

```env
VITE_API_URL=https://api.tu-dominio.com/api
VITE_USE_MOCK_API=false
NODE_ENV=production
```

## ✅ Checklist Pre-Deployment

- [ ] Tests pasando (npm test)
- [ ] Build exitoso (npm run build)
- [ ] Linting sin errores (npm run lint)
- [ ] Variables de entorno configuradas
- [ ] Backend API disponible
- [ ] CORS configurado en backend
- [ ] SSL/HTTPS configurado
- [ ] Domain/DNS configurado
- [ ] Error tracking configurado (Sentry)
- [ ] Analytics configurado (GA)

## 🔍 Verificación Post-Deployment

### 1. Funcionalidad

- [ ] Login funciona
- [ ] Crear tarea funciona
- [ ] Listar tareas funciona
- [ ] Actualizar estado funciona
- [ ] Eliminar tarea funciona
- [ ] Dashboard muestra gráficos
- [ ] Filtros funcionan
- [ ] Búsqueda funciona

### 2. Performance

```bash
# Lighthouse audit
npx lighthouse https://tu-dominio.com --view
```

Métricas objetivo:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### 3. Seguridad

- [ ] HTTPS habilitado
- [ ] Security headers configurados
- [ ] API tokens seguros
- [ ] No hay secretos expuestos
- [ ] CORS correctamente configurado

## 📊 Monitoring

### Error Tracking

```typescript
// Integración con Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### Analytics

```typescript
// Google Analytics
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR_GA_ID');
```

## 🔄 CI/CD Pipeline (GitHub Actions)

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🆘 Troubleshooting

### Error: Blank page después de deploy

**Solución**: Verificar que las rutas estén configuradas correctamente

```javascript
// vite.config.ts
export default defineConfig({
  base: '/', // Ajustar según subdirectorio
});
```

### Error: API calls fallan

**Solución**: Verificar CORS en backend y variables de entorno

```typescript
// Verificar en DevTools
console.log('API URL:', import.meta.env.VITE_API_URL);
```

### Error: 404 en rutas de React Router

**Solución**: Configurar rewrites en el servidor

**Vercel**: Automático
**Netlify**: Usar `_redirects` o `netlify.toml`
**Nginx**: `try_files $uri /index.html;`

## 📚 Recursos Adicionales

- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS S3 Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

---

**Última actualización**: 2024-01-17
