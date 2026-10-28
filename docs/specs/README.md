# Specs

One file per domain, describing **current** behavior (not plans). Keep each short: purpose, behavior, rules, known gaps.

| Spec | Scope |
| --- | --- |
| [auth-and-roles.md](auth-and-roles.md) | Login, roles, permissions |
| [pages.md](pages.md) | Static content pages (`/[slug]`) |
| [documents.md](documents.md) | Block-based documents (news items, articles, research) |
| [deployment.md](deployment.md) | Environments, static export, migrations |

## Flow

1. Change needed → copy `../changes/_template.md` to `../changes/<name>.md`.
2. Fill goal, requirements (SHALL statements), tasks. Owner approves.
3. Implement (agent or human) on a branch.
4. In the same PR: update the domain spec, delete the change file.

Skip step 1–2 for bug fixes and refactors that don't alter documented behavior.

## Writing requirements

- One testable statement per line: "Only users with `document:update` SHALL edit a document."
- Describe observable behavior, not implementation.
- Put open questions under **Known gaps** instead of guessing.

This layout mirrors OpenSpec (`openspec/specs`, `openspec/changes`), so moving to it later is a rename.
