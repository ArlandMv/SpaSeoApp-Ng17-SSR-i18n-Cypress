# Lighthouse Performance Audit Guide for Angular SSR App

## Prerequisites
- Node.js installed
- Angular CLI installed globally (`npm install -g @angular/cli`)
- Lighthouse installed globally (`npm install -g lighthouse`)

## Step 1: Build the Application
```bash
ng build
```

## Step 2: Build the SSR Version
```bash
ng run spa-seo-app-ng17-ssr-i18n-cypress:server
```

## Step 3: Serve the SSR Application
```bash
npm run serve:ssr
```

## Step 4: Run Lighthouse Audit
In a new terminal:
```bash
lighthouse http://localhost:4000 --output html --output-path ./lighthouse-report.html --view
```

## Step 5: Analyze Results
The report will:
1. Open automatically in your browser
2. Show performance metrics (FCP, LCP, TTI, etc.)
3. Provide optimization suggestions

## Best Practices
- Run tests in incognito mode to avoid extensions affecting results
- Test multiple times for consistent metrics
- Compare SSR vs non-SSR performance
- Document findings for future reference