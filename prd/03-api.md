# 3. The API endpoints

## What these are for

Four addresses on your own site that your pages call to get data. Three of them
fetch from an outside service; one reads a local file.

**What they achieve:** the Experience section shows evidence that updates itself.
You solve a LeetCode problem, your site's number goes up. You never edit
anything. And because it comes from GitHub and Codeforces rather than from you,
a reader treats it as fact rather than a claim.

## Why go through your own API at all

Your page could call GitHub directly from the browser. It doesn't, for three
reasons:

1. **Secrets stay secret.** The GitHub token never leaves your server. Anything
   in browser code is public.
2. **Caching.** Your server fetches once an hour and serves the saved copy to
   everyone. Without this, a thousand visitors means a thousand calls to GitHub,
   and GitHub starts refusing them.
3. **One shape.** Three services return three different messy formats. Your
   endpoints turn them into one clean shape your components can rely on.

---

## The four endpoints

| Address | Where the data comes from | What it returns | How long it's cached |
|---|---|---|---|
| `/api/github` | `api.github.com` | Followers, public repos, total stars, contributions in the last year, top repositories | 1 hour |
| `/api/leetcode` | `leetcode.com/graphql` | Problems solved, split by easy / medium / hard, global ranking | 6 hours |
| `/api/codeforces` | `codeforces.com/api` | Current rating, highest rating, rank title | 6 hours |
| `/api/verifications` | A local file in this repo | Your certificates with links to verify each one | Rebuilt on deploy |

### `/api/github`

**What this achieves:** shows you write code regularly and that other people find
it useful.

Uses two GitHub interfaces: the normal one for your profile and repository list,
and their GraphQL one for the contribution calendar (that green grid) — the
calendar is only available through GraphQL and only with a token.

**A token is required.** Without one, GitHub allows 60 requests per hour per IP
address, and Vercel's servers share IP addresses with other people's sites, so
that budget disappears fast. With a token it is 5,000 per hour. Create a classic
personal access token with the `read:user` and `public_repo` permissions. It
needs no write access to anything.

### `/api/leetcode`

**What this achieves:** shows you practise problem-solving, which is exactly what
technical interviews test.

LeetCode has **no official public API.** This endpoint uses the same internal
GraphQL address their own website uses. Two consequences you should know about:

- It needs a `Referer: https://leetcode.com` header, otherwise it intermittently
  refuses the request.
- LeetCode can change or remove it at any time without warning. This is the main
  reason every response is validated and every widget has a fallback.

### `/api/codeforces`

**What this achieves:** competitive-programming rating is a hard number, and some
employers weight it heavily.

Codeforces has a real, official, documented API that needs no key at all — the
easiest of the three. One thing to watch: it wraps every reply in
`{ "status": "OK", "result": [ ... ] }`. Check `status` before reading `result`,
because a failure still arrives as a normal-looking response.

### `/api/verifications`

**What this achieves:** a certificate is only worth something if the reader can
confirm it is real. Each one links to the issuer's own verification page, so
your claim is checkable in one click.

This one calls nothing external. It reads `content/certifications.ts`, where each
entry holds:

```
name          "AWS Certified Solutions Architect"
issuer        "Amazon Web Services"
issuedOn      "2026-03-14"
credentialId  "ABC-123-XYZ"
verifyUrl     "https://aws.amazon.com/verification/ABC-123-XYZ"
```

The page renders a badge per certificate, linking out to `verifyUrl`.

> `ponytail:` this endpoint is a pass-through — the page could import the file
> directly and skip the network round-trip entirely. It exists because it was in
> the spec and it keeps the widget's data shape consistent with the other three.
> If it never gains a real external check, collapse it into a plain import.

---

## Rules that apply to all four

### Never show the visitor an error

If GitHub is down, the widget shows the last known numbers, or a neutral
placeholder — never a stack trace, never a broken layout, never a page that
fails to load. The endpoint returns a normal successful response with a
`stale: true` marker so the component can show a quiet "updated earlier" note.

This matters more than it sounds. A recruiter who hits an error page concludes
you cannot ship reliable software, and they are not entirely wrong.

### Validate everything that comes from outside

Every external response is checked against a schema (using `zod`) before it is
used. If LeetCode changes a field name, the check fails cleanly and the fallback
appears. Without validation, a changed field becomes `undefined`, which becomes a
crash somewhere deeper in the page where it is much harder to diagnose.

Data from another company's server is untrusted input. This is one of the few
places where skipping the extra code is genuinely not worth it.

### Give up quickly

Every outbound request has a 5-second timeout. A hanging request is worse than a
failed one — a failure shows the fallback immediately, a hang leaves the visitor
staring at a spinner.

### Cache, don't hammer

Caching is handled by Next.js's built-in `revalidate` setting. No extra database
or cache service is needed. Your stats do not need to be accurate to the second;
one to six hours old is fine and keeps you well inside every rate limit.

### Run on the standard runtime

These routes run on Node, not the Edge runtime, because they read a secret token
and use standard Node libraries.

---

## Configuration

**One secret only:**

```
GITHUB_TOKEN=ghp_...
```

Set it in Vercel's environment variables, and in a local `.env.local` for
development. `.env.local` must be in `.gitignore` — a leaked token is a real
security incident, not an inconvenience.

**Everything else is public** and lives in `content/profile.ts`, not in
environment variables, because your GitHub username is not a secret and putting
it in config just makes it harder to find later:

```
githubUsername      "yourname"
leetcodeUsername    "yourname"
codeforcesHandle    "yourname"
```

## Shared code

One helper, `lib/fetch-json.ts`, does the fetch, the timeout, and the error
wrapping for all three external endpoints. One file, `lib/schemas.ts`, holds
every validation rule. The four route files stay short because everything they
share lives in those two.

## How to check they work

1. Start the dev server and open each of the four addresses in a browser. Each
   should return readable JSON.
2. Run the check script (see [04-build-plan.md](04-build-plan.md)) — it calls all
   four and validates each response against the same schemas the routes use.
3. Break one on purpose: point the LeetCode username at a user that does not
   exist and reload the Experience section. The widget must show its fallback.
   The page must not error. Repeat for the other two.
