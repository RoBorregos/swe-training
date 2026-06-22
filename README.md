# SWE Training

Plataforma de retos semanales de LeetCode para SWE Training (RoBorregos). Los
participantes resuelven problemas en LeetCode y su progreso se refleja
automáticamente en un leaderboard. Cada semana se libera en una fecha
programada (hora de Monterrey).

Stack: [Next.js](https://nextjs.org), [NextAuth.js](https://next-auth.js.org),
[Prisma](https://prisma.io) + CockroachDB, [tRPC](https://trpc.io) y
[Tailwind CSS](https://tailwindcss.com).

---

## Manual de usuario

1. **Inicia sesión** con tu cuenta de Google.
2. **Configura tu usuario de LeetCode** en tu perfil. Sin esto, tu progreso no
   se puede rastrear.
3. Entra a **Weekly Problems**. Cada semana se desbloquea en su fecha. Una
   semana bloqueada muestra un candado y la fecha en que estará disponible.
4. Resuelve los problemas en **LeetCode**. El progreso se valida solo: un
   problema cuenta únicamente si lo resolviste **el día que se liberó la semana
   o después**, no antes.
5. Revisa tu posición en el **Leaderboard**, global o por semana. También puedes
   ver las **ediciones pasadas** (años anteriores) archivadas.

## Para administradores

Con el rol `ADMIN` puedes:

- **Programar el desbloqueo de cada semana** en la página de admin: eliges fecha
  y hora (en horario de Monterrey) y la semana se libera sola al llegar. No hay
  bloqueo manual: la semana siempre sigue la fecha seleccionada.
- **Agregar problemas y recursos** a cada semana.
- **Limpiar el progreso de un usuario** desde el leaderboard (ícono de basura).
- **Reiniciar usuarios** para empezar una nueva edición (ver abajo).

## Cómo reiniciar (nueva edición de SWE Training)

Recomendado al volver a arrancar el programa. El ranking actual **no se pierde**:
se archiva como edición consultable.

1. Entra al **Leaderboard** como admin.
2. Haz clic en **"Reiniciar usuarios (archivar edición)"**.
3. Escribe el nombre de la edición (por defecto el año, ej. `2025`).
4. Confirma con **"Archivar y reiniciar"**.

**Qué se elimina:** todos los usuarios (excepto los admins), sus sesiones/logins,
su progreso y los comentarios del admin.
**Qué se conserva:** las cuentas con rol `ADMIN` se mantienen (con su progreso en
cero) para que no te quedes sin acceso. Las semanas, los problemas y los recursos
quedan intactos. La edición archivada queda visible en el leaderboard.

---

## Setup de desarrollo

Requiere **Node 20+**.

```bash
npm install
cp .env.example .env   # y rellena los valores (ver abajo)
npm run db:push        # aplica el schema de Prisma a la base
npm run dev
```

### Template de `.env`

```bash
# NextAuth — genera el secreto con: npx auth secret
AUTH_SECRET=""

# Google OAuth Provider
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# Base de datos (CockroachDB)
DATABASE_URL=""
```

Si agregas variables nuevas, actualiza también el schema en `src/env.js`.

### Scripts útiles

- `npm run dev` — servidor de desarrollo.
- `npm run db:push` — sincroniza el schema de Prisma con la base.
- `npm run db:studio` — explorador visual de la base.
- `npm run typecheck` — verifica tipos.
- `npm run lint` — linter.

---

## Colaboradores

Gracias a quienes hicieron funcionar este proyecto:

- Alejandra Coeto
- Oscar Arreola
- Luis Benvenuto
- Alejandro Guajardo
- Ricardo Guerrero
- Fernando Cantu
- Efraín Vazquez
- Rodrigo Gamboa
- Danaé Sánchez
- Gilberto Malagamba Montejo
- Héctor Tovar
