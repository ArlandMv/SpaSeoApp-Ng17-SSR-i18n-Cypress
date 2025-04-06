# Netlify CLI (netlify-cli) — Comprehensive Guide

---

## Overview

**Netlify CLI** is a command-line tool that allows developers to interact with Netlify services directly from their local environment. It supports local development, testing, deployment, environment management, and automation of Netlify workflows.

---

## Key Features

- **Local Development (`netlify dev`)**: Simulates Netlify's production environment locally, including redirects, headers, environment variables, and edge functions.
- **Continuous Deployment**: Trigger builds and deploys from the CLI.
- **Environment Variables Management**: Set, get, and unset environment variables.
- **Site Management**: Create, link, unlink, list, and delete Netlify sites.
- **Edge & Serverless Functions**: Develop and test functions locally.
- **Redirects and Headers Simulation**: Emulate Netlify's rules during local development.
- **Lighthouse Audits**: Run performance and SEO audits.

---

## Installation

- **Globally (recommended for local dev):**

```bash
npm install -g netlify-cli
```

- **As a devDependency (recommended for CI/CD consistency):**

```bash
npm install --save-dev netlify-cli
```

---

## Common Commands

| Command                     | Description                                     |
| --------------------------- | ----------------------------------------------- |
| `netlify login`             | Authenticate with Netlify                       |
| `netlify init`              | Create/configure a Netlify site                 |
| `netlify link`              | Link local project to a Netlify site            |
| `netlify dev`               | Start local dev server with Netlify environment |
| `netlify build`             | Build site using Netlify environment            |
| `netlify deploy`            | Deploy site (draft or production)               |
| `netlify open`              | Open site/admin/dashboard                       |
| `netlify env:list`          | List environment variables                      |
| `netlify env:set VAR value` | Set an environment variable                     |
| `netlify env:unset VAR`     | Remove an environment variable                  |
| `netlify status`            | Show linked site status                         |
| `netlify functions:serve`   | Serve functions locally                         |
| `netlify logout`            | Log out of Netlify                              |

---

## Best Practices

- Use `netlify dev` for accurate local simulation.
- Version control `netlify.toml` for build, redirects, headers, and dev config.
- Manage environment variables via CLI or UI, scoped per context.
- Test redirects and headers locally before deploying.
- Use branch deploys and deploy previews for feature testing.
- Automate deploys and environment management in CI/CD.
- Add `netlify-cli` as a devDependency to lock CLI version.
- Use verbose/debug modes for troubleshooting.

---

## Tips

- **Proxy SSR/API servers:** Configure `[dev]` block in `netlify.toml` to proxy to backend servers.
- **Custom build commands:** Define in `netlify.toml` or override via CLI.
- **Edge Functions:** Develop and test locally.
- **Lighthouse:** Run audits with `netlify lighthouse`.
- **Multiple sites:** Use `netlify link` to switch projects.

---

## Summary

Netlify CLI bridges local development and production, enabling accurate testing, streamlined deployments, and efficient environment management. Following best practices ensures smooth, predictable, and high-quality deployments.
