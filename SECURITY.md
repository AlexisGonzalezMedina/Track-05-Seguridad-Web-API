# Política de Seguridad y Mitigación OWASP Top 10

Este documento detalla las contramedidas y mecanismos de endurecimiento implementados en este proyecto para mitigar los riesgos críticos descritos en el **OWASP Top 10**.

---

## 🛡️ Mitigaciones Implementadas por Riesgo

### 1. A03:2021 - Inyección / XSS (Cross-Site Scripting)
* **Medida:** Validación estricta y tipado seguro de esquemas de datos entrantes en el backend antes de procesar cualquier autenticación. Se restringen caracteres especiales mediante expresiones regulares para anular intentos de inyección. En el frontend, se aprovecha el sistema de escape por defecto del motor de renderizado de React, evitando el uso de propiedades inseguras como `dangerouslySetInnerHTML`.
* **Archivos implicados:**
    * `src/lib/validation.ts` (Esquema de validación estricto con Zod).
    * `src/app/api/auth/login/route.ts` (Validación en el endpoint mediante `.safeParse()`).
    * `src/app/login/page.tsx` (Renderizado seguro de inputs y estados).

### 2. A04:2021 - Diseño Inseguro / CSRF (Cross-Site Request Forgery)
* **Medida:** Protección estricta del estado de la sesión limitando el comportamiento de las cookies mediante el atributo `SameSite=Strict`. Esto garantiza que el navegador jamás adjunte la cookie de sesión en solicitudes originadas desde sitios externos de terceros. Asimismo, los flujos de cambio de estado usan mutaciones de tipo `POST` restringidas por el enrutador de Next.js.
* **Archivos implicados:**
    * `src/lib/session.ts` (Configuración explícita de `sameSite: 'strict'` al instanciar la cookie).
    * `src/middleware.ts` (Validación de origen criptográfico en cada salto de ruta).

### 3. A05:2021 - Configuración de Seguridad Insegura (Cabeceras HTTP)
* **Medida:** Inyección global de cabeceras de seguridad HTTP en todas las rutas de la aplicación para mitigar Clickjacking, suplantación de tipos MIME, fugas de referencia cruzada y forzar la navegación cifrada.
* **Cabeceras configuradas:**
    * `Content-Security-Policy` (CSP estricta para mitigar inyecciones de scripts).
    * `X-Frame-Options: DENY` (Evita Clickjacking).
    * `X-Content-Type-Options: nosniff` (Previene el rastreo de tipo de contenido).
    * `Referrer-Policy: strict-origin-when-cross-origin` (Protege la privacidad del origen).
    * `Strict-Transport-Security` (Fuerza HTTPS de forma estricta).
* **Archivos implicados:**
    * `next.config.mjs` (Configuración del objeto centralizado de cabeceras).

### 4. A07:2021 - Fallas de Identificación y Autenticación
* **Medida:** Las contraseñas de los usuarios nunca se almacenan en texto plano; se implementa un algoritmo de derivación de claves robusto utilizando funciones de hashing con sal asignada (salts). Además, los mecanismos de respuesta ante fallas implementan mensajes de error genéricos para neutralizar ataques de enumeración y escaneo de nombres de usuario.
* **Archivos implicados:**
    * `src/lib/auth.ts` (Almacenamiento de hash Bcrypt y método de comparación segura).
    * `src/app/api/auth/login/route.ts` (Retorno homogéneo de códigos `401 Unauthorized` con mensajes idénticos).