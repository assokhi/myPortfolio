---
name: ponytail
description: >
  Write-less-code discipline. Walk a 7-rung decision ladder before writing anything
  and stop at the first rung that holds; prefer deletion, reuse and one-liners over
  new abstractions. Use when implementing any feature, refactor, or fix, and when
  asked to "keep it minimal", "don't over-engineer", "ponytail mode", or /ponytail.
---

Local mirror of **Ponytail** (https://github.com/DietrichGebert/ponytail).
Installing the upstream plugin supersedes this file — see "Upgrade path" below.

Think like the laziest senior dev in the room. The best code is the code never written.

## The ladder

Understand the problem first — read and trace the actual flow end to end. *Then*
stop at the first rung that holds:

1. **Does this need to exist at all?** → skip it (YAGNI)
2. **Already in this codebase?** → reuse it, don't rewrite
3. **Stdlib does it?** → use it
4. **Native platform feature?** → use it (CSS `scroll-timeline`, `<dialog>`, `IntersectionObserver`, view transitions — before reaching for a library)
5. **Already-installed dependency?** → use it
6. **Can it be one line?** → one line
7. Only then: **the minimum that works**

## Corollaries

- No unrequested abstractions. No boilerplate nobody asked for.
- Deletion over addition. Boring over clever. Fewest files possible.
- Shortest working diff wins — but only after fully understanding the problem.
- If a request seems over-built, challenge it *before* implementing.
- Mark intentional shortcuts with a `ponytail:` comment naming the ceiling and the
  upgrade path, e.g. `// ponytail: in-memory only, swap for KV when >100 entries`.

## Never be lazy about

Understanding the problem · input validation at trust boundaries · error handling
that prevents data loss · security · accessibility · explicitly requested features ·
one runnable check per non-trivial piece of logic.

The ladder cuts *code volume*, never these. A skipped `prefers-reduced-motion`
query or an unlabelled control is not laziness paying off — it is a defect.

## Modes

| Mode | Behaviour |
|------|-----------|
| `lite` | Build what was asked, but name the lazier alternative and let the user decide |
| `full` | **Default.** Apply the ladder |
| `ultra` | YAGNI taken to the extreme — ship the one-liner and question the requirement in the same breath |

## Gotchas

- **The ladder is not a licence to under-deliver.** Rung 1 means "this feature is
  not needed", not "this part of what was asked is tedious". Cutting requested
  scope is the user's call, never the ladder's.
- **Rung 2 needs evidence.** "Already in this codebase" requires actually grepping
  for it. A guessed helper that doesn't exist costs more than writing one.
- **Measured effect is modest.** Advertised −54% code / −22% tokens; independent
  retests land nearer −15% code and −10% cost. Worth having, not a silver bullet.
- **One-liners can be worse.** A dense one-liner that the next reader has to decode
  fails "boring over clever". Line count is the proxy, not the goal.

## Upgrade path

```
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```
Then review and trust its two lifecycle hooks in `/hooks` and start a new thread.
Once installed, delete this mirror so the ladder is not stated twice.
