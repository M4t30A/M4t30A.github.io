# Web personal — Mateo Amaya

Sitio dividido en páginas (antes era un solo HTML gigante). Estructura:

```
index.html          → Inicio / hero
sobre-mi.html        → Sección "Sobre mí"
skills.html          → Sección "Skills"
certificados.html    → Certificados (con verificación)
contacto.html        → Formulario de contacto funcional
css/style.css        → Estilos compartidos por todas las páginas
js/main.js           → Cursor, partículas, glitch, typewriter, easter egg (sudo su)
js/certs.js          → Lógica de preview de imagen en certificados.html
images/certs/        → Imágenes de los certificados de Hack4u
```

## Subir a GitHub Pages

1. Copiá todo el contenido de esta carpeta (manteniendo la estructura) a la raíz de tu repo
   (el mismo donde ya tenías el `index.html` viejo, o uno nuevo).
2. Hacé commit y push.
3. En GitHub → Settings → Pages, confirmá que sirve desde la rama y carpeta correctas
   (normalmente `main` / `root`). Ya debería estar andando porque no cambia nada de eso.

## Activar el formulario de contacto (Formspree — gratis)

1. Andá a **https://formspree.io** y creá una cuenta gratis con tu email.
2. Una vez adentro, hacé clic en **"New Form"**, ponele un nombre (ej: "Contacto web").
3. Formspree te va a dar una URL tipo:
   ```
   https://formspree.io/f/abcd1234
   ```
4. Abrí `contacto.html`, buscá esta línea:
   ```html
   <form id="contact-form" class="contact-form reveal" action="https://formspree.io/f/TU_ID_DE_FORMSPREE" method="POST">
   ```
   y reemplazá `TU_ID_DE_FORMSPREE` por el ID que te dio Formspree (ej: `abcd1234`).
5. Subí el cambio a GitHub.
6. La primera vez que alguien complete y envíe el formulario (podés probarlo vos mismo),
   Formspree te va a mandar un mail para **confirmar el formulario**. Confirmalo una vez
   y a partir de ahí ya funciona normal, sin pasos extra.

**Plan gratis de Formspree:** hasta 50 envíos por mes, sin necesidad de backend ni
tarjeta de crédito. Si en algún momento lo superás, se puede migrar a otro plan o a
otro servicio similar sin tocar el diseño del formulario.

## Certificados

Los IDs y las imágenes de los 3 certificados de Hack4u (Introducción a Linux,
Personalización de Entorno en Linux, Arch Linux desde Cero) ya están actualizados
en `certificados.html`, apuntando a las imágenes en `images/certs/` y con el link
de verificación de Hack4u (`https://hack4u.io/check-certificate/`).

Cisco y AWS quedaron como cards con link directo a la credencial (Credly / AWS),
sin imagen de preview embebida — así el HTML queda más liviano. Si querés que
también tengan preview de imagen como los de Hack4u, pasame la imagen del
certificado y la agrego con el mismo estilo.

## Notas

- El "sudo su" (escribilo en cualquier página) sigue funcionando en todas las páginas,
  es parte de `js/main.js`.
- Todas las páginas comparten la misma navbar, footer, partículas y cursor —
  para agregar una página nueva, copiá cualquiera de las existentes como base
  y sumala al `<ul>` de la nav en **todas** las páginas.
