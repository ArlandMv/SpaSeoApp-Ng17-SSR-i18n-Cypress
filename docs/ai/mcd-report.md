---
description: "Report for the MDC files"
---
# Markdown Context Files (.mdc) for JAMstack Projects 
## 1. Introduction to MDC Files

- Specialized documentation format combining human-readable content with machine-readable context
- Designed for AI-assisted development in modern web architectures
- Particularly valuable for JAMstack projects with:
  - Angular frontend
  - Node.js/Express SSR
  - Netlify deployment architecture
 

## 2. Project-Specific MDC Structure

```markdown
---
title: JAMstack Architecture Guide
description: SSR patterns for Angular + Express on Netlify
category: Architecture
globs: 
  - "src/app/**/*.ts"
  - "server/**/*.js"
---
```


  <ProviderContext version="1.2" >
  ## SSR Configuration
  ```typescript
  // Angular Universal setup
  export function app(): express.Express {
    const server = express();
    server.engine('html', ngExpressEngine({ bootstrap: AppServerModule }));
    server.set('view engine', 'html');
    return server;
  }
```
## 3. Key MDC Components for Your Stack 

**Component**   | **Angular Usage**    | **Express/Node Usage** 
**Routing**     | RouterModule configs | Express route handlers 
**State**       | NgRx/signals         | Express session management
**API**         | HttpClient           | Express route handlers
**Deployment**  | Netlify configs      | Netlify redirect rules
**Serverless**  | Netlify functions    | Netlify functions triggers
---
## 4. Essential MDC Files for Your Project

- angular-ssr.mdc
- netlify-functions.mdc
- performance-optimization.mdc

**EXAMPLE**
- **Architecture.mdc**:
  - Overview of the JAMstack stack
  - Architecture diagrams
  - Deployment strategies
- **Angular.mdc**:
  - Angular components and their usage
  - Angular modules and their structure
  - Angular directives and pipes
- **Express.mdc**:
  - Express middleware and routing
  - Express middleware 


*performance-optimization.mdc:*

<ProviderContext>
  ## Cache Control
  ```toml
  [[headers]]
    for = "/*"
    [headers.values]
      Cache-Control = "public, max-age=3600"
      Vary = "Accept-Encoding"
 ```


## 5. Netlify-Specific MDC Features

** Read at netlify-dev.mdc **
- Edge Functions Integration
- Build Configuration
```toml
[build]
  command = "npm run build:ssr"
  publish = "dist/browser"
  functions = "functions"
 ```

## 6. Development Workflow**

1. **Local Development**:
   ```bash
   netlify dev --live
   ```
2. **Testing SSR**:
   ```bash
   netlify dev --live --functions
   ```
   OR
   ```bash
   npm run build:ssr && netlify functions:serve
   ```
3. **Production Debugging**:
   ```bash
   netlify dev --live --functions --debug
   ```
Note: Check those
<Debugging>
  - Netlify Functions logs
  - Edge Function traces
  - SSR hydration errors
</Debugging>

---

## **7. Validation Checklist**

- [ ] All Angular components have corresponding MDC docs
- [ ] Express middleware is documented with examples
- [ ] Netlify-specific configurations are versioned
- [ ] Cross-references between:
  - Frontend components
  - SSR handlers
  - Deployment configs

