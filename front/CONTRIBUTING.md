# Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Gestión de Tareas! Este documento proporciona las pautas para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Estándares de Código](#estándares-de-código)
- [Convenciones de Commits](#convenciones-de-commits)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas un ambiente respetuoso y colaborativo.

## 🤝 Cómo Contribuir

### 1. Fork del Repositorio

```bash
# Clona tu fork
git clone https://github.com/tu-usuario/task-management-system.git
cd task-management-system

# Agrega el repositorio original como upstream
git remote add upstream https://github.com/original/task-management-system.git
```

### 2. Crear una Rama

```bash
# Actualiza tu rama main
git checkout main
git pull upstream main

# Crea una nueva rama para tu feature/fix
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 3. Realizar Cambios

- Escribe código limpio y siguiendo los estándares del proyecto
- Agrega tests para nuevas funcionalidades
- Actualiza la documentación si es necesario
- Asegúrate de que todos los tests pasen

### 4. Commit de Cambios

```bash
# Agrega los archivos modificados
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar nueva funcionalidad X"
```

### 5. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-descriptivo

# Crear Pull Request desde GitHub
```

## ⚙️ Configuración del Entorno

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo
npm run dev
```

### Comandos Útiles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo
npm run build            # Build para producción
npm run preview          # Preview del build

# Testing
npm test                 # Ejecuta tests
npm run test:watch       # Tests en modo watch
npm run test:coverage    # Tests con cobertura

# Linting
npm run lint             # Ejecuta ESLint
npm run format           # Formatea con Prettier
```

## 🔄 Proceso de Pull Request

1. **Asegúrate de que tu código cumple con los estándares**
   - Ejecuta `npm run lint` y corrige cualquier error
   - Ejecuta `npm test` y asegúrate de que todos los tests pasan
   - Ejecuta `npm run format` para formatear el código

2. **Actualiza la documentación**
   - README.md si es necesario
   - Comentarios en el código
   - JSDoc para funciones complejas

3. **Escribe una descripción clara del PR**
   - ¿Qué problema resuelve?
   - ¿Qué cambios incluye?
   - ¿Hay breaking changes?
   - Screenshots si aplica

4. **Espera la revisión**
   - Responde a los comentarios
   - Realiza los cambios solicitados
   - Mantén la rama actualizada con main

## 📏 Estándares de Código

### TypeScript

- Usa tipos explícitos siempre que sea posible
- Evita el uso de `any`
- Usa interfaces para objetos
- Usa types para uniones y primitivos

```typescript
// ✅ Bueno
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Malo
const user: any = { ... };
```

### React

- Usa componentes funcionales con hooks
- Props tipadas con TypeScript
- Usa React.FC para componentes
- Destructura props en la firma del componente

```typescript
// ✅ Bueno
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Redux

- Usa Redux Toolkit
- Async thunks para operaciones asíncronas
- Slices separados por feature
- Typed hooks (useAppDispatch, useAppSelector)

### Estilos

- Material-UI para componentes
- Usa sx prop para estilos
- Mantén consistencia con el tema
- Responsive design con breakpoints

```typescript
// ✅ Bueno
<Box sx={{ 
  p: 2, 
  bgcolor: 'primary.main',
  display: { xs: 'block', md: 'flex' }
}}>
```

### Tests

- Test unitarios para cada componente
- Test para reducers de Redux
- Test para custom hooks
- Cobertura mínima del 80%

```typescript
describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## 📝 Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

### Formato

```
<tipo>[scope opcional]: <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formateo, sin cambios en código
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
feat: agregar filtro por fecha en tareas
fix: corregir error en validación de formulario
docs: actualizar README con instrucciones de instalación
style: formatear código con Prettier
refactor: reorganizar estructura de carpetas
test: agregar tests para TaskCard component
chore: actualizar dependencias
```

## 🐛 Reportar Bugs

### Antes de reportar

1. Verifica que no exista un issue similar
2. Asegúrate de usar la última versión
3. Reproduce el bug de manera consistente

### Información a incluir

- **Descripción clara**: ¿Qué estaba intentando hacer?
- **Pasos para reproducir**: Lista numerada de pasos
- **Comportamiento esperado**: ¿Qué debería suceder?
- **Comportamiento actual**: ¿Qué sucede realmente?
- **Screenshots**: Si aplica
- **Entorno**:
  - OS: [Windows/Mac/Linux]
  - Browser: [Chrome/Firefox/Safari]
  - Versión de Node: [18.x]

### Template

```markdown
## Descripción del Bug
[Descripción clara y concisa]

## Pasos para Reproducir
1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

## Comportamiento Esperado
[Qué debería suceder]

## Comportamiento Actual
[Qué sucede actualmente]

## Screenshots
[Si aplica]

## Entorno
- OS: [Windows 10]
- Browser: [Chrome 120]
- Node: [18.17.0]
```

## 💡 Sugerir Mejoras

### Template para Features

```markdown
## Descripción del Feature
[Descripción clara y concisa]

## Motivación
¿Por qué es útil este feature?

## Propuesta de Implementación
¿Cómo podría implementarse?

## Alternativas Consideradas
¿Qué otras opciones hay?

## Información Adicional
[Contexto adicional, screenshots, etc.]
```

## 🎯 Áreas donde Contribuir

### Funcionalidades Prioritarias

- [ ] Dark mode
- [ ] Drag & drop para reordenar tareas
- [ ] Exportar tareas a CSV/PDF
- [ ] Notificaciones en tiempo real
- [ ] Filtros avanzados
- [ ] Categorías/etiquetas

### Mejoras de Código

- [ ] Aumentar cobertura de tests
- [ ] Mejorar accesibilidad (WCAG)
- [ ] Optimización de performance
- [ ] Internacionalización (i18n)
- [ ] PWA capabilities

### Documentación

- [ ] Videos tutoriales
- [ ] Guías de uso
- [ ] API documentation
- [ ] Storybook para componentes

## 📞 Contacto

¿Preguntas sobre cómo contribuir? Abre un issue con la etiqueta `question` o contacta al equipo.

## 🙏 Reconocimientos

¡Gracias a todos los contribuidores que hacen este proyecto mejor!

---

**Nota**: Esta guía está sujeta a cambios. Revisa la última versión antes de contribuir.
