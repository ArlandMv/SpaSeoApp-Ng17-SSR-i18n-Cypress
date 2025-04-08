# Netlify.toml Configuration Reference

## Basic Configuration

```toml
[build]
  command = "npm run build:ssr" # SSR build command
  publish = "dist/ng17-ssr/browser" # Output directory
  functions = "netlify/functions" # Serverless functions location
```

## SSR Specific Settings

```toml
[dev]
  command = "npm run serve:ssr:full" # Local dev command
  targetPort = 4000 # SSR server port
  port = 8888 # Proxy port
  autoLaunch = true # Auto-open browser

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  # Required for Angular Universal SSR
```

## Redirect Rules

```toml
# Basic redirect
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301

# SPA catch-all (required for Angular)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Force specific file types
[[redirects]]
  from = "/robots.txt"
  to = "/robots.txt"
  status = 200
  force = true
```

## Security Headers

```toml
[[headers]]
  for = "/*"
  [headers.values]
    "Content-Security-Policy" = "default-src 'self'"
    "X-Frame-Options" = "DENY"
    "X-XSS-Protection" = "1; mode=block"
    "Strict-Transport-Security" = "max-age=63072000"
```

## Build Commands

```toml
[build]
  # Basic production build
  command = "npm run build:ssr && npm run prerender"

  # Environment-specific builds
  [build.environment]
    NODE_VERSION = "18.0.0"

  # Build plugins
  [[build.plugins]]
    package = "netlify-plugin-angular"
```

## Environment Variables

```toml
[context.production.environment]
  API_URL = "https://api.example.com"

[context.develop.environment]
  API_URL = "https://dev-api.example.com"
```

## Form Handling

```toml
# Required for Netlify Forms
[[headers]]
  for = "/*"
  [headers.values]
    "Content-Type" = "text/html"
```

## Edge Functions

```toml
[[edge_functions]]
  function = "my-edge-function"
  path = "/some-path"
```

## Complete Example

```toml
[build]
  command = "npm run build:ssr && npm run prerender"
  publish = "dist/ng17-ssr/browser"
  functions = "netlify/functions"

[dev]
  command = "npm run serve:ssr:full"
  targetPort = 4000
  port = 8888
  autoLaunch = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    "Content-Security-Policy" = "default-src 'self'"
    "X-Content-Type-Options" = "nosniff"