# SWE Training

Weekly LeetCode challenge platform for SWE Training (RoBorregos). Participants
solve problems on LeetCode and their progress is automatically reflected on a
leaderboard. Each week unlocks on a scheduled date (Monterrey time).

Stack: [Next.js](https://nextjs.org), [NextAuth.js](https://next-auth.js.org),
[Prisma](https://prisma.io) + CockroachDB, [tRPC](https://trpc.io) and
[Tailwind CSS](https://tailwindcss.com).

---

## User guide

1. **Sign in** with your Google account.
2. **Set your LeetCode username** in your profile. Without it, your progress
   cannot be tracked.
3. Go to **Weekly Problems**. Each week unlocks on its date. A locked week shows
   a padlock and the date it will become available.
4. Solve the problems on **LeetCode**. Progress is validated automatically: a
   problem only counts if you solved it **on the day the week was released or
   later**, not before.
5. Check your position on the **Leaderboard**, global or per week. You can also
   browse archived **past editions** (previous years).

## For administrators

With the `ADMIN` role you can:

- **Schedule the unlock of each week** on the admin page: pick a date and time
  (in Monterrey time) and the week releases itself when it arrives. There is no
  manual lock: the week always follows the selected date.
- **Add problems and resources** to each week.
- **Clear a user's progress** from the leaderboard (trash icon).
- **Reset users** to start a new edition (see below).

## How to reset (new SWE Training edition)

Recommended when starting the program again. The current ranking is **not lost**:
it is archived as a browsable edition.

1. Go to the **Leaderboard** as an admin.
2. Click **"Reset users (archive edition)"**.
3. Enter the edition name (defaults to the year, e.g. `2025`).
4. Confirm with **"Archive and reset"**.

**What is deleted:** all users (except admins), their sessions/logins, their
progress and the admin comments.
**What is kept:** accounts with the `ADMIN` role are preserved (with their
progress reset to zero) so you don't lose access. Weeks, problems and resources
are left intact. The archived edition stays visible on the leaderboard.

---

## Development setup

Requires **Node 20+**.

```bash
npm install
cp .env.example .env   # and fill in the values (see below)
npm run db:push        # applies the Prisma schema to the database
npm run dev
```

### `.env` template

```bash
# NextAuth — generate the secret with: npx auth secret
AUTH_SECRET=""

# Google OAuth Provider
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# Database (CockroachDB)
DATABASE_URL=""
```

If you add new variables, update the schema in `src/env.js` as well.

### Useful scripts

- `npm run dev` — development server.
- `npm run db:push` — syncs the Prisma schema with the database.
- `npm run db:studio` — visual database explorer.
- `npm run typecheck` — type checking.
- `npm run lint` — linter.

---

## Contributors

Thanks to everyone who made this project work:

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
