# Netlify Deployment Plan

## Branching Strategy

1. Create new feature branch following project convention:
   ```bash
   git checkout -b feat/netlify-deployment
   ```

## Netlify Configuration

1. Create `netlify.toml` configuration file:

   ```toml
   [build]
     command = "npm run build"
     publish = "dist/ng17-ssr/browser"
     functions = "dist/ng17-ssr/server"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

## Serverless Function Setup

1. Update `server.ts` to work with Netlify's serverless environment:
   ```typescript
   // Replace run() with exports.handler for Netlify Functions
   export const handler = app();
   ```

## Environment Variables

1. Required variables for Netlify:
   - `PORT` (default: 4000)
   - Any i18n-specific configurations

## Deployment Process

**note:**
netlify deploy --prod --functions=false
was the only way i could deploy to production.

1. Push feature branch:
   ```bash
   git push origin feat/netlify-deployment
   ```
2. Connect to Netlify:
   - New site from Git
   - Select repository
   - Set build command: `npm run build`
   - Set publish directory: `dist/ng17-ssr/browser`
   - Set functions directory: `dist/ng17-ssr/server`

## Testing

1. Verify SSR in production
2. Test i18n functionality
3. Run Cypress tests against deployed version
