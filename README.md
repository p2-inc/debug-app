# debug-app

<!-- phasetwo:banner:start - managed by p2-inc/shared-github-actions, edit there -->
[![docs](https://img.shields.io/badge/docs-phasetwo.io-blue)](https://phasetwo.io/docs/securing-applications/)

📚 [Documentation](https://phasetwo.io/docs/securing-applications/) • 🚀 [Hosted Keycloak](https://dash.phasetwo.io/?utm_source=github&utm_medium=readme&utm_campaign=debug-app) • 🤖 [Keycloak Skills](https://github.com/p2-inc/keycloak-skills) • 💬 [Support](mailto:support@phasetwo.io)

> [!TIP]
> **Run this in our cloud, no setup needed.** Phase Two hosts Keycloak with all of our extensions built in. [Try it free with your own cluster →](https://dash.phasetwo.io/?utm_source=github&utm_medium=readme&utm_campaign=debug-app)
>
> **Using a coding agent?** Add the Phase Two Keycloak skills ([launch post](https://phasetwo.io/blog/keycloak-skills-mcp-launch)) to Claude Code, Cursor or Codex so your agent can set up passwordless login, SSO, organizations and clusters for you:
>
> ```sh
> # Install the skills (connects to our hosted MCP server)
> claude plugin marketplace add p2-inc/keycloak-skills
> claude plugin install phasetwo@keycloak-skills
> # Or connect to the MCP server directly
> claude mcp add --transport http keycloak https://mcp.phasetwo.io/mcp
> ```
<!-- phasetwo:banner:end -->

A simple demonstration of protecting a frontend and backend app using Keycloak.

Used with these articles:
- https://phasetwo.io/blog/securing-apps-with-keycloak
- https://phasetwo.io/blog/sso-setup
