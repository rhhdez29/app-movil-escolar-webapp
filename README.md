# App Móvil Escolar – WebApp
Aplicación web desarrollada en Angular cuyo propósito es ofrecer una interfaz clara, organizada y funcional para la gestión de información dentro de un entorno escolar. El sistema contempla la interacción con entidades como alumnos, maestros, administradores y materias, manteniendo una arquitectura modular que facilita su mantenimiento y evolución.
Constituye la versión web de una plataforma escolar móvil. Está diseñado para integrarse con servicios REST externos y proporcionar una experiencia coherente, intuitiva y eficiente. La aplicación emplea componentes reutilizables, servicios centralizados y estilos escalables, asegurando un desarrollo consistente y fácil de ampliar.

---

## Tecnologías Principales

- *Angular 16+*  
- *TypeScript*  
- *SCSS*  
- *Servicios REST (API externa)*  
- Arquitectura basada en componentes, servicios y módulos reutilizables.

---

## Ejecución del Proyecto

### 1. Instalación de dependencias
```bash
npm install
```
### 2. Ejecución en entorno de desarrollo
```bash
ng serve -o
```
La aplicación estará disponible en: [http://localhost:4200/](http://localhost:4200/)
La recarga automática se activará con cada modificación en el código fuente.

### 3. Generación de la versión de producción
```bash
ng build
```

---

## Generación de Código
Comandos útiles del Angular CLI:
```bash
ng g c nombre-componente
ng g s nombre-servicio
ng g m nombre-modulo
```
También se pueden generar directivas, pipes, guards, clases e interfaces.

---

## Integración con Servicios REST

La aplicación implementa una serie de servicios dedicados a la gestión de cada entidad del sistema (alumnos, maestros, administradores, materias).
Todos estos servicios se integran mediante un Facade Service, que centraliza la lógica de interacción con el backend y permite mantener componentes más limpios y orientados exclusivamente a la vista.


---

## Funcionalidades Principales

- Gestión de información de alumnos, maestros y materias.
- *Operaciones CRUD*
- Componentes modulares y reutilizables.
- Uso de modales y elementos visuales comunes para interacción con el usuario.
- Servicios REST segmentados por entidad para una gestión clara.
- Compatibilidad con paginación en español y estilos centralizados.
- Arquitectura preparada para escalar y agregar nuevas funcionalidades.

---

## Operaciones CRUD
La aplicación implementa operaciones CRUD para la administración de entidades escolares, permitiendo gestionar de forma completa el ciclo de vida de la información. Estas operaciones incluyen:
- **Crear** nuevos registros (alumnos, maestros, materias y otros recursos administrados).
- **Leer** y consultar datos mediante listados, vistas detalladas o búsquedas filtradas.
- **Actualizar** información existente para mantener los datos consistentes y vigentes.
- **Eliminar** registros cuando ya no son necesarios dentro del sistema.

Estas operaciones se ejecutan a través de los servicios internos de Angular y se coordinan con la API externa, asegurando que la información permanezca sincronizada entre el frontend y el backend.

---

## Estilos y Diseño
La aplicación emplea SCSS como sistema de estilos, permitiendo:
- Definición de variables globales.
- Reutilización de mixins.
- Encapsulamiento de estilos por componente.
- Mantenimiento limpio y ordenado a medida que crece el proyecto.

---

## Lineamientos para Contribución
1. Crear componentes siguiendo los estándares de Angular.
2. Registrar nuevas rutas en app-routing.module.ts.
3. Añadir servicios REST dentro del directorio correspondiente y, de ser necesario, integrarlos en el facade.service.ts.
4. Mantener la consistencia visual empleando SCSS modular y estilos centralizados.
5. Documentar adecuadamente cualquier nueva funcionalidad añadida.

---

## Información Adicional

Para más detalles sobre comandos y herramientas:
```bash
ng help
```
o consultar la documentación oficial del Angular CLI: [https://angular.io/cli](https://angular.io/cli)

---

## Notas Finales

Este proyecto ha sido diseñado para servir como base sólida para sistemas escolares web más amplios. La arquitectura propuesta permite integrar nuevas funcionalidades sin comprometer la estabilidad del sistema, priorizando buenas prácticas de desarrollo y claridad estructural.
