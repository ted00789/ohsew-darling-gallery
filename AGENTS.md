<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Keep the shared header and footer in the root route and each content page in its own leaf route so navigation and metadata stay consistent.
- Keep portfolio data, request-prefill generation, and form validation in the shared sewing module so gallery and contact contracts remain aligned.
- Submit contact requests directly to the user-selected Formspree service; do not introduce a storage backend for this form because the owner chose external delivery.
- Use CDN asset pointers for sample product imagery and clearly distinguish it from the owner's actual portfolio.
- Build in TanStack Start SPA mode with Nitro disabled outside Lovable; enable its required deployment adapter only in Lovable's environment, and deploy only dist/client to GitHub Pages so self-hosting never requires a server runtime.
- Generate static shell entry files for every existing route and package pointer assets during the shell's build callback, so clean deep links and images work without hosting rewrites or an asset proxy.
