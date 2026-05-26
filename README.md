# Next.js OWASP Top 10 Seguro

Aplicación web moderna desarrollada con **Next.js (App Router)** enfocada en la implementación de contramedidas de seguridad robustas frente a las de directrices y vulnerabilidades del **OWASP Top 10**.

## Requisitos Previos

* Node.js
* NPM

## Instalación y Configuración

1. Clonar el repositorio e ingresar al directorio del proyecto:
   
   cd nextjs-owasp-seguro

2. Instalar las dependencias del proyecto:

    npm install

3. Configurar las variables de entorno:

    cp .env.local.example .env.local

    Asegurate de que el archivo '.env.local' contenga un una clave para la firma de sesiones:

    JWT_SECRET=Un_secreto_unico_y_seguro_para_el_sistema

4. Ejecutar la aplicacion en el entorno de desarrollo:

    npm run dev

5. Credenciales de Prueba

    Usuario: admin
    Contraseña: ContraseñaDePrueba25052026
